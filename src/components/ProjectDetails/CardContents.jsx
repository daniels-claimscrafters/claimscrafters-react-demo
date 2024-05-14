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

const styles = {
  Card: {
    width: "100%",
    height: "50vh",
    maxHeight: "50vh",
    backgroundColor: "#04101E",
    color: "white",
    borderRadius: "26px",
    border: "1px solid white",
    boxSizing: "border-box",
  },
  headerRow: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center", // Center items vertically
    padding: "10px",
    borderBottom: "1px solid #ccc",
    color: "white",
    width: "100%",
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
    backgroundColor: "#04101E",
  },
  row: {
    display: "flex",
    borderBottom: "1px solid #ccc",
    // padding: "10px 0",
    boxSizing: "border-box",
    width: "fit-content",
    color: "white",
    backgroundColor: "#04101E",
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
    backgroundColor: "#04101E",
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
    backgroundColor: "#04101E",
  },
  bigInput: {
    display: "flex",
    justifyContent: "center",
    width: "100px",
    fontSize: "12px",
    fontWeight: 600,
    color: "white",
    backgroundColor: "#04101E",
  },
  input: {
    display: "flex",
    justifyContent: "center",
    width: "60px",
    fontSize: "12px",
    fontWeight: 600,
    color: "white",
    backgroundColor: "#04101E",
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
    width: "155px",
    height: "30px",
    marginRight: "30px",
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
};

const CardContents = ({ projectDetails, setProjectDetails }) => {
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

  useEffect(() => {
    // Store the original projectDetails when the component mounts
    const originalProjectDetailsCopy = JSON.parse(
      JSON.stringify(projectDetails)
    );
    setOriginalProjectDetails(originalProjectDetailsCopy);
    console.log("Original Project Details set:", originalProjectDetailsCopy);
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

  const handleFieldChange = (index, fieldName, value) => {
    console.log(
      `Updating field ${fieldName} at index ${index} with value:`,
      value
    );
    // Update the projectDetails state with the new value
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[index][fieldName] = value;
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
      console.log(originalProjectDetails);
      console.log(projectDetails);
      setDataChanged(true);
    }
  };

  const handleDepreciationInputChange = (index, value) => {
    // Update the display value directly
    const updatedProjectDetails = { ...projectDetails };
    updatedProjectDetails.project.spreadsheetData[index][
      "DepreciationDisplay"
    ] = value;
    console.log(
      "1: ",
      updatedProjectDetails.project.spreadsheetData[index][
        "DepreciationDisplay"
      ]
    );

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
      console.log("Original Project Details:", originalSpreadsheetData);

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

  // Define a function to calculate total depreciation
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
    return (rcvTotal * (depreciationFactor / 100) + salesTaxAmount).toFixed(2);
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
    const depreciationAmount = rcvTotal * (depreciationFactor / 100);
    return (rcvTotal - depreciationAmount).toFixed(2);
  };

  return (
    <div style={styles.Card}>
      <div style={styles.headerRow} className="headerRow">
        <div style={styles.titleText} className="titleText">
          Contents Inventory
        </div>
        {error && (
          <div style={{ color: "red", marginLeft: "10px" }}>{errorMessage}</div>
        )}
        <div>
          <div style={{ display: "inline-block", marginRight: "10px" }}>
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
      <div style={{ ...styles.spreadsheetContainer }}>
        <div style={styles.spreadsheet}>
          <div style={styles.row}>
            <div style={styles.cell}>Line</div>
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
          {projectDetails.project.spreadsheetData.map((item, index) => (
            <div
              key={index}
              style={{
                ...styles.row,
                backgroundColor: index % 2 === 0 ? "#cddef2" : "#f1f1f1",
              }}
            >
              <div style={styles.cell}>{index + 1}</div>
              <div style={{ ...styles.cell }}>
                <input
                  style={styles.input}
                  value={item.Room}
                  onChange={(e) =>
                    handleFieldChange(index, "Room", e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Item}
                  onChange={(e) =>
                    handleFieldChange(index, "Item", e.target.value)
                  }
                />
              </div>
              <div style={styles.bigCell}>
                <input
                  style={styles.bigInput}
                  value={item.Description}
                  onChange={(e) =>
                    handleFieldChange(index, "Description", e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Quantity}
                  onChange={(e) => handleQuantityChange(index, e.target.value)}
                />
              </div>
              <div style={styles.cell}>
                <span style={{ marginRight: "2px", marginTop: "4px" }}>$</span>
                <input
                  style={styles.input}
                  value={item["RCV High"]}
                  onChange={(e) =>
                    handleRCVChange(index, "RCV High", e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                <span style={{ marginRight: "2px", marginTop: "4px" }}>$</span>
                <input
                  style={styles.input}
                  value={item["RCV Low"]}
                  onChange={(e) =>
                    handleRCVChange(index, "RCV Low", e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                $
                {((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2)
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
              <div style={styles.cell}>
                $
                {(
                  ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
                  item.Quantity
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
              <div style={styles.cell}>
                {typeof projectDetails.project.salesTax === "number"
                  ? projectDetails.project.salesTax
                  : projectDetails.project.salesTax}
                %
              </div>
              <div style={styles.cell}>
                $
                {(
                  (projectDetails.project.salesTax / 100) *
                  (((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
                    item.Quantity)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
              </div>
              <div style={styles.cell}>
                $
                {(
                  ((Number(item["RCV High"]) + Number(item["RCV Low"])) / 2) *
                    item.Quantity +
                  (projectDetails.project.salesTax / 100) *
                    (((Number(item["RCV High"]) + Number(item["RCV Low"])) /
                      2) *
                      item.Quantity)
                )
                  .toFixed(2)
                  .replace(/\d(?=(\d{3})+\.)/g, "$&,")}
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
                    handleDepreciationInputChange(index, e.target.value)
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
                    handleFieldChange(index, "Subclass", e.target.value)
                  }
                />
              </div>
              <div style={styles.cell}>
                <input
                  style={styles.input}
                  value={item.Class}
                  onChange={(e) =>
                    handleFieldChange(index, "Class", e.target.value)
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
