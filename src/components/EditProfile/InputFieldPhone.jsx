// InputFieldPhone.jsx

import React, { useState } from "react";
import { isValidPhone } from "../../validationUtils";

const styles = {
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Phone",
};

const InputField = (props) => {
  const { value, onChange, text, updateValidationErrors, userData } = props;
  const [error, setError] = useState("");
  const phone = userData.phone;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isValidPhone(inputValue)) {
      setError("Please enter a valid phone number.");
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
        placeholder={phone ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
