//PasswordResetPage.jsx
import React, { useState } from "react";
import "./PasswordReset.css";
import { useNavigate } from "react-router-dom";
import { isValidCreatePassword } from "../../validationUtils";
import axios from "axios";
import ButtonSubmit from "./ButtonSubmit";
import ImageMain from "./ImageMain";
import InputFieldConfirmPassword from "./InputFieldConfirmPassword";
import InputFieldNewPassword from "./InputFieldNewPassword";

import TextShow from "./TextShow";
import Popup from "./Popup";

const PasswordResetPage = () => {
  // State variables to hold the new password and confirmed password
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const [showPRCPage, setPRCPage] = useState(false);
  const navigate = useNavigate();
  const urlParams = new URLSearchParams(window.location.search);
  const resetPasswordToken = urlParams.get("token");
  const API_URL = process.env.REACT_APP_API_URL;
  console.log(resetPasswordToken);

  // Function to handle password change submission
  const handlePasswordChange = async () => {
    // Perform client-side validation
    if (!isValidCreatePassword(newPassword)) {
      // Validate the new password
      setErrorMessage(
        "Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character."
      );
      return;
    }
    if (newPassword !== confirmPassword) {
      setErrorMessage("Passwords do not match");
      return;
    }

    // Send request to server to change password
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password`, {
        newPassword,
        confirmPassword,
        resetPasswordToken, // Include any additional data needed for password reset, such as reset token
      });
      // Handle success response
      console.log("Password changed successfully");

      setPRCPage(true);
    } catch (error) {
      // Handle error response
      console.error("Error changing password:", error.response.data.error);
      setErrorMessage("Failed to change password. Please try again.");
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        width: "100%",
        background: "#04101E",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="passwordResetDiv">
        <ImageMain />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            width: "100%",
          }}
        >
          <h3>Change Your Password</h3>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>New Password:</label>
            {/* Input field for new password */}
            <InputFieldNewPassword
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            >
              <TextShow />
            </InputFieldNewPassword>
          </div>
          <div
            style={{
              width: "100%",
              display: "flex",
              flexDirection: "column",
              alignItems: "start",
            }}
          >
            <label>Confirm New Password:</label>
            {/* Input field to confirm new password */}
            <InputFieldConfirmPassword
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            >
              <TextShow />
            </InputFieldConfirmPassword>
          </div>
          {/* Button to submit password change */}
          <ButtonSubmit onClick={handlePasswordChange} />

          {/* Display error message if any */}

          {errorMessage && <div style={{ color: "red" }}>{errorMessage}</div>}
        </div>
        {showPRCPage && <Popup />}
      </div>
    </div>
  );
};

export default PasswordResetPage;
