// InputFieldLastName.jsx

import React, { useState } from "react";
import { isValidLastName } from "../../validationUtils";

const styles = {
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Last Name",
};

const InputField = (props) => {
  const { value, onChange, text, userData, updateValidationErrors } = props;
  const [error, setError] = useState("");
  const lastName = userData.lastName;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isValidLastName(inputValue)) {
      setError("Please enter a valid last name.");
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
        placeholder={lastName ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
