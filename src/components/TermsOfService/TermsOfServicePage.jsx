// TermsOfServicePage.jsx

import React, { useEffect } from "react";
import HeaderBackground from "./HeaderBackground";
import IconHome from "./IconHome";
import ImageLogo from "./ImageLogo";
import TextBody from "./TextBody";
import TextHeader from "./TextHeader";
import { motion } from "framer-motion";

const TermsOfServicePage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []); // Empty dependency array ensures this effect runs only once
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        background: "#04101E",
        color: "white",
        textAlign: "justify",
      }}
    >
      {/* Header Section */}
      <HeaderBackground>
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <motion.div
            initial={{ scale: 0 }} // Initial scale is 0
            animate={{ scale: 1 }} // Animate to scale 1
            transition={{ duration: 1.0 }} // Transition duration
          >
            <ImageLogo />
          </motion.div>
          <motion.div
            initial={{ scale: 0 }} // Initial scale is 0
            animate={{ scale: 1 }} // Animate to scale 1
            whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
            transition={{ duration: 1.0 }} // Transition duration
          >
            <IconHome />
          </motion.div>
        </div>
      </HeaderBackground>

      {/* Body Section */}
      <div style={{ padding: "10px" }}>
        <TextHeader />
        <TextBody />
      </div>
    </div>
  );
};

export default TermsOfServicePage;
