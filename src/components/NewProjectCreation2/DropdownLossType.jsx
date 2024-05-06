// DropdownLossType.jsx
import React, { useState } from "react";

const styles = {
  Dropdown: {
    cursor: "pointer",
    top: "676px",
    left: "80px",
    width: "100%",
    height: "45px",
    padding: "0px 8px",
    borderBottom: "2px solid white",
    boxSizing: "border-box",
    backgroundColor: "#04101E",
    color: "white",
    fontSize: "20px",
    fontFamily: "Poppins",
    lineHeight: "26px",
    outline: "none",
  },
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  label: "Loss Type",
  values: ["Fire", "Water", "Storm", "Mold", "Bio", "Other"],
};

const DropdownLossType = (props) => {
  const { value, onChange } = props;
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`Dropdown - New value: ${newValue}`);
    onChange("lossType", newValue); // Change 'lossState' to 'lossType'

    // Clear validation error when user selects an option
    setValidationError("");
  };

  const handleBlur = () => {
    // Check if value is defined before validation
    if (value !== undefined && value.trim() === "") {
      console.log(`Dropdown - Validation error: Please select a type`);
      // Set the validation error
      setValidationError("Please select a type");
    }
  };

  return (
    <div>
      <select
        style={styles.Dropdown}
        defaultValue=""
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
      >
        <option value="" disabled hidden>
          {props.label ?? defaultProps.label}
        </option>
        {(props.values ?? defaultProps.values).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
      {validationError && (
        <div style={styles.ErrorMessage}>{validationError}</div>
      )}
    </div>
  );
};

export default DropdownLossType;
