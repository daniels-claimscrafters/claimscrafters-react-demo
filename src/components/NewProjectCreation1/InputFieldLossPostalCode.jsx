import React, { useState } from "react";
import { isNotEmpty } from "../../validationUtils";

const styles = {
  Input: {
    top: "1166px",
    left: "83px",
    width: "100%",
    height: "45px",
    padding: "0px 8px",
    boxSizing: "border-box",

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
  text: "Loss Postal Code",
};

const InputFieldLossPostalCode = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldLossPostalCode - New value: ${newValue}`);
    onChange("lossPostalCode", newValue);

    // Clear validation error when user starts typing
    setValidationError("");
    updateValidationErrors(true);
    // Trigger blur event when the length reaches 5 characters
    if (newValue.length === 5) {
      handleBlur(newValue);
    }
  };

  const handleBlur = () => {
    // Check if value is defined before validation
    if (value !== undefined) {
      const error = isNotEmpty(value);
      if (error) {
        console.log(`InputFieldLossPostalCode - Validation error: ${error}`);
        // Set the validation error
        setValidationError(error);
        updateValidationErrors(true);
      } else {
        // Clear the validation error if there is no error
        setValidationError("");
        updateValidationErrors(false);
      }
    }
  };

  return (
    <div>
      <input
        style={styles.Input}
        placeholder={props.text ?? defaultProps.text}
        value={value || ""}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {validationError && (
        <div style={styles.ErrorMessage}>{validationError}</div>
      )}
    </div>
  );
};

export default InputFieldLossPostalCode;
