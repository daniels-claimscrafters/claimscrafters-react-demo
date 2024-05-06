// InputFieldOrganization.jsx

import React, { useState } from "react";
import { isValidCompany } from "../../validationUtils";

const styles = {
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Organization",
};

const InputField = (props) => {
  const { value, onChange, text, updateValidationErrors, userData } = props;
  const [error, setError] = useState("");
  const organization = userData.company;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isValidCompany(inputValue)) {
      setError("Please enter a valid organization name.");
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
        placeholder={organization ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
