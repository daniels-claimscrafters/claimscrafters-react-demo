// Popup.jsx

import React from 'react';
import { motion } from "framer-motion";

const Popup = ({ message, type, textColor, }) => {

    const popupContainerStyle = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        zIndex: '999',
        
      };

    const popupStyle = {
    border: '1px solid #505050',
    backgroundColor: '#f1f1f1',
    color: textColor,
    padding: '20px',
    borderRadius: '26px',
    boxShadow: '0 4px 6px rgba(0, 0, 0, 0.9)',
      };

  return (
<div style={popupContainerStyle}>
    <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 0.5 }} // Transition duration
        >


    
    <div style={popupStyle}>
  <p style={{ marginBottom: '0' }}>{message}</p>
</div>
    

</motion.div>
</div>
  );
};

export default Popup;