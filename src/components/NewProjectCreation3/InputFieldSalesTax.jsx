import React, { useState } from "react";
import { isValidSalesTax } from "../../validationUtils";

const styles = {
  Input: {
    top: "543px",
    left: "80px",
    width: "100%",
    height: "45px",
    padding: "0px 8px",
    boxSizing: "border-box",
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
  text: "Sales Tax",
};

const InputFieldSalesTax = (props) => {
  const { value, onChange } = props;
  const [errorMessage, setErrorMessage] = useState("");

  const handleChange = (e) => {
    let newValue = e.target.value;

    // Remove non-digit and non-decimal point characters
    newValue = newValue.replace(/[^\d.]/g, "");

    // Limit input to two digits to the left of the decimal point
    const decimalIndex = newValue.indexOf(".");
    if (decimalIndex !== -1) {
      const integerPart = newValue.substring(0, decimalIndex);
      if (integerPart.length > 2) {
        newValue = newValue.slice(0, 2) + newValue.slice(2).replace(/\./g, ""); // Limit to 2 digits and remove additional decimal points
      }
    } else if (newValue.length > 2) {
      // If no decimal point exists and input length exceeds 2, limit to 2 digits
      newValue = newValue.slice(0, 2);
    }

    // Limit input to two digits after the decimal point
    if (decimalIndex !== -1) {
      const decimalPart = newValue.substring(decimalIndex + 1);
      if (decimalPart.length > 2) {
        newValue = newValue.slice(0, decimalIndex + 3);
      }
    }

    console.log(`InputFieldSalesTax - New value: ${newValue}`);
    onChange("salesTax", newValue);
    setErrorMessage(""); // Clear error message when the user starts typing
  };

  const handleBlur = () => {
    const isValid = isValidSalesTax(value);
    if (!isValid) {
      console.log(
        `InputFieldSalesTax - Validation error: Invalid sales tax format`
      );
      setErrorMessage(
        `Invalid sales tax format. Only enter a number. No % sign`
      );
    } else {
      console.log("InputFieldSalesTax - Validation successful");
      setErrorMessage("");
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

export default InputFieldSalesTax;
