// PasswordResetPage.jsx

import React from "react";
import Button from "./Button";
import "./PasswordChange.css";
import IconMain from "./IconMain";
import ImageMain from "./ImageMain";
import Text1 from "./Text1";
import Text2 from "./Text2";
import TextHeader from "./TextHeader";

const PasswordResetPage = () => {
  return (
    <div
      style={{
        width: "100%",
        height: "100vh",
        background: "#04101E",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div className="changePasswordDiv">
        <img src="ContentsIQ.png" alt="" style={{ width: "140px" }} />

        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <IconMain />
          <h3>Passowrd Changed</h3>
          <p>Your password has successfully been changed.</p>
          <p>Login to access your ContentIQ account.</p>
          <Button />
        </div>
      </div>
    </div>
  );
};

export default PasswordResetPage;
