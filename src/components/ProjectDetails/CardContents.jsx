// CardContents.jsx

import React, { useState, useEffect } from "react";
import { color, motion } from "framer-motion";
import Popup from "./Popup";
import {
  generateSummary,
  generateDetail,
  generateRawData,
  generateAll,
} from "./ExcelGenerator";
import { useNavigate } from "react-router-dom";
import { Grid, Card, CardContent, Typography, Button, TextField, Select, MenuItem } from '@mui/material';



const styles = {
  Card: {
    width: "100%",
    height: "70vh",
    maxHeight: "70vh",
    backgroundColor: "#000",
    color: "white",
    borderRadius: "26px",
    border: "1px solid white",
    boxSizing: "border-box",
    marginTop: "10px"
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "white",
    // width: "100%",
    overflow: "hidden",
    backgroundColor: "#000",
  },
  titleText: {
    color: "white",
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 600,
    //marginLeft: '50px',
    minWidth: "200px", // Define a minimum width for each cell
    maxWidth: "300px",
    marginLeft: "30px",
  },
  headerItem: {
    color: "white",
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 600,
    //marginLeft: '50px',
    // Define a minimum width for each cell
    width: "300px",
  },
  icon: {
    marginRight: "10px", // Add space between icon and button
  },
  spreadsheet: {
    paddingBottom: "15px",
    width: "100%",
    height: "100%",
    overflow: "auto", // Add overflow to allow scrolling if content exceeds height
    backgroundColor: "#000",
  },
  row: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    // padding: "10px 0",
    boxSizing: "border-box",
    width: "fit-content",
    color: "white",
    backgroundColor: "#000",
    // backgroundColor: "red",
  },
  bigCell: {
    display: "flex",
    // Let each cell take up equal space initially
    // Define a minimum width for each cell
    width: "150px", // Define a maximum width for each cell to prevent excessive expansion
    overflow: "hidden", // Hide overflow content
    textOverflow: "ellipsis", // Truncate text that overflows its container
    whiteSpace: "nowrap", // Prevent text from wrapping to the next line
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    padding: "10px",
    fontWeight: 600,
    backgroundColor: "#000",
  },
  cell: {
    display: "flex",
    // Let each cell take up equal space initially
    // Define a minimum width for each cell
    width: "150px", // Define a maximum width for each cell to prevent excessive expansion
    overflow: "hidden", // Hide overflow content
    textOverflow: "ellipsis", // Truncate text that overflows its container
    whiteSpace: "nowrap", // Prevent text from wrapping to the next line
    justifyContent: "center",
    color: "white",
    fontSize: "12px",
    padding: "10px",
    fontWeight: 600,
    alignItems: "center",
    backgroundColor: "#000",
  },
  bigInput: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "150px",
    fontSize: "12px",
    fontWeight: 600,
    color: "white",
    backgroundColor: "#000",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    textAlign: "center",
    width: "95px",
    fontSize: "12px",
    fontWeight: 600,
    color: "white",
    backgroundColor: "#000",
  },
  Button: {
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "#2a84ea",
    color: "#ffffff",
    fontSize: "15px",
    fontFamily: "Poppins",
    fontWeight: 700,
    border: "0",
    width: "max-content",
    paddingLeft: "40px",
    paddingRight: "40px",
    height: "30px",
    marginRight: "5px",
  },
  dropdownOption: {
    backgroundColor: "#f0f0f0", // Background color for options
    color: "#030303", // Text color for options
    textAlign: "center",
  },
  spreadsheetContainer: {
    overflow: "auto",
    height: "87%", // Adjust as needed
    borderBottom: "1px solid #ccc",
    paddingBottom: "15px",
    backgroundColor: "#04101E",
  },
  dropdown: {
    marginRight: "10px",
    backgroundColor: "#000",
    maxWidth: '150px',
  },
};

