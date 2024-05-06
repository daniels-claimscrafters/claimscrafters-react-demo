import React from "react";

const defaultProps = {
  text: "Email address",
};

const InputField = ({ text, value, onChange, onBlur }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e); // Pass the entire event object
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e); // Pass the entire event object
    }
  };

  return (
    <input
      placeholder={text ?? defaultProps.text}
      value={value ?? ""}
      onChange={handleChange}
      onBlur={handleBlur} // Add onBlur handling
      style={{ width: "90%" }}
    />
  );
};

export default InputField;
