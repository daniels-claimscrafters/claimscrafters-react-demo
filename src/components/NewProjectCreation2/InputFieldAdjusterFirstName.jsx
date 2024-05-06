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
  text: "Adjuster First Name",
};

const InputFieldAdjusterFirstName = (props) => {
  const { value, onChange } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldAdjusterFirstName - New value: ${newValue}`);
    onChange("adjusterFirstName", newValue);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleBlur = () => {
    const validationError = isNotEmpty(value);
    if (validationError) {
      console.log(`InputFieldCarrier - Validation error: ${validationError}`);
      setErrorMessage(validationError);
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

export default InputFieldAdjusterFirstName;
