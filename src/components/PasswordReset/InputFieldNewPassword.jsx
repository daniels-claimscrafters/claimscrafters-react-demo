//InputFieldNewPassword.jsx

import React from "react";

const InputFieldNewPassword = ({ value, onChange }) => {
  return (
    <input
      type="password"
      placeholder="New Password"
      value={value}
      onChange={onChange}
      style={{ width: "90%" }}
    />
  );
};

export default InputFieldNewPassword;
