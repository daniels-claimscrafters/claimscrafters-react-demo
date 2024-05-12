// ButtonSendMessage.jsx

import React, { useState } from "react";

const styles = {
  Button: {
    cursor: "pointer",
    margin: "20px auto",
    width: "140px",
    height: "40px",
    padding: "0px 8px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "12px",
    backgroundColor: "#2a84ea",
    color: "#ffffff",
    fontSize: "16px",
    fontFamily: "Poppins",
    fontWeight: 600,
    lineHeight: "21px",
    outline: "none",
  },
  DisabledButton: {
    backgroundColor: "#999999",
    cursor: "not-allowed",
  },
  ClickedButton: {
    backgroundColor: "#4CAF50", // Change the color to whatever you prefer
  },
};

const defaultProps = {
  label: "Send message",
};

const Button = (props) => {
  const { label, onClick, disabled } = props;
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    onClick(); // Call the onClick function passed from the parent component
    setTimeout(() => {
      setClicked(false); // Revert back to original style after 500 milliseconds
    }, 500);
  };

  const buttonStyle = disabled
    ? { ...styles.Button, ...styles.DisabledButton }
    : clicked
    ? { ...styles.Button, ...styles.ClickedButton }
    : styles.Button;

  return (
    <button style={buttonStyle} onClick={handleClick} disabled={disabled}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default Button;
