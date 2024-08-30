import React, { useState, useMemo, useEffect } from 'react';
import { Card, Tooltip, CardContent, Checkbox, Grid, Select, MenuItem, TextField, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Paper } from '@mui/material';
import { styled } from '@mui/material/styles';
import SaveIcon from '@mui/icons-material/Save';
import DownloadIcon from '@mui/icons-material/Download';
import {
  calculateRCVAvg,
  calculateRCVExt,
  calculateSalesTaxAmount,
  calculateRCVTotal,
  calculateDepreciationAmount,
  calculateACVTotal
} from './helpFunctions';
import {
  generateSummary,
  generateDetail,
  generateRawData,
  generateAll,
} from "./ExcelGenerator";

const DarkCard = styled(Card)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
  borderRadius: "16px",
  border: `1px solid ${theme.palette.grey[800]}`,
}));

const DarkTextField = styled(TextField)(({ theme }) => ({
  '& .MuiInputBase-root': {
    color: '#fff',
  },
  '& .MuiOutlinedInput-root': {
    '& fieldset': {
      borderColor: theme.palette.grey[600],
    },
    '&:hover fieldset': {
      borderColor: theme.palette.grey[400],
    },
    '&.Mui-focused fieldset': {
      borderColor: theme.palette.primary.main,
    },
  },
}));

const DarkSelect = styled(Select)(({ theme }) => ({
  color: '#fff',
  '& .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[600],
  },
  '&:hover .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.grey[400],
  },
  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
    borderColor: theme.palette.primary.main,
  },
}));

const DarkIconButton = styled(IconButton)(({ theme }) => ({
  color: '#fff',
  margin: '0 4px',
}));

const DarkTable = styled(Table)(({ theme }) => ({
  backgroundColor: "#000",
  color: "#fff",
}));

const StickyTableHead = styled(TableHead)(({ theme }) => ({
  backgroundColor: "#000",
  position: 'sticky',
  top: 0,
  zIndex: 1,
}));

