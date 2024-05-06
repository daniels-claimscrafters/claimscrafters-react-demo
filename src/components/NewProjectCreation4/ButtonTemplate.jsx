//ButtonTemplate.jsx

import React from "react";

const API_URL = process.env.REACT_APP_API_URL;

const styles = {
  Button: {
    cursor: "pointer",
    top: "825px",
    left: "588px",
    width: "300px",
    height: "36px",
    padding: "0px 8px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "12px",
    backgroundColor: "#FF0000",
    color: "#ffffff",
    fontSize: "14px",
    fontFamily: "Poppins",
    lineHeight: "16px",
    outline: "none",
    marginBottom: "10px",
  },
};

const defaultProps = {
  label: "Download Contents IQ Inventory Template",
};

const Button = (props) => {
  const downloadTemplate = async () => {
    try {
      const response = await fetch(`${API_URL}/npc/get-template`, {
        responseType: "arraybuffer", // Specify response type as array buffer
      });

      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "template.xlsx");
      document.body.appendChild(link);
      link.click();
      link.parentNode.removeChild(link);
    } catch (error) {
      console.error("Error downloading template:", error);
    }
  };

  return (
    <button style={styles.Button} onClick={downloadTemplate}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;
