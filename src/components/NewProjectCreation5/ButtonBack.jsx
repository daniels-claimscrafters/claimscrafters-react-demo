// ButtonBack.jsx

import React from "react";

const styles = {
  Button: {
    cursor: "pointer",
    top: "1323px",
    left: "961px",
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
};

const defaultProps = {
  label: "Back",
};

const ButtonBack = ({ label, onBack, resetParentData }) => {
  const handleClick = () => {
    if (onBack) {
      resetParentData();
      onBack(); // Invoke the onBack function passed as prop
    }
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      {label ?? "Back"}
    </button>
  );
};

export default ButtonBack;
