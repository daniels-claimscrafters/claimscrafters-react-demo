import React from "react";

const StatusCard = ({ status }) => {
  // Define the function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case "Started":
        return "#00ff00"; // Green color for Started status
      case "In Process":
        return "#1e90ff"; // Orange color for In Process status
      case "Completed":
        return "#ffa500"; // Red color for Complete status
      case "Closed":
        return "#ceced3"; // Grey color for Closed status
      default:
        return "#000000"; // Default color
    }
  };
  // Define styles for the card
  const cardStyles = {
    backgroundColor: getStatusColor(status), // You can define this function to return different colors based on status
    fontSize: "14px",
    fontWeight: "bold",
    borderRadius: "15px",
    padding: "2px 10px",
    color: "white",
  };
  const paragraphStyles = {
    margin: "0", // Set margin to 0 to override Bootstrap CSS
  };

  return (
    <div style={cardStyles}>
      <p style={paragraphStyles}>{status}</p>
    </div>
  );
};

export default StatusCard;
