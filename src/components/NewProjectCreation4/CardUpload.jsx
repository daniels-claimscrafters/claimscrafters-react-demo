import React, { useRef, useState } from 'react';

const styles = {
  Card: {
    top: '498px',
    left: '153px',
    width: '1163px',
    height: '365px',
    backgroundColor: '#ffffff',
    borderRadius: '12px',
    border: '1px solid #030303',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 8px rgba(0, 0, 0, 0.16)',
    cursor: 'pointer',
  },
  FileInput: {
    display: 'none', // Hide the input visually
  },
  UploadedFileName: {
    color: '#030303', // Match specified font color
    fontSize: '16px', // Match specified font size
    fontFamily: 'Poppins', // Match specified font family
    textAlign: 'center', // Align text center
  },
};

const CardUpload = (props) => {
  const { onFileUpload, onClick } = props;
  const fileInputRef = useRef(null);

  const handleClick = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
    if (onClick) {
      onClick();
    }
  };

  const handleFileChange = (event) => {
    const uploadedFile = event.target.files[0];
    // Check if a file was selected
  if (!uploadedFile) {
    // Display a message to the user or perform any other action
    console.log('No file selected');
    return;
  }
  
    const reader = new FileReader();

    reader.onload = (event) => {
      const fileContent = event.target.result;
      onFileUpload(uploadedFile.name, fileContent);
    };

    reader.readAsArrayBuffer(uploadedFile);
  };

  return (
    <div style={styles.Card} onClick={handleClick}>
      <input
        type="file"
        accept=".xlsx, .xls"
        style={styles.FileInput}
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      {props.children}
      
    </div>
  );
};

export default CardUpload;

