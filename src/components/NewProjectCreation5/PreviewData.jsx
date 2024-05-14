import React, { useState, useEffect } from "react";
import { MdDelete } from "react-icons/md";
import * as XLSX from "xlsx";

const PreviewData = ({ excelData, onColumnsSelected, resetParentData }) => {
  const [selectedWorksheet, setSelectedWorksheet] = useState("");
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [selectedQuantity, setSelectedQuantity] = useState(null);
  const [selectedRoom, setSelectedRoom] = useState(null);
  const [selectedItem, setSelectedItem] = useState(null);
  const [error, setError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [worksheetOptions, setWorksheetOptions] = useState([]);
  const [tableData, setTableData] = useState([]);
  const [columnNames, setColumnNames] = useState([]);
  const [selectWorksheetText, setSelectWorksheetText] = useState("");
  const [selectDescriptionText, setSelectDescriptionText] = useState("");
  const [selectQuantityText, setSelectQuantityText] = useState("");
  const [selectItemText, setSelectItemText] = useState("");
  const [selectRoomText, setSelectRoomText] = useState("");
  const [startOverDisabled, setStartOverDisabled] = useState(true);
  const [submitDisabled, setSubmitDisabled] = useState(true);

  const confirmMappingDisabled =
    !selectedDescription || !selectedQuantity || !submitDisabled;

  useEffect(() => {
    const convertExcelDataToWorkbook = () => {
      try {
        const arrayBuffer = excelData;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        return workbook;
      } catch (err) {
        console.error("Error reading Excel data", err);
        return null;
      }
    };

    const workbook = convertExcelDataToWorkbook(excelData);

    if (workbook) {
      const worksheetNames = workbook.SheetNames;
      setWorksheetOptions(worksheetNames);

      const firstSheetName = workbook.SheetNames[0];
      setSelectedWorksheet(firstSheetName);
      setSelectWorksheetText(firstSheetName);

      const ws = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const genericColumnHeaders = jsonData[0].map(
        (header, index) => `Column ${String.fromCharCode(65 + index)}`
      );
      setColumnNames(genericColumnHeaders);

      jsonData.unshift(genericColumnHeaders);

      // Add a row number column to the formatted data
    const formattedData = jsonData.map((row, rowIndex) => {
      const formattedRow = {};
    
      if (rowIndex === 0) {
        // Treat the first row as headers
        formattedRow['Row Number'] = 'Row Number'; // Add an empty cell for the "Row Number" column in the header row
        row.forEach((header, index) => {
          formattedRow[header] = `Column ${String.fromCharCode(65 + index)}`;
        });
      } else {
        // Treat subsequent rows as data
        formattedRow['Row Number'] = rowIndex; // Set the row number as the index for subsequent rows
        genericColumnHeaders.forEach((header, index) => {
          formattedRow[header] = row[index];
        });
      }
      return formattedRow;
    });

      setTableData(formattedData);
    }
  }, []);

  function processData(selectedWorksheet) {
    setSelectedWorksheet(selectedWorksheet);
    setSelectWorksheetText(selectedWorksheet);
    console.log("triggered!");
    console.log("t2: ", selectedWorksheet);
    if (!selectedWorksheet) return;

    console.log("uf1", selectedWorksheet);

    setError(false);
    setErrorMessage("");

    const arrayBuffer = excelData;
    const workbook = XLSX.read(arrayBuffer, { type: "array" });
    const ws = workbook.Sheets[selectedWorksheet];
    const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

    const genericColumnHeaders = jsonData[0].map(
      (header, index) => `Column ${String.fromCharCode(65 + index)}`
    );
    console.log("uf2", genericColumnHeaders);
    setColumnNames(genericColumnHeaders);
    console.log(columnNames);
    jsonData.unshift(genericColumnHeaders);

     // Add a row number column to the formatted data
     const formattedData = jsonData.map((row, rowIndex) => {
      const formattedRow = {};
    
      if (rowIndex === 0) {
        // Treat the first row as headers
        formattedRow['Row Number'] = 'Row Number'; // Add an empty cell for the "Row Number" column in the header row
        row.forEach((header, index) => {
          formattedRow[header] = `Column ${String.fromCharCode(65 + index)}`;
        });
      } else {
        // Treat subsequent rows as data
        formattedRow['Row Number'] = rowIndex; // Set the row number as the index for subsequent rows
        genericColumnHeaders.forEach((header, index) => {
          formattedRow[header] = row[index];
        });
      }
      return formattedRow;
    });
    setTableData(formattedData);
    // Reset state variables
    setSelectedDescription(null);
    setSelectedQuantity(null);
    setSelectedRoom(null);
    setSelectedItem(null);

    // Set disabled state variables
    setStartOverDisabled(true);
    setSubmitDisabled(true);

    setSelectDescriptionText("");
    setSelectQuantityText("");
    setSelectRoomText("");
    setSelectItemText("");
    resetParentData();
  }

  const handleColumnSelection = (inputFieldName, columnName) => {
    console.log("1", inputFieldName);
    console.log("2", columnName);
    const columnIndex = columnNames.indexOf(columnName);
    console.log("h1: ", columnIndex);
    if (columnIndex !== -1) {
      // Extract values from the selected column, excluding the first element (header row)
      const columnValues = tableData.slice(1).map((row) => row[columnName]);
      console.log("h2: ", columnValues);
      // Update the respective state variable based on the selected input field
      switch (inputFieldName) {
        case "description":
          setSelectedDescription(columnValues);
          break;
        case "qty":
          setSelectedQuantity(columnValues);
          break;
        case "room":
          setSelectedRoom(columnValues);
          break;
        case "item":
          setSelectedItem(columnValues);
          break;
        default:
          break;
      }
      console.log("des", selectedDescription);
      console.log("q", selectedQuantity);
      console.log("item", selectedItem);
      console.log("room", selectedRoom);
    }
  };

  const handleConfirmMapping = () => {
    setError(false);
    setErrorMessage("");

    // Create a new array for the updated table data
    const updatedTableData = [];

    // Add the static first row with the headers
    const headerRow = ["Description", "Quantity"];
    if (selectedItem !== null) {
      headerRow.push("Item");
    }
    if (selectedRoom !== null) {
      headerRow.push("Room");
    }
    updatedTableData.push(headerRow);

    // Iterate over the arrays simultaneously and generate each row dynamically
    for (let i = 0; i < selectedDescription.length; i++) {
      // Create a new row array with the corresponding values from each array
      const newRow = [selectedDescription[i], selectedQuantity[i]];

      // Check if all values in the row are undefined
      const allUndefined = newRow.every((value) => value === undefined);
      if (!allUndefined) {
        // Check if the description column contains non-empty strings
        if (
          selectedDescription[i] === "" ||
          selectedDescription[i] === undefined
        ) {
          setError(true);
          setErrorMessage(`(Error on row ${i + 1}) Description column cannot contain any empty cells`);
          return; // Abort
        }

        // Check if the quantity column contains only numbers
        if (isNaN(selectedQuantity[i])) {
          setError(true);
          setErrorMessage(`(Error on row ${i + 1}) Quantity column can only contain numbers and non-empty cells`);
          return; // Abort
        }

        if (selectedItem !== null) {
          newRow.push(selectedItem[i]);
        }
        if (selectedRoom !== null) {
          newRow.push(selectedRoom[i]);
        }

        updatedTableData.push(newRow);
      }
    }

    console.log("yo", updatedTableData);

    // Set the state of tableData to the updated table data array without delete buttons
    setTableData(updatedTableData);
    setStartOverDisabled(false);
    setSubmitDisabled(false);
  };

  // Function to handle start over button click
  const handleStartOver = () => {
    const convertExcelDataToWorkbook = () => {
      try {
        const arrayBuffer = excelData;
        const workbook = XLSX.read(arrayBuffer, { type: "array" });
        return workbook;
      } catch (err) {
        console.error("Error reading Excel data", err);
        return null;
      }
    };

    const workbook = convertExcelDataToWorkbook(excelData);

    if (workbook) {
      const worksheetNames = workbook.SheetNames;
      setWorksheetOptions(worksheetNames);

      const firstSheetName = workbook.SheetNames[0];
      setSelectedWorksheet(firstSheetName);

      const ws = workbook.Sheets[firstSheetName];
      const jsonData = XLSX.utils.sheet_to_json(ws, { header: 1 });

      const genericColumnHeaders = jsonData[0].map(
        (header, index) => `Column ${String.fromCharCode(65 + index)}`
      );
      setColumnNames(genericColumnHeaders);
      jsonData.unshift(genericColumnHeaders);
      const formattedData = jsonData.map((row, rowIndex) => {
        const formattedRow = {};
        if (rowIndex === 0) {
          // Treat the first row as headers
          row.forEach((header, index) => {
            formattedRow[header] = `Column ${String.fromCharCode(65 + index)}`;
          });
        } else {
          // Treat subsequent rows as data
          genericColumnHeaders.forEach((header, index) => {
            formattedRow[header] = row[index];
          });
        }
        return formattedRow;
      });

      setTableData(formattedData);
    }

    // Reset state variables
    setSelectedDescription(null);
    setSelectedQuantity(null);
    setSelectedRoom(null);
    setSelectedItem(null);

    // Set disabled state variables
    setStartOverDisabled(true);
    setSubmitDisabled(true);

    setSelectDescriptionText("");
    setSelectQuantityText("");
    setSelectRoomText("");
    setSelectItemText("");
    resetParentData();
  };

  // Function to handle submit button click
  const handleSubmit = () => {
    // Logic to handle form submission or other actions when submit button is clicked

    // Extract the header row from the tableData
    const headerRow = tableData[0];

    // Determine the order of columns (description, quantity, room, item) based on the header row
    const columnIndex = {
      description: headerRow.indexOf("Description"),
      quantity: headerRow.indexOf("Quantity"),
      room: headerRow.indexOf("Room"),
      item: headerRow.indexOf("Item"),
    };

    // Create a copy of the tableData excluding the first row (header)
    const dataWithoutHeader = tableData.slice(1);

    // Transform the data into the desired format (array of objects)
    const formattedData = dataWithoutHeader.map((row) => {
      const rowData = {};

      // Assign description and quantity
      rowData.description = row[columnIndex.description].toString();
      rowData.quantity = row[columnIndex.quantity];

      // Assign room and item based on their indices if they exist
      if (columnIndex.room !== -1 && row.length > columnIndex.room) {
        rowData.room = row[columnIndex.room];
      } else {
        rowData.room = "Unknown Room"; // Default value for room if missing
      }

      if (columnIndex.item !== -1 && row.length > columnIndex.item) {
        rowData.item = row[columnIndex.item];
      } else {
        rowData.item = "Unknown Item"; // Default value for item if missing
      }

      return rowData;
    });

    console.log("fd: ", formattedData);
    // Pass the modified and formatted tableData up to the parent component
    onColumnsSelected(formattedData);
  };

  const handleDeleteRow = (rowIndex) => {
    // Create a copy of the current tableData
    const updatedTableData = [...tableData];

    // Remove the row at the specified index
    updatedTableData.splice(rowIndex, 1);

    // Update the tableData state with the modified data
    setTableData(updatedTableData);

    setSelectedDescription(null);
    setSelectedQuantity(null);
    setSelectedRoom(null);
    setSelectedItem(null);
    setSelectDescriptionText("");
    setSelectQuantityText("");
    setSelectRoomText("");
    setSelectItemText("");
  };

  return (
    <div style={styles.cardContainer}>
      <div style={styles.inputRow}>
        <label style={styles.label} htmlFor="selectedWorksheet">
          Worksheet:{" "}
        </label>
        <select
          id="selectedWorksheet"
          className="inputField"
          value={selectWorksheetText}
          onChange={(e) => {
            console.log("Selected worksheet:", e.target.value);
            setSelectedWorksheet(e.target.value);
            setSelectWorksheetText(e.target.value);
            processData(e.target.value);
            console.log("Selected worksheet2:", e.target.value);
          }}
        >
          {worksheetOptions.map((worksheet, index) => (
            <option key={index} value={worksheet}>
              {worksheet}
            </option>
          ))}
        </select>
      </div>

      {error && errorMessage && (
        <div style={styles.errorMessage}>{errorMessage}</div>
      )}

      <div className="tableBody">
        {tableData.map((row, rowIndex) => (
          <div key={rowIndex} style={styles.tableRow}>
            {rowIndex !== 0 && ( // Exclude delete button for the header row
              <div className="firstCol">
                <button onClick={() => handleDeleteRow(rowIndex)}>
                  <MdDelete style={{ color: "white", fontSize: "2rem" }} />
                </button>
              </div>
            )}
            {rowIndex === 0 && <div key="emptyCell" className="firstCol"></div>}{" "}
            {/* Empty cell for the first row */}
            {Object.values(row).map((cell, cellIndex) => (
              <div key={cellIndex} className="tableCell">
                {cell}
              </div>
            ))}
          </div>
        ))}
      </div>

      <div className="inputRow">
        <div>
          <label style={styles.label} htmlFor="selectedRoom">
            Room:{" "}
          </label>
          <select
            id="selectedRoom"
            className="inputField"
            value={selectRoomText}
            onChange={(e) => {
              setSelectRoomText(e.target.value); // Update the select field text
              handleColumnSelection("room", e.target.value); // Handle the column selection
            }}
          >
            <option value="" disabled selected hidden>
              (Optional)
            </option>
            {columnNames.map((columnName, index) => (
              <option key={index} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label style={styles.label} htmlFor="selectedItem">
            Item:{" "}
          </label>
          <select
            id="selectedItem"
            className="inputField"
            value={selectItemText}
            onChange={(e) => {
              setSelectItemText(e.target.value); // Update the select field text
              handleColumnSelection("item", e.target.value); // Handle the column selection
            }}
          >
            <option value="" disabled selected hidden>
              (Optional)
            </option>
            {columnNames.map((columnName, index) => (
              <option key={index} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label} htmlFor="selectedDescription">
            Description:{" "}
          </label>
          <select
            id="selectedDescription"
            className="inputField"
            value={selectDescriptionText}
            onChange={(e) => {
              setSelectDescriptionText(e.target.value); // Update the select field text
              handleColumnSelection("description", e.target.value); // Handle the column selection
            }}
          >
            <option value="" disabled selected hidden>
              Select Column
            </option>
            {columnNames.map((columnName, index) => (
              <option key={index} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label style={styles.label} htmlFor="selectedQuantity">
            Quantity:{" "}
          </label>
          <select
            id="selectedQuantity"
            className="inputField"
            value={selectQuantityText}
            onChange={(e) => {
              setSelectQuantityText(e.target.value); // Update the select field text
              handleColumnSelection("qty", e.target.value); // Handle the column selection
            }}
          >
            <option value="" disabled selected hidden>
              Select Column
            </option>
            {columnNames.map((columnName, index) => (
              <option key={index} value={columnName}>
                {columnName}
              </option>
            ))}
          </select>
        </div>

        <button
          className={`${confirmMappingDisabled ? "disable" : "confirmButton"}`}
          disabled={confirmMappingDisabled}
          onClick={handleConfirmMapping}
        >
          Confirm Column Mapping
        </button>
      </div>

      <div style={{ display: "flex" }}>
        {" "}
        {/* Container for buttons */}
        <button
          disabled={startOverDisabled}
          onClick={handleStartOver}
          style={{
            ...styles.button3,
            backgroundColor: startOverDisabled
              ? "#ccc"
              : styles.button3.backgroundColor,
          }}
        >
          Restart
        </button>
        <button
          disabled={submitDisabled}
          onClick={handleSubmit}
          style={{
            ...styles.button4,
            backgroundColor: submitDisabled
              ? "#ccc"
              : styles.button4.backgroundColor,
          }}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

const styles = {
  cardContainer: {
    width: "95vw",
    minWidth: "80%",
    // height: "375px",
    margin: "0 auto",
    padding: "15px",
    border: "1px solid #04101E",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#132A58",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
  },

  tableContainer: {
    width: "90%",
    marginTop: "20px",
    border: "1px solid #ccc",
    borderRadius: "8px",
  },
  headerRow: {
    display: "flex",
    flexDirection: "row",
  },
  columnHeader: {
    flex: 1,
    padding: "10px",
    maxWidth: "150px", // Adjust the width as needed
    textAlign: "left",
    fontWeight: "bold",
    border: "1px solid #ccc",
  },

  tableRow: {
    display: "flex",
    flexDirection: "row",
  },

  label: {
    fontSize: "20px",
    fontFamily: "Poppins",
    marginRight: "5px",
    marginBottom: "0px",
  },
  button1: {
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "#2a84ea",
    color: "#ffffff",
    fontSize: "20px",
    fontFamily: "Poppins",
    outline: "none",
    border: "0",
  },

  button3: {
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "#FF0000",
    color: "black",
    padding: "5px",
    fontSize: "20px",
    fontFamily: "Poppins",
    outline: "none",
    border: "0",
    marginRight: "10px",
  },
  button4: {
    cursor: "pointer",
    borderRadius: "12px",
    backgroundColor: "#2a84ea",
    color: "black",
    padding: "5px",
    fontSize: "20px",
    fontFamily: "Poppins",
    outline: "none",
    border: "0",
  },
  errorMessage: {
    color: "red",
    fontSize: "12px",
    marginBottom: "5px",
  },
};

export default PreviewData;
