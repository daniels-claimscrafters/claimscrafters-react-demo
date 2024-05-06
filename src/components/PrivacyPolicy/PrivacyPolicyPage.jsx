// PrivacyPolicyPage.jsx

// Import React
import React, { useEffect } from "react";

// Import Privacy Policy Components
import CardBackground from "./CardBackground";
import IconHome from "./IconHome";
import ImageLogo from "./ImageLogo";
import TextMain from "./TextMain";
import TextHeader from "./TextHeader";
import { motion } from "framer-motion";

const PrivacyPolicyPage = () => {
  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []); // Empty dependency array ensures this effect runs only once
  return (
    <div style={{ background: "#04101E", textAlign: "justify" }}>
      {/* Header Section */}
      <CardBackground>
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
      </CardBackground>

      {/* Body Section */}
      <div style={{ padding: "10px" }}>
        <TextHeader />
        <TextMain />
      </div>
    </div>
  );
};

export default PrivacyPolicyPage;
