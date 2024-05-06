import React from "react";

const styles = {
  Input: {
    top: "941px",
    left: "318px",
    width: "150px",
    height: "29px",
    padding: "0px 8px",
    border: "1px solid #2a84ea",
    boxSizing: "border-box",
    borderRadius: "8px",
    boxShadow: "0px 0px 10px rgba(0,0,0,0.1)",
    backgroundColor: "#f1f1f1",
    color: "#000000",
    fontSize: "16px",
    fontFamily: "Poppins",
    lineHeight: "21px",
    outline: "none",
  },
};

const InputFieldFullName = ({ value, onChange }) => {
  const handleChange = (event) => {
    const newValue = event.target.value;
    onChange(newValue);
  };

  return (
    <input
      style={styles.Input}
      placeholder="Enter Pin"
      value={value}
      onChange={handleChange}
      type="password"
    />
  );
};

export default InputFieldFullName;
