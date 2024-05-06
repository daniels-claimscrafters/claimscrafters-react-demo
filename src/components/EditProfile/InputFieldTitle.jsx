// InputFieldTitle.jsx

// InputFieldTitle.jsx

import React, { useState } from "react";
import { isValidTitle } from "../../validationUtils";

const styles = {
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Title",
};

const InputField = (props) => {
  const { value, onChange, text, updateValidationErrors, userData } = props;
  const [error, setError] = useState("");
  const title = userData.title;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isValidTitle(inputValue)) {
      setError("Please enter a valid title.");
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
        placeholder={title ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
