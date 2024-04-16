// ForgotPasswordPage.jsx

import React, { useState } from 'react';
import axios from 'axios';
import TextHeader from './TextHeader';
import TextEmail from './TextEmail';
import TextBody from './TextBody';
import TextBack from './TextBack';
import InputFieldEmail from './InputFieldEmail';
import ImageMain from './ImageMain';
import IconBack from './IconBack';
import ButtonSend from './ButtonSend';
import { motion } from "framer-motion";
import Popup from './Popup';
import { isValidEmailNPC } from '../../validationUtils';


const ForgotPasswordPage = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [showFpPage, setshowFpPage] = useState('')
  const API_URL = process.env.REACT_APP_API_URL;
  

  const handleSendEmail = async (e) => {
    e.preventDefault();

    const isValid = isValidEmailNPC(email);
    if (isValid !== null) {
      setError(isValid); // Display error message
      return; // Exit the function early
    }
    
    try {
      const response = await axios.post(`${API_URL}/auth/reset-password-request`, {
        email: email,
      });

      setshowFpPage(true)
    } catch (error) {
      setError('Failed to send reset password email. Please try again later.');
    }
  };

    return (
      <div style={{ position: 'relative', height: '100vh' }}>
        <div style={{ position: 'absolute', top: 0, left: 0, padding: '10px' }}>
        <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        ><ImageMain /></motion.div>
  <div style={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
  <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
          transition={{ duration: 1.0 }} // Transition duration
        ><IconBack /></motion.div>
  <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
          transition={{ duration: 1.0 }} // Transition duration
        ><TextBack /></motion.div>
  </div>
</div>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}>
          <div style={{ textAlign: 'center' }}>
            <TextHeader />
            <TextEmail />
            <InputFieldEmail value={email} onChange={(e) => setEmail(e.target.value.replace(/\s/g, ''))} />
            <TextBody />
            <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
          transition={{ duration: 1.0 }} // Transition duration
        ><ButtonSend onClick={handleSendEmail} /></motion.div>
            
            {showFpPage && <Popup />}
            {error && <div style={{ color: 'red', marginTop: '10px' }}>{error}</div>}
          </div>
        </div>
      </div>
    );
  };
  

export default ForgotPasswordPage;