import React from "react";

const styles = {
  Button: {
    cursor: "pointer",
    top: "1323px",
    left: "1159px",
    width: "140px",
    height: "40px",
    padding: "0px 8px",
    border: "0",
    boxSizing: "border-box",
    borderRadius: "12px",
    backgroundColor: "#2a84ea",
    color: "#ffffff",
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "26px",
    outline: "none",
  },
  DisabledButton: {
    backgroundColor: "#999999",
    cursor: "not-allowed",
  },
};

const defaultProps = {
  label: "Continue",
  onClick: () => {}, // Default empty function for onClick
};

const ButtonContinue = (props) => {
  const { label, onClick, disabled } = props;

  const buttonStyle = disabled
    ? { ...styles.Button, ...styles.DisabledButton }
    : styles.Button;

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default ButtonContinue;
