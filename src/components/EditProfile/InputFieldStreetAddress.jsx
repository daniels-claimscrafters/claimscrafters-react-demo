// InputFieldStreetAddress.jsx

// InputFieldStreetAddress.jsx

import React, { useState } from "react";
import { isNotEmpty } from "../../validationUtils";

const styles = {
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Street Address",
};

const InputField = (props) => {
  const { value, onChange, text, updateValidationErrors, userData } = props;
  const [error, setError] = useState("");
  const streetAddress = userData.streetAddress;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (isNotEmpty(inputValue)) {
      setError("Please enter a street address.");
      updateValidationErrors(true);
    } else {
      setError("");
      updateValidationErrors(false);
    }
    onChange(e);
  };

  return (
    <div className="inputFill">
      <input
        style={styles.Input}
        placeholder={streetAddress ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