const CardContents = ({ projectDetails, setProjectDetails, onFilter }) => {
  const [originalProjectDetails, setOriginalProjectDetails] = useState(null);
  const [userData, setUserData] = useState(null);
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupTextColor, setPopupTextColor] = useState("");
  const [isDataChanged, setDataChanged] = useState(false);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRoom, setSelectedRoom] = useState("");
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedClass, setSelectedClass] = useState("");
  const [selectedSubclass, setSelectedSubclass] = useState("");

  const [selectedRows, setSelectedRows] = useState([]);

  const navigate = useNavigate();

  useEffect(() => {
    // Call the filtering function when searchQuery or dropdown selections change
    const filteredData = filterData();
    // Pass filtered data to parent component using the onFilter callback
    onFilter(filteredData);
  }, [
    searchQuery,
    selectedRoom,
    selectedItem,
    selectedClass,
    selectedSubclass,
  ]);

  const handleReconcileGoClick = (projectId) => {
    // Handle button click to navigate to new page with projectId

    navigate(`/ReconcileGoPayment?projectId=${projectDetails.project.id}`); // Navigate to "/ReconcileGoPayment" route with projectId in URL params
  };

  const populateDropdowns = () => {
    const roomSet = new Set();
    const itemSet = new Set();
    const classSet = new Set();
    const subclassSet = new Set();

    projectDetails.project.spreadsheetData.forEach((item) => {
      if (!roomSet.has(item.Room)) roomSet.add(item.Room);
      if (!itemSet.has(item.Item)) itemSet.add(item.Item);
      if (!classSet.has(item.Class)) classSet.add(item.Class);
      if (!subclassSet.has(item.Subclass)) subclassSet.add(item.Subclass);
    });

    const roomFilter = document.getElementById("roomFilter");
    const itemFilter = document.getElementById("itemFilter");
    const classFilter = document.getElementById("classFilter");
    const subclassFilter = document.getElementById("subclassFilter");

    // Clear existing options
    roomFilter.innerHTML = '<option value="">Filter by Room</option>';
    itemFilter.innerHTML = '<option value="">Filter by Item</option>';
    classFilter.innerHTML = '<option value="">Filter by Class</option>';
    subclassFilter.innerHTML = '<option value="">Filter by Subclass</option>';

    roomSet.forEach((room) => {
      const option = document.createElement("option");
      option.value = room;
      option.text = room;
      roomFilter.add(option);
    });

    itemSet.forEach((item) => {
      const option = document.createElement("option");
      option.value = item;
      option.text = item;
      itemFilter.add(option);
    });

    classSet.forEach((cls) => {
      const option = document.createElement("option");
      option.value = cls;
      option.text = cls;
      classFilter.add(option);
    });

    subclassSet.forEach((subcls) => {
      const option = document.createElement("option");
      option.value = subcls;
      option.text = subcls;
      subclassFilter.add(option);
    });
  };

  // Call the function to populate dropdowns on page load
  useEffect(() => {
    populateDropdowns();
  }, [projectDetails]);

  const filterData = () => {
    return projectDetails.project.spreadsheetData
      .map((item, index) => ({ ...item, originalIndex: index }))
      .filter((item) => {
        const matchesSearch = item.Description.toLowerCase().includes(
          searchQuery.toLowerCase()
        );
        const matchesRoom = selectedRoom ? item.Room === selectedRoom : true;
        const matchesItem = selectedItem ? item.Item === selectedItem : true;
        const matchesClass = selectedClass
          ? item.Class === selectedClass
          : true;
        const matchesSubclass = selectedSubclass
          ? item.Subclass === selectedSubclass
          : true;
        return (
          matchesSearch &&
          matchesRoom &&
          matchesItem &&
          matchesClass &&
          matchesSubclass
        );
      });
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);

  };

  const handleRoomChange = (e) => {
    setSelectedRoom(e.target.value);
  };

  const handleItemChange = (e) => {
    setSelectedItem(e.target.value);
  };

  const handleClassChange = (e) => {
    setSelectedClass(e.target.value);
  };

  const handleSubclassChange = (e) => {
    setSelectedSubclass(e.target.value);
  };

  useEffect(() => {
    // Store the original projectDetails when the component mounts
    const originalProjectDetailsCopy = JSON.parse(
      JSON.stringify(projectDetails)
    );
    setOriginalProjectDetails(originalProjectDetailsCopy);

  }, []);

  useEffect(() => {
    // Check if the user is authenticated
    const token = getTokenFromCookie();
    if (!token) {
      // User is not authenticated, redirect to login page
      //navigate('/login');
      console.log("cookie error");
    } else {
      // Fetch user data if user is authenticated
      fetchUserData(token);
    }
  }, []);

  // Function to retrieve token from cookie
  const getTokenFromCookie = () => {
    const cookies = document.cookie.split(";");
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split("=");
      if (name === "token") {
        return value;
      }
    }
    return null;
  };

  const handleFieldChange = (originalIndex, fieldName, value) => {
    console.log(
      `Updating field ${fieldName} at original index ${originalIndex} with value:`,
      value
    );
    // Update the projectDetails state with the new value
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[originalIndex][fieldName] =
      value;
    setProjectDetails(updatedProjectDetails);
    setDataChanged(true);
  };

  const handleRCVChange = (index, fieldName, value) => {
    // Validate if the input is a valid number with up to two decimal places
    if (/^(?:\d+)?(?:\.\d{0,2})?$/.test(value) || value === "") {
      // Update the projectDetails state with the new value
      const updatedProjectDetails = { ...projectDetails };
      updatedProjectDetails.project.spreadsheetData[index][fieldName] = value;
      setProjectDetails(updatedProjectDetails);
      setDataChanged(true);
    }
  };

  const handleQuantityChange = (index, value) => {
    // Validate if the input is a valid integer
    if (/^\d+$/.test(value) || value === "") {
      // Update the projectDetails state with the new value
      const updatedProjectDetails = { ...projectDetails };
      updatedProjectDetails.project.spreadsheetData[index]["Quantity"] = value;
      setProjectDetails(updatedProjectDetails);

      setDataChanged(true);
    }
  };

  const handleDepreciationInputChange = (index, value) => {
    // Update the display value directly
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[index][
      "DepreciationDisplay"
    ] = value;


    // Update the actual depreciation value based on the user's input
    const newDepreciation = parseFloat(value) / 100; // Convert the input value to a decimal fraction
    updatedProjectDetails.project.spreadsheetData[index]["Depreciation"] =
      newDepreciation;
    console.log(
      "2: ",
      updatedProjectDetails.project.spreadsheetData[index]["Depreciation"]
    );

    // Update state
    setProjectDetails(updatedProjectDetails);
    setDataChanged(true);
  };

  // Function to fetch user data
  const fetchUserData = async (token) => {
    try {
      const response = await fetch(`${API_URL}/auth/get-user`, {
        method: "GET",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          Authorization: `Bearer ${token}`,
        },
      });
      if (response.ok) {
        const data = await response.json();
        setUserData(data.user);
      } else {
        console.error("Failed to fetch user data");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
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
      ); // Corrected from Item to Description
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

      // Assuming you have the necessary attributes available:
      const originalSpreadsheetData =
        originalProjectDetails.project.spreadsheetData;


      const userFirstName = userData.firstName;

      const userLastName = userData.lastName;

      const userId = userData.id;

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

  const handleDropdownChange = async (selectedOption) => {
    try {
      let modifiedExcelData;
      let fileName;
      if (selectedOption === "option1") {
        const { modifiedExcelData: summaryData } = await generateSummary(
          projectDetails
        );
        modifiedExcelData = summaryData;
        fileName = "Summary.xlsx";
      } else if (selectedOption === "option2") {
        const { modifiedExcelData2: detailData } = await generateDetail(
          projectDetails
        );
        modifiedExcelData = detailData;
        fileName = "Detail.xlsx";
      } else if (selectedOption === "option3") {
        const { modifiedExcelData: rawData } = await generateRawData(
          projectDetails
        );
        modifiedExcelData = rawData;
        fileName = "RawData.xlsx";
      } else if (selectedOption === "option4") {
        const { modifiedExcelData: allData } = await generateAll(
          projectDetails
        );
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

  const calculateRCVAvg = (high, low) => {
    const avg = (Number(high) + Number(low)) / 2;
    //console.log(avg.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    return avg.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const calculateRCVExt = (high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    //console.log(ext.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,"));
    return ext.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const calculateSalesTaxAmount = (salesTax, high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    const taxAmount = (salesTax / 100) * ext;
    return taxAmount.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };

  const calculateRCVTotal = (salesTax, high, low, quantity) => {
    const avg = (Number(high) + Number(low)) / 2;
    const ext = avg * quantity;
    const taxAmount = (salesTax / 100) * ext;
    const total = ext + taxAmount;
    return total.toFixed(2).replace(/\d(?=(\d{3})+\.)/g, "$&,");
  };


  // Define a function to calculate total depreciation
  const calculateDepreciationAmount = (item, projectDetails) => {
    const rcvTotal =
      ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
      item.Quantity;

    let depreciationFactor =
      item.Depreciation * 100 * projectDetails.project.depreciationRange;

    // Ensure that the depreciation factor does not exceed 100
    depreciationFactor = Math.min(depreciationFactor, 100);

    const salesTaxAmount =
      (projectDetails.project.salesTax / 100) *
      (((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
        item.Quantity);
    return ((rcvTotal + salesTaxAmount) * (depreciationFactor / 100)).toFixed(2);
  };

  // Define a function to calculate ACV Total
  const calculateACVTotal = (item, projectDetails) => {
    const rcvTotal =
      ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
      item.Quantity;
    //(projectDetails.project.salesTax / 100) * ((Number(item['RCV High']) + Number(item['RCV Low']))));
    let depreciationFactor =
      item.Depreciation * 100 * projectDetails.project.depreciationRange;
    // Ensure that the depreciation factor does not exceed 100
    depreciationFactor = Math.min(depreciationFactor, 100);
    const salesTaxAmount =
      (projectDetails.project.salesTax / 100) *
      (((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
        item.Quantity);
    const depreciationAmount = (rcvTotal + salesTaxAmount) * (depreciationFactor / 100);

    return ((rcvTotal + salesTaxAmount) - depreciationAmount).toFixed(2);
  };

  const sortedData = filterData().sort((a, b) => {
    return b.Questionable - a.Questionable;
  });

  const handleRowCheckboxChange = (index) => {
    setSelectedRows(prevState => {
      const newState = prevState.includes(index)
        ? prevState.filter(rowIndex => rowIndex !== index)
        : [...prevState, index];
        
      // Log the selected rows
      console.log('Selected Rows:', newState);
      
      return newState;
    });
  };

  const handleSelectAllChange = () => {
  const newSelectedRows =
    selectedRows.length === sortedData.length ? [] : sortedData.map((_, i) => i);
    
  // Log the selected rows
  console.log('Selected Rows:', newSelectedRows);
  
  setSelectedRows(newSelectedRows);
};

const handleUpdateStatus = async () => {
  // Ensure there are selected rows before making the request
  if (selectedRows.length === 0) {
    console.log('No rows selected.');
    return;
  }

  // Access the project ID from projectDetails
  const projectId = projectDetails.project.id;

  try {
    const response = await fetch(`${API_URL}/npc/verify`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ projectId, selectedRows }), // Include projectId and selectedRows in the request body
    });

    if (response.ok) {
      const result = await response.json();
      setPopupMessage("Status updated successfully");
      setPopupType("success");
      setPopupTextColor("green");
    } else {
      console.error('Update failed:', response.statusText);
      setPopupMessage("Failed to update status");
      setPopupType("error");
      setPopupTextColor("red");
    }

    setShowPopup(true);
    setTimeout(() => window.location.reload(), 1500);
  } catch (error) {
    console.error('Request error:', error);
    setPopupMessage("Failed to update status");
    setPopupType("error");
    setPopupTextColor("red");
    setShowPopup(true);
    setTimeout(() => window.location.reload(), 1500);
  }
};

  return (
    <div style={styles.Card}>
      <div style={{ width: "100%", overflow: "auto", borderRadius: "26px" }}>
        <div style={styles.headerRow} className="headerRow">

          {error && (
            <div style={{ color: "red", marginLeft: "10px" }}>
              {errorMessage}
            </div>
          )}

          {/* Search and Filter UI Elements */}
          <div className="search-filter" style={{}}>
            <input
              type="text"
              id="searchInput"
              placeholder="Search contents..."
              value={searchQuery}
              onChange={handleSearchChange}
              style={{ flex: 1, marginRight: "10px", background: "#000", }}
            />
            <select
              id="roomFilter"
              style={styles.dropdown}
              onChange={handleRoomChange}
            >
              <option value="">Filter by Room</option>
            </select>
            <select
              id="itemFilter"
              style={styles.dropdown}
              onChange={handleItemChange}
            >
              <option value="">Filter by Item</option>
            </select>
            <select
              id="classFilter"
              style={styles.dropdown}
              onChange={handleClassChange}
            >
              <option value="">Filter by Class</option>
            </select>
            <select
              id="subclassFilter"
              style={styles.dropdown}
              onChange={handleSubclassChange}
            >
              <option value="">Filter by Subclass</option>
            </select>
          </div>

          <div className="buttons">
          <div style={{ display: "inline-block" }}>
              <button
                style={{
                  ...styles.Button,
                  backgroundColor: selectedRows.length === 0 ? '#808080' : '#4CAF50', // Change color based on disabled state
                  cursor: selectedRows.length === 0 ? 'not-allowed' : 'pointer', // Change cursor to indicate disabled state
                }}
              onClick={handleUpdateStatus}
              disabled={selectedRows.length === 0}
              >
                Mark as Meets Criteria
              </button>
            </div>

            <div style={{ display: "inline-block" }}>
              <button
                style={{
                  ...styles.Button,
                }}
                onClick={handleReconcileGoClick}

                className="saveBtn"
              >
                ReconcileGo
              </button>
            </div>
            <div style={{ display: "inline-block" }}>
              <motion.div
                animate={
                  isDataChanged ? { scale: [1, 1.2, 1, 1.2, 1] } : { scale: 1 }
                } // Apply animation only when isDataChanged is true
                transition={{ duration: 0.2, repeat: 1 }} // Duration and number of repeats
              >
                <button
                  style={{
                    ...styles.Button,
                    backgroundColor: isDataChanged ? "#2a84ea" : "#808080",
                  }}
                  onClick={createChangelogEntry}
                  disabled={!isDataChanged}
                  className="saveBtn"
                >
                  Save
                </button>
              </motion.div>
            </div>
            
            <div style={{ display: "inline-block" }}>
              <select
                style={styles.Button}
                onChange={(event) => handleDropdownChange(event.target.value)}
                className="downloadBtn"
              >
                <option
                  value=""
                  disabled
                  selected
                  style={{ textAlign: "center" }}
                >
                  Download
                </option>
                <option value="option1" style={styles.dropdownOption}>
                  Summary
                </option>
                <option value="option2" style={styles.dropdownOption}>
                  Details
                </option>
                <option value="option3" style={styles.dropdownOption}>
                  Raw Data
                </option>
              </select>
            </div>
          </div>
        </div>
      </div>

      <div style={{ ...styles.spreadsheetContainer }}>
        <div style={styles.spreadsheet}>
          <div style={{ ...styles.row, position: 'sticky', top: 0, backgroundColor: 'white', zIndex: 1 }}>

            <div style={styles.cell}>Line</div>
            <div style={styles.cell}>
              <span>Confidence</span>
              <input
                type="checkbox"
                onChange={handleSelectAllChange}
                checked={selectedRows.length === sortedData.length}
                style={{ marginLeft: '5px' }} // Adjust margin as needed
              />
            </div>
            <div style={styles.cell}>Room</div>
            <div style={styles.cell}>Item</div>
            <div style={styles.bigCell}>Description</div>
            <div style={styles.cell}>QTY</div>
            <div style={styles.cell}>RCV High</div>
            <div style={styles.cell}>RCV Low</div>
            <div style={styles.cell}>RCV Avg (ea)</div>
            <div style={styles.cell}>RCV (ext)</div>
            <div style={styles.cell}>Sales Tax</div>
            <div style={styles.cell}>Sales Tax Amount</div>
            <div style={styles.cell}>RCV Total</div>
            <div style={styles.cell}>Depreciation (%)</div>
            <div style={styles.cell}>Dep Years</div>
            <div style={styles.cell}>Dep Amount</div>
            <div style={styles.cell}>ACV Total</div>
            <div style={styles.bigCell}>Subclass</div>
            <div style={styles.cell}>Class</div>
          </div>
          {/* Render data rows */}
          {sortedData.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.row,
                backgroundColor: index % 2 === 0 ? "#cddef2" : "#f1f1f1",
              }}
            >
              <div style={styles.cell}>{index + 1}</div>
              <div style={styles.cell}>
      {item.Questionable ? (
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <span style={{ color: 'orange' }}>Pending</span>
          <input
            type="checkbox"
            checked={selectedRows.includes(item.originalIndex)}
            onChange={() => handleRowCheckboxChange(item.originalIndex)}
            style={{ marginLeft: '5px' }} // Adjust spacing as needed
          />
        </div>
      ) : (
        <span style={{ color: '#66BB6A' }}>Meets Criteria</span>
      )}
    </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Room}
                  onChange={(e) =>
                    handleFieldChange(
                      item.originalIndex,
                      "Room",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Item}
                  onChange={(e) =>
                    handleFieldChange(
                      item.originalIndex,
                      "Item",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.bigCell}>
                <input
                  style={styles.bigInput}
                  value={item.Description}
                  onChange={(e) =>
                    handleFieldChange(
                      item.originalIndex,
                      "Description",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Quantity}
                  onChange={(e) =>
                    handleQuantityChange(item.originalIndex, e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                <span style={{ marginRight: "2px", marginTop: "4px" }}>$</span>
                <input
                  style={styles.input}
                  value={item["RCV High"]}
                  onChange={(e) =>
                    handleRCVChange(
                      item.originalIndex,
                      "RCV High",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.cell}>
                <span style={{ marginRight: "2px", marginTop: "4px" }}>$</span>
                <input
                  style={styles.input}
                  value={item["RCV Low"]}
                  onChange={(e) =>
                    handleRCVChange(
                      item.originalIndex,
                      "RCV Low",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.cell}>
                ${calculateRCVAvg(item["RCV High"], item["RCV Low"])}
              </div>
              <div style={styles.cell}>
                ${calculateRCVExt(item["RCV High"], item["RCV Low"], item.Quantity)}
              </div>
              <div style={styles.cell}>
                {typeof projectDetails.project.salesTax === "number"
                  ? projectDetails.project.salesTax
                  : projectDetails.project.salesTax}
                %
              </div>
              <div style={styles.cell}>
                ${calculateSalesTaxAmount(projectDetails.project.salesTax, item["RCV High"], item["RCV Low"], item.Quantity)}
              </div>
              <div style={styles.cell}>
                ${calculateRCVTotal(
                  projectDetails.project.salesTax,
                  item["RCV High"],
                  item["RCV Low"],
                  item.Quantity
                )}
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  type="text"
                  value={
                    item.DepreciationDisplay === undefined
                      ? (item.Depreciation * 100).toFixed(2)
                      : item.DepreciationDisplay
                  }
                  onChange={(e) =>
                    handleDepreciationInputChange(
                      item.originalIndex,
                      e.target.value
                    )
                  }
                />
                <span>%</span>
              </div>
              <div style={styles.cell}>
                {projectDetails.project.depreciationRange}
              </div>
              <div style={styles.cell}>
                ${calculateDepreciationAmount(item, projectDetails)}
              </div>
              <div style={styles.cell}>
                ${calculateACVTotal(item, projectDetails)}
              </div>
              <div style={styles.bigCell}>
                <input
                  style={styles.bigInput}
                  value={item.Subclass}
                  onChange={(e) =>
                    handleFieldChange(
                      item.originalIndex,
                      "Subclass",
                      e.target.value
                    )
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Class}
                  onChange={(e) =>
                    handleFieldChange(
                      item.originalIndex,
                      "Class",
                      e.target.value
                    )
                  }
                />
              </div>
            </div>
          ))}
        </div>
      </div>
      {showPopup && (
        <Popup
          message={popupMessage}
          type={popupType}
          textColor={popupTextColor}
        />
      )}
    </div>
  );
};

export default CardContents;
