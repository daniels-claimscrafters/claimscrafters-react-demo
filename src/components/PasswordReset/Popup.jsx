// Popup.jsx

import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import IconMain from './IconMain'; // Import IconMain component

const Popup = () => {
    const navigate = useNavigate();

    const handleLogin = () => {
        // Navigate to "/login" route
        navigate('/login');
      };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
    <motion.div
      initial={{ scale: 0 }} // Initial scale is 0
      animate={{ scale: 1 }} // Animate to scale 1
      transition={{ duration: 0.5 }} // Transition duration
      style={{
        backgroundColor: '#f0f0f0',
        padding: '20px',
        borderRadius: '8px',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.6)',
        width: '800px',
        height: '450px',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center',
      }}
    >
      <div style={{ marginBottom: '10px' }}>
        <IconMain /> {/* Include IconMain component here */}
      </div>
      <h2 style={{ 
        textAlign: 'center',
        color: '#030303',
    fontSize: '32px',
    fontFamily: 'Poppins',
    fontWeight: '500',
        lineHeight: '10px',
        margin: 0,
      }}>Password Changed!</h2>
      <p style={{ 
        textAlign: 'center',
       
        color: '#030303',
    fontSize: '14px',
    fontFamily: 'Poppins',
    
        lineHeight: '30px',
        marginTop: '20px',
      }}>Your password has successfully been changed. Login to access your ContentIQ account.</p>
      <button style={{
        padding: '10px 20px',
        borderRadius: '4px',
        backgroundColor: '#007bff',
        color: '#ffffff',
        border: 'none',
        cursor: 'pointer',
        width: '250px'
      }} onClick={handleLogin}>Login</button>
    </motion.div>
  </div>
    );
};

export default Popup;