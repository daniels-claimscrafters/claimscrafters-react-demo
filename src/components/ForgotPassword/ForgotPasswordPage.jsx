// ForgotPasswordPage.jsx

import React, { useState } from "react";
import "./ForgotPassword.css";
import axios from "axios";
import TextHeader from "./TextHeader";
import TextEmail from "./TextEmail";
import TextBody from "./TextBody";
import TextBack from "./TextBack";
import InputFieldEmail from "./InputFieldEmail";
import ImageMain from "./ImageMain";
import IconBack from "./IconBack";
import ButtonSend from "./ButtonSend";
import { motion } from "framer-motion";
import Popup from "./Popup";
import { isValidEmailNPC } from "../../validationUtils";
import { useNavigate } from "react-router-dom";

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");
  const [showFpPage, setshowFpPage] = useState("");
  const API_URL = process.env.REACT_APP_API_URL;

  const handleSendEmail = async (e) => {
    e.preventDefault();

    const isValid = isValidEmailNPC(email);
    if (isValid !== null) {
      setError(isValid); // Display error message
      return; // Exit the function early
    }

    try {
      const response = await axios.post(
        `${API_URL}/auth/reset-password-request`,
        {
          email: email,
        }
      );

      setshowFpPage(true);
    } catch (error) {
      setError("Failed to send reset password email. Please try again later.");
    }
  };
  const handleClick = () => {
    navigate("/login"); // Redirect to login page when clicked
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        gap: "20px",
        background: "#04101E",
        minHeight: "100vh",
      }}
    >
      <div
        style={{
          width: "100%",
          display: "flex",
          background: "#132A58",
          justifyContent: "space-between",
          padding: "20px",
        }}
      >
        <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        >
          <ImageMain />
        </motion.div>
        <div
          style={{ display: "flex", alignItems: "center", marginLeft: "10px" }}
          onClick={handleClick}
        >
          <motion.div
            initial={{ scale: 0 }} // Initial scale is 0
            animate={{ scale: 1 }} // Animate to scale 1
            whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
            transition={{ duration: 1.0 }} // Transition duration
          >
            <IconBack />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }} // Initial scale is 0
            animate={{ scale: 1 }} // Animate to scale 1
            whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
            transition={{ duration: 1.0 }} // Transition duration
          >
            <h4 style={{ color: "white" }}>Back to login</h4>
          </motion.div>
        </div>
      </div>
      <div className="forgotDiv">
        <h3 style={{ fontSize: "1.8rem" }}>Forgot Your Password</h3>
        <div>
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value.replace(/\s/g, ""))}
            style={{ width: "100%" }}
          />
        </div>
        <p>
          {
            "Enter your email below and we'll send you a link on how to reset it"
          }
        </p>
        <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
          transition={{ duration: 1.0 }} // Transition duration
        >
          <ButtonSend onClick={handleSendEmail} />
        </motion.div>

        {showFpPage && <Popup />}
        {error && (
          <div style={{ color: "red", marginTop: "10px" }}>{error}</div>
        )}
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