const CardInventory = ({ projectDetails, onFilteredDataChange }) => {
  const [rows, setRows] = useState(projectDetails?.project.spreadsheetData || []);
  const [room, setRoom] = React.useState('');
  const [item, setItem] = React.useState('');
  const [classFilter, setClassFilter] = React.useState('');
  const [subclass, setSubclass] = React.useState('');
  const [search, setSearch] = React.useState('');
  const [selectedPending, setSelectedPending] = useState(new Set());

  const API_URL = process.env.REACT_APP_API_URL;

  // Extract unique values for filters
  const [uniqueRooms, setUniqueRooms] = useState([]);
  const [uniqueItems, setUniqueItems] = useState([]);
  const [uniqueClasses, setUniqueClasses] = useState([]);
  const [uniqueSubclasses, setUniqueSubclasses] = useState([]);

  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [popupMessage, setPopupMessage] = useState('');
  const [popupType, setPopupType] = useState('');
  const [popupTextColor, setPopupTextColor] = useState('');
  const [showPopup, setShowPopup] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedOption, setSelectedOption] = useState('Download');

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  useEffect(() => {
    if (rows.length) {
      const rooms = new Set(rows.map(row => row.Room));
      const items = new Set(rows.map(row => row.Item));
      const classes = new Set(rows.map(row => row.Class));
      const subclasses = new Set(rows.map(row => row.Subclass));

      setUniqueRooms(Array.from(rooms));
      setUniqueItems(Array.from(items));
      setUniqueClasses(Array.from(classes));
      setUniqueSubclasses(Array.from(subclasses));
    }
  }, [rows]);

  const handleCheckboxChange = (id) => {
    setSelectedPending(prev => {
      const updated = new Set(prev);
      if (updated.has(id)) {
        updated.delete(id);
      } else {
        updated.add(id);
      }
      return updated;
    });
  };

  const handleBulkUpdate = () => {
    setRows(prevRows =>
      prevRows.map(row =>
        selectedPending.has(row.id)
          ? { ...row, Questionable: false }
          : row
      )
    );
    setSelectedPending(new Set()); // Clear selected checkboxes
  };

  const handleRoomChange = (event) => setRoom(event.target.value);
  const handleItemChange = (event) => setItem(event.target.value);
  const handleClassChange = (event) => setClassFilter(event.target.value);
  const handleSubclassChange = (event) => setSubclass(event.target.value);
  const handleSearchChange = (event) => setSearch(event.target.value);

  const handleSave = () => {
    // Implement save logic here
    console.log("Save clicked");
  };

  const createChangelogEntry = async () => {
    try {
      setError(false);
      setErrorMessage("");

      const quantityCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Quantity === "" || item.Quantity === "0"
      );
      const depreciationCheck = projectDetails.project.spreadsheetData.some(
        (item) =>
          !/^\d{1,3}\.\d{2}$/.test(
            item.DepreciationDisplay || (item.Depreciation * 100).toFixed(2)
          )
      );
      const rcvHighCheck = projectDetails.project.spreadsheetData.some(
        (item) => item["RCV High"] === "" || item["RCV High"] === "0"
      );
      const rcvLowCheck = projectDetails.project.spreadsheetData.some(
        (item) => item["RCV Low"] === "" || item["RCV Low"] === "0"
      );
      const roomCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Room === ""
      );
      const itemCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Item === ""
      );
      const descriptionCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Description === ""
      );
      const subclassCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Subclass === ""
      );
      const classCheck = projectDetails.project.spreadsheetData.some(
        (item) => item.Class === ""
      );

      if (quantityCheck) {
        setError(true);
        setErrorMessage("Quantity column cannot be 0 or empty");
        return;
      }

      if (depreciationCheck) {
        setError(true);
        setErrorMessage("Depreciation must be in xx.xx or xxx.xx format");
        return;
      }

      if (rcvHighCheck) {
        setError(true);
        setErrorMessage("RCV High column cannot be 0 or empty");
        return;
      }

      if (rcvLowCheck) {
        setError(true);
        setErrorMessage("RCV Low column cannot be 0 or empty");
        return;
      }

      if (roomCheck) {
        setError(true);
        setErrorMessage("Room column cannot be empty");
        return;
      }

      if (itemCheck) {
        setError(true);
        setErrorMessage("Item column cannot be empty");
        return;
      }

      if (descriptionCheck) {
        setError(true);
        setErrorMessage("Description column cannot be empty");
        return;
      }

      if (subclassCheck) {
        setError(true);
        setErrorMessage("Subclass column cannot be empty");
        return;
      }

      if (classCheck) {
        setError(true);
        setErrorMessage("Class column cannot be empty");
        return;
      }

      const originalSpreadsheetData = projectDetails.project.spreadsheetData;
      const userFirstName = "UserFirstName"; // replace with actual user data
      const userLastName = "UserLastName"; // replace with actual user data
      const userId = "UserId"; // replace with actual user data
      const projectId = projectDetails.project.id;
      const updatedProjectDetails = projectDetails.project.spreadsheetData;

      const response = await fetch(`${API_URL}/npc/changelog`, {
        method: "POST",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          originalSpreadsheetData,
          userFirstName,
          userLastName,
          userId,
          updatedProjectDetails,
          projectId,
        }),
      });

      if (response.ok) {
        const data = await response.json();
        setPopupMessage("Project contents changed successfully");
        setPopupType("success");
        setPopupTextColor("green");
      } else {
        setPopupMessage("Failed to update project contents");
        setPopupType("error");
        setPopupTextColor("red");
      }

      setShowPopup(true);
      setTimeout(() => window.location.reload(), 1500);
    } catch (error) {
      console.error("Error creating changelog entry:", error);
      setPopupMessage("Failed to update project contents");
      setPopupType("error");
      setShowPopup(true);
      setTimeout(() => window.location.reload(), 1500);
    }
  };

  const handleDownloadOption1 = () => {
    // Implement your download logic for Option 1
    console.log("Download Option 1 selected");
    handleMenuClose();
  };

  const handleDownloadOption2 = () => {
    // Implement your download logic for Option 2
    console.log("Download Option 2 selected");
    handleMenuClose();
  };

  const handleDownloadOption3 = () => {
    // Implement your download logic for Option 3
    console.log("Download Option 3 selected");
    handleMenuClose();
  };



  // Filtered rows logic
  const filteredRows = useMemo(() => {
    const result = rows.filter(row => {
      const matchesRoom = room ? row.Room === room : true;
      const matchesItem = item ? row.Item === item : true;
      const matchesClass = classFilter ? row.Class === classFilter : true;
      const matchesSubclass = subclass ? row.Subclass === subclass : true;
      const matchesSearch = search
        ? row.Description.toLowerCase().includes(search.toLowerCase()) ||
        row.Item.toLowerCase().includes(search.toLowerCase()) ||
        row.Room.toLowerCase().includes(search.toLowerCase())
        : true;

      return matchesRoom && matchesItem && matchesClass && matchesSubclass && matchesSearch;
    });

    // Update the parent component with the filtered data

    return result;
  }, [rows, room, item, classFilter, subclass, search]);

  useEffect(() => {
    if (onFilteredDataChange) {
      onFilteredDataChange(filteredRows);
    }
  }, [filteredRows, onFilteredDataChange]);

  const handleDropdownChange = async (selectedOption) => {
    try {
      let modifiedExcelData;
      let fileName;
      if (selectedOption === "option1") {
        const { modifiedExcelData: summaryData } = await generateSummary(projectDetails);
        modifiedExcelData = summaryData;
        fileName = "Summary.xlsx";
      } else if (selectedOption === "option2") {
        const { modifiedExcelData2: detailData } = await generateDetail(projectDetails);
        modifiedExcelData = detailData;
        fileName = "Detail.xlsx";
      } else if (selectedOption === "option3") {
        const { modifiedExcelData: rawData } = await generateRawData(projectDetails);
        modifiedExcelData = rawData;
        fileName = "RawData.xlsx";
      } else if (selectedOption === "option4") {
        const { modifiedExcelData: allData } = await generateAll(projectDetails);
        modifiedExcelData = allData;
        fileName = "AllData.xlsx";
      } else {
        throw new Error("Invalid option selected");
      }
      // Trigger file download for modified Excel data
      downloadExcel(modifiedExcelData, fileName);
    } catch (error) {
      console.error("Error generating Excel data:", error);
    }
  };

  const handleOptionChange = (event) => {
    const selectedValue = event.target.value;
    setSelectedOption(selectedValue);
    handleDropdownChange(selectedValue);
  };

  const handleMultipleDownloads = async () => {
    try {
      // Define an array to store the file data and names
      const files = [];

      // Generate data for each option
      const { modifiedExcelData: summaryData } = await generateSummary(projectDetails);
      files.push({ data: summaryData, filename: "Summary.xlsx" });

      const { modifiedExcelData2: detailData } = await generateDetail(projectDetails);
      files.push({ data: detailData, filename: "Detail.xlsx" });

      const { modifiedExcelData: rawData } = await generateRawData(projectDetails);
      files.push({ data: rawData, filename: "RawData.xlsx" });

      // Trigger download for all files
      files.forEach(file => downloadExcel(file.data, file.filename));
    } catch (error) {
      console.error("Error generating Excel data:", error);
    }
  };

  const downloadExcel = (data, filename) => {
    const blob = new Blob([data], {
      type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = filename; // Specify the filename for the downloaded file
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  return (
    <DarkCard>
      <CardContent>
        {/* Search Bar and Filter Row */}
        <Grid container spacing={2} alignItems="center">
          <Grid item xs={12} sm={6} md={4}>
            <DarkTextField
              placeholder="Search"
              value={search}
              onChange={handleSearchChange}
              fullWidth
              variant="outlined"
            />
          </Grid>
          <Grid item xs={12} sm={6} md={8} container spacing={2} alignItems="center">
            <Grid item xs={12} md={8}>
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6} md={3}>
                  <DarkSelect
                    value={room}
                    onChange={handleRoomChange}
                    fullWidth
                    variant="outlined"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Room</MenuItem>
                    {uniqueRooms.map((roomValue, index) => (
                      <MenuItem key={index} value={roomValue}>{roomValue}</MenuItem>
                    ))}
                  </DarkSelect>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DarkSelect
                    value={item}
                    onChange={handleItemChange}
                    fullWidth
                    variant="outlined"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Item</MenuItem>
                    {uniqueItems.map((itemValue, index) => (
                      <MenuItem key={index} value={itemValue}>{itemValue}</MenuItem>
                    ))}
                  </DarkSelect>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DarkSelect
                    value={classFilter}
                    onChange={handleClassChange}
                    fullWidth
                    variant="outlined"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Class</MenuItem>
                    {uniqueClasses.map((classValue, index) => (
                      <MenuItem key={index} value={classValue}>{classValue}</MenuItem>
                    ))}
                  </DarkSelect>
                </Grid>
                <Grid item xs={12} sm={6} md={3}>
                  <DarkSelect
                    value={subclass}
                    onChange={handleSubclassChange}
                    fullWidth
                    variant="outlined"
                    displayEmpty
                  >
                    <MenuItem value="" disabled>Subclass</MenuItem>
                    {uniqueSubclasses.map((subclassValue, index) => (
                      <MenuItem key={index} value={subclassValue}>{subclassValue}</MenuItem>
                    ))}
                  </DarkSelect>
                </Grid>
              </Grid>
            </Grid>
            <Grid item xs={12} md={2} container justifyContent="flex-end" alignItems="center">
              <Grid item>
                <Tooltip title="Save changes">
                  <DarkIconButton onClick={createChangelogEntry}>
                    <SaveIcon />
                  </DarkIconButton>
                </Tooltip>
              </Grid>
              <Grid item>
                <Tooltip title="Download Data">
                  <DarkIconButton onClick={handleMultipleDownloads}>
                    <DownloadIcon />
                  </DarkIconButton>
                </Tooltip>
              </Grid>
            </Grid>
          </Grid>
        </Grid>

        {/* Data Table */}
        <Grid container spacing={2} style={{ marginTop: '16px' }}>
          <Grid item xs={12}>
            <TableContainer component={Paper} style={{ backgroundColor: "#333", color: "#fff", maxHeight: '600px', overflowY: 'auto' }}>
              <DarkTable>
                <StickyTableHead>
                  <TableRow>
                    <TableCell style={{ color: '#fff' }}>Line</TableCell>
                    <TableCell style={{ color: '#fff' }}>Confidence</TableCell>
                    <TableCell style={{ color: '#fff' }}>Room</TableCell>
                    <TableCell style={{ color: '#fff' }}>Item</TableCell>
                    <TableCell style={{ color: '#fff' }}>Description</TableCell>
                    <TableCell style={{ color: '#fff' }}>QTY</TableCell>
                    <TableCell style={{ color: '#fff' }}>RCV High</TableCell>
                    <TableCell style={{ color: '#fff' }}>RCV Low</TableCell>
                    <TableCell style={{ color: '#fff' }}>RCV Avg (ea)</TableCell>
                    <TableCell style={{ color: '#fff' }}>RCV (ext)</TableCell>
                    <TableCell style={{ color: '#fff' }}>Sales Tax</TableCell>
                    <TableCell style={{ color: '#fff' }}>Sales Tax Amount</TableCell>
                    <TableCell style={{ color: '#fff' }}>RCV Total</TableCell>
                    <TableCell style={{ color: '#fff' }}>Depreciation (%)</TableCell>
                    <TableCell style={{ color: '#fff' }}>Dep Years</TableCell>
                    <TableCell style={{ color: '#fff' }}>Dep Amount</TableCell>
                    <TableCell style={{ color: '#fff' }}>ACV Total</TableCell>
                    <TableCell style={{ color: '#fff' }}>Class</TableCell>
                    <TableCell style={{ color: '#fff' }}>Subclass</TableCell>
                    
                  </TableRow>
                </StickyTableHead>
                <TableBody>
                  {filteredRows.map((row, index) => (
                    <TableRow key={row.id}>
                      <TableCell style={{ color: '#fff' }}>{index + 1}</TableCell>
                      <TableCell>
                        <div style={{ display: 'flex', alignItems: 'center', flexDirection: 'row-reverse' }}>
                          {row.Questionable && (
                            <Checkbox
                              checked={selectedPending.has(row.id)}
                              onChange={() => handleCheckboxChange(row.id)}
                              color="primary"
                              style={{ marginLeft: '8px', color: 'white' }}
                            />
                          )}
                          <span style={{ color: row.Questionable ? 'orange' : 'green' }}>
                            {row.Questionable ? 'Pending' : 'Meets Criteria'}
                          </span>
                        </div>
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Room}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Item}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Description}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Quantity}</TableCell>
                      <TableCell style={{ color: '#fff' }}>
  ${parseFloat(row["RCV High"]).toFixed(2)}
</TableCell>
<TableCell style={{ color: '#fff' }}>
  ${parseFloat(row["RCV Low"]).toFixed(2)}
</TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateRCVAvg(row["RCV High"], row["RCV Low"])}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateRCVExt(row["RCV High"], row["RCV Low"], row.Quantity)}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        {projectDetails.project.salesTax}%
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateSalesTaxAmount(projectDetails.project.salesTax, row["RCV High"], row["RCV Low"], row.Quantity)}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateRCVTotal(projectDetails.project.salesTax, row["RCV High"], row["RCV Low"], row.Quantity)}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
  {(row.Depreciation * 100).toFixed(2)}%
</TableCell>
                      <TableCell style={{ color: '#fff' }}>{projectDetails.project.depreciationRange}</TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateDepreciationAmount(row, projectDetails)}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>
                        ${calculateACVTotal(row, projectDetails)}
                      </TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Class}</TableCell>
                      <TableCell style={{ color: '#fff' }}>{row.Subclass}</TableCell>
                      
                    </TableRow>
                  ))}


                </TableBody>
              </DarkTable>
            </TableContainer>
          </Grid>
        </Grid>
      </CardContent>
    </DarkCard>
  );
};

export default CardInventory;
