// InputFieldConfirmPassword.jsx
import React from "react";

const InputFieldConfirmPassword = ({ value, onChange }) => {
  return (
    <input
      type="password"
      placeholder="Confirm New Password"
      value={value}
      onChange={onChange}
      style={{ width: "90%" }}
    />
  );
};

export default InputFieldConfirmPassword;
