import React from 'react';


const statuscard = ({ status }) => {
    
    // Define the function to get color based on status
  const getStatusColor = (status) => {
    switch (status) {
      case 'Started':
        return '#00ff00'; // Green color for Started status
      case 'In Process':
        return '#1e90ff'; // Orange color for In Process status
      case 'Completed':
        return '#ffa500'; // Red color for Complete status
      case 'Closed':
        return '#ceced3'; // Grey color for Closed status
      default:
        return '#000000'; // Default color
    }
  };
  // Define styles for the card
  const cardStyles = {
    backgroundColor: getStatusColor(status), // You can define this function to return different colors based on status
    color: '#ffffff', // Text color
    padding: '20px', // Padding
    borderRadius: '24px', // Border radius
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)', // Box shadow
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: '500',
    width: '90px',
    height: '12px',
    display: 'flex', // Set display to flex
  justifyContent: 'center', // Center horizontally
  alignItems: 'center', // Center vertically
  };
  const paragraphStyles = {
    margin: '0', // Set margin to 0 to override Bootstrap CSS
  };

  

  return (
    <div style={cardStyles}>
      <p style={paragraphStyles}>{status}</p>
    </div>
  );
};

export default statuscard;