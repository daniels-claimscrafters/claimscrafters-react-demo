// InputFieldClaimNumber.jsx
import React, { useState } from "react";
import { isNotEmpty } from "../../validationUtils";

const styles = {
  Input: {
    top: "676px",
    left: "80px",
    width: "100%",
    height: "45px",
    padding: "0px 8px",
    boxSizing: "border-box",

    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 500,
    lineHeight: "26px",
    textTransform: "capitalize",
    outline: "none",
  },
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Claim Number",
};

const InputFieldClaimNumber = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldClaimNumber - New value: ${newValue}`);
    onChange("claimNumber", newValue);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleBlur = () => {
    updateValidationErrors(false);
    const validationError = isNotEmpty(value);
    if (validationError) {
      console.log(
        `InputFieldClaimNumber - Validation error: ${validationError}`
      );
      setErrorMessage(validationError);
      updateValidationErrors(true);
    }
    const trimmedValue = value.trim();

    // Update the value only if it has changed
    if (trimmedValue !== value) {
      onChange("claimNumber", trimmedValue);
    }
  };

  return (
    <div>
      <input
        style={styles.Input}
        placeholder={props.text ?? defaultProps.text}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldClaimNumber;
