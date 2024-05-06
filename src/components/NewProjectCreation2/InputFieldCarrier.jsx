import React, { useState } from "react";
import { isNotEmpty } from "../../validationUtils";

const styles = {
  Input: {
    top: "676px",
    left: "722px",
    width: "100%",
    height: "45px",
    padding: "0px 8px",

    fontSize: "20px",
    fontFamily: "Poppins",
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
  text: "Carrier",
};

const InputFieldCarrier = (props) => {
  const { value, onChange } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldCarrier - New value: ${newValue}`);
    onChange("carrier", newValue);
    setErrorMessage(""); // Clear error message when user starts typing
  };

  const handleBlur = () => {
    const validationError = isNotEmpty(value);
    if (validationError) {
      console.log(`InputFieldCarrier - Validation error: ${validationError}`);
      setErrorMessage(validationError);
    }
    const trimmedValue = value.trim();

    // Update the value only if it has changed
    if (trimmedValue !== value) {
      onChange("carrier", trimmedValue);
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

export default InputFieldCarrier;
