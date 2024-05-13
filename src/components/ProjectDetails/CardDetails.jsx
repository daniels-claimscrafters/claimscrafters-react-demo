// CardDetails.jsx

import React, { useState, useEffect } from "react";
import Popup from "./Popup";

const styles = {
  cardContainer: {
    width: "100%",
    // height: "50%",
    backgroundColor: "#f1f1f1",
    borderRadius: "26px",
    border: "1px solid #505050",
    boxSizing: "border-box",
    alignItems: "center",
    justifyContent: "center",
    padding: "10px",
    display: "flex",
    fontSize: "0.9vw",
  },
  fieldContainer: {
    display: "flex",
    alignItems: "center",
    marginBottom: "2px",
  },
  secondColumn: {
    borderRight: "2px solid #c2c2c2", // Add a border to create the divider effect
    alignItems: "center", // Optional: Add padding to visually separate the columns
    marginBottom: "30px",
    marginRight: "30px",
  },
  label: {
    fontWeight: 700,
    fontFamily: "Poppins, sans-serif",
    color: "#222222",
    width: "20%", // Adjust label width as needed

    display: "flex",
    alignItems: "center",
  },

  input: {
    flex: "1",
    padding: "5px",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: 500,
    border: "1px solid #ceced3",
    color: "#030303",
    outline: "none",
    maxWidth: "70%", // Adjust input width as needed
  },
  addressInput: {
    flex: "1",
    padding: "5px",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: 500,
    border: "1px solid #ceced3",
    color: "#030303",
    outline: "none",
    maxWidth: "70%", // Adjust input width as needed
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  firstInput: {
    flex: "1",
    padding: "5px",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: 500,
    border: "1px solid #ceced3",
    color: "#ffffff",
    textTransform: "capitalize",
    outline: "none",
    maxWidth: "70%", // Adjust input width as needed
    backgroundColor: "#030303",
  },
  dropdownInput: {
    cursor: "pointer",
    flex: "1",
    padding: "5px",
    fontSize: "14px",
    fontFamily: "Poppins",
    fontWeight: 500,
    border: "1px solid #ceced3",
    borderRadius: "12px",
    textTransform: "capitalize",
    outline: "none",
    maxWidth: "70%", // Adjust input width as needed
    color: "#030303",
  },
};

const CardDetails = ({ projectDetails }) => {
  const [selectedStatus, setSelectedStatus] = useState(
    projectDetails.project.status
  );
  const [showPopup, setShowPopup] = useState(false);
  const [popupMessage, setPopupMessage] = useState("");
  const [popupType, setPopupType] = useState("");
  const [popupTextColor, setPopupTextColor] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  useEffect(() => {
    if (projectDetails) {
      setSelectedStatus(projectDetails.project.status);
    }
  }, [projectDetails]);

  if (!projectDetails) {
    return <div>Loading...</div>;
  }

  // Log projectDetails and its properties

  const projectStatusOptions = ["Started", "In Process", "Completed", "Closed"];
  // Render UI using the project details directly
  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    updateProjectStatus(newStatus);
    setTimeout(() => window.location.reload(), 1500);
  };

  const updateProjectStatus = async (newStatus) => {
    try {
      const projectId = projectDetails.project.id;

      const response = await fetch(`${API_URL}/npc/update-status`, {
        method: "PUT",
        headers: {
          "ngrok-skip-browser-warning": "69420",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ projectId, status: newStatus }),
      });

      if (response.ok) {
        setPopupMessage("Project status updated successfully");
        setPopupType("success");
        setPopupTextColor("green");
      } else {
        setPopupMessage("Failed to update project status");
        setPopupType("error");
        setPopupTextColor("red");
      }
      setShowPopup(true);
    } catch (error) {
      console.error("Error updating project status:", error);
      setPopupMessage("Failed to update project status");
      setPopupType("error");
      setPopupTextColor("red");
      setShowPopup(true);
    }
  };

  const formatAddress = (address, city, state, postalCode) => {
    return `${address}, ${city}, ${state} ${postalCode}`;
  };

  const formatAdjusterName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  const formatInsuredName = (firstName, lastName) => {
    return `${firstName} ${lastName}`;
  };

  return (
    <div className="createdProject">
      <div>
        <div>
          <label>Claim Number:</label>
          <input
            type="text"
            value={projectDetails.project.claimNumber}
            readOnly
          />
        </div>
        <div>
          <label>Insured Name:</label>
          <input
            type="text"
            value={formatInsuredName(
              projectDetails.project.insuredFirstName,
              projectDetails.project.insuredLastName
            )}
            readOnly
          />
        </div>
        <div style={styles.fieldContainer}>
          <label>Carrier:</label>
          <input type="text" value={projectDetails.project.carrier} readOnly />
        </div>
      </div>
      <div>
        <div>
          <label>Project Status:</label>
          <select
            className="statusSelection"
            value={selectedStatus}
            onChange={handleStatusChange}
          >
            {projectStatusOptions.map((status, index) => (
              <option key={index} value={status}>
                {status}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label>Insured Address:</label>
          <input
            type="text"
            value={formatAddress(
              projectDetails.project.lossAddress,
              projectDetails.project.lossCity,
              projectDetails.project.lossState,
              projectDetails.project.lossPostalCode
            )}
            readOnly
          />
        </div>
      </div>
      <div>
        <div>
          <label>Adjuster Name:</label>
          <input
            type="text"
            value={formatAdjusterName(
              projectDetails.project.adjusterFirstName,
              projectDetails.project.adjusterLastName
            )}
            readOnly
          />
        </div>
        <div>
          <label>Adjuster Email:</label>
          <input
            type="email"
            value={projectDetails.project.adjusterEmail}
            readOnly
          />
        </div>
        <div>
          <label>Adjuster Phone:</label>
          <input
            type="tel"
            value={projectDetails.project.adjusterPhone}
            readOnly
          />
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

export default CardDetails;
