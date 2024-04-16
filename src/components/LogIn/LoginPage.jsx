// LoginPage.jsx
import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ButtonLogIn from './ButtonLogIn';
import Checkbox from './Checkbox';
import IconEmail from './IconEmail';
import IconPassword from './IconPassword';
import ImageHeader from './ImageHeader';
import ImageJumbotron from './ImageJumbotron';
import InputFieldEmail from './InputFieldEmail';
import InputFieldPassword from './InputFieldPassword';
import TextEmailField from './TextEmailField';
import TextForgotPassword from './TextForgotPassword';
import TextIDHAA from './TextIDHAA';
import TextPasswordField from './TextPasswordField';
import TextRememberMe from './TextRememberMe';
import TextSignup from './TextSignup';
import TextSubtitle from './TextSubtitle';
import TextTitle from './TextTitle';
import IconHome from './IconHome';
import { motion } from "framer-motion";

const LogInPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState(''); // State for error message
  const [authenticated, setAuthenticated] = useState(false);
  const API_URL = process.env.REACT_APP_API_URL;
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery({ maxWidth: 1250 });

  useEffect(() => {
    // Check if the user is authenticated (e.g., by checking the presence of a JWT token in the cookie)
    const isAuthenticated = document.cookie.includes('token='); // Adjust this logic as per your cookie setup
    setAuthenticated(isAuthenticated);
  }, []);

  useEffect(() => {
    // Redirect authenticated users away from the login page
    if (authenticated) {
      navigate('/pmhs'); // Redirect to the home page or another route
    }
  }, [authenticated, navigate]);

  useEffect(() => {
    const storedEmail = localStorage.getItem('rememberedEmail');
    if (storedEmail) {
      setEmail(storedEmail);
      setRememberMe(true);
    }
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${API_URL}/auth/login`, {
        email,
        password,
      });
      console.log('Login response:', response); // Log the entire response object
      if (response.status === 200) {
        // Extract token from login response
        const { token } = response.data;

        // Store token as HTTP cookie
        document.cookie = `token=${token}; path=/;`;

        console.log('Token stored:', token); // Log the stored token
        // Redirect to PMHS page upon successful login
        navigate('/pmhs');
        console.log('Redirecting to PMHS page...'); // Log the redirection attempt
      } else {
        setError('Login failed. Please check your credentials and try again.'); // Set error message
      }
    } catch (error) {
      console.error('Error during login', error);
      if (error.response && error.response.status === 401) {
        const errorMessage = error.response.data.error; // Get error message from backend response
        if (errorMessage === 'Email not confirmed. Please check your email for confirmation instructions.') {
          setError(errorMessage); // Set error message for email not confirmed
        } else {
          setError('Invalid credentials. Please check your email and password and try again.'); // Set error message for other 401 responses
        }
      } else {
        setError('An error occurred during login. Please try again later.'); // Set generic error message
      }
    }
  };

  const handleRememberMeChange = (isChecked, event) => {
    console.log('Checkbox state:', isChecked);
    console.log('Email:', email);
    
    setRememberMe(isChecked);
    if (isChecked) {
      localStorage.setItem('rememberedEmail', email);
    } else {
      localStorage.removeItem('rememberedEmail');
    }
  };
  

  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      {/* Left column with ImageJumbotron */}
      {!isSmallScreen && ( 
        <div style={{ flexShrink: 0, height: '100%' }}>
        <motion.div
          style={{ height: '100%' }}
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        >
          <ImageJumbotron />
        </motion.div>
        </div>)}
  
      {/* Right column with form */}
      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <div style={{ textAlign: 'center', display: 'flex', alignItems: 'center', width: '100%' }}>
          {/* ImageHeader */}
          <div style={{ flex: 1, display: 'flex', justifyContent: 'center', paddingLeft: '70px' }}>
          <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
        ><ImageHeader /></motion.div>
          </div>
          {/* IconHome */}
          
          <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
          transition={{ duration: 1.0 }} // Transition duration
        ><IconHome /></motion.div>
          
        </div>
        <TextTitle />
        <TextSubtitle />
        {/* Error message */}
        {error && <div style={{ color: 'red', marginBottom: '10px' }}>{error}</div>}
        {/* Form */}
        <form onSubmit={handleLogin}>
          {/* Email Field */}
          <div style={{ marginBottom: '10px' }}>
            <div>
              <TextEmailField />
              <InputFieldEmail value={email} onChange={(e) => setEmail(e.target.value)}>
                <IconEmail style={{ marginLeft: '10px' }} />
              </InputFieldEmail>
            </div>
          </div>
          {/* Password Field */}
          <div style={{ marginBottom: '10px' }}>
            <div>
              <TextPasswordField />
              <InputFieldPassword value={password} onChange={(e) => setPassword(e.target.value)}>
                <IconPassword style={{ marginLeft: '10px' }} />
              </InputFieldPassword>
            </div>
          </div>
          {/* Remember Me and Forgot Password */}
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center' }}>
              <TextRememberMe />
              <Checkbox checked={rememberMe} onChange={handleRememberMeChange} />
            </div>
            <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.span
      whileHover={{ textDecoration: 'underline' }} // Animate underline on hover
      style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
    ><TextForgotPassword style={{ marginLeft: 'auto' }} /></motion.span>
              
            </div>
          </div>
          {/* Login Button */}
          <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
          whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
        ><ButtonLogIn type="submit" /></motion.div>
          
        </form>
        {/* IDHAA and Signup text */}
        <div style={{ display: 'flex', marginLeft: '20px' }}>
          <TextIDHAA />
          <motion.span
      whileHover={{ textDecoration: 'underline' }} // Animate underline on hover
      style={{ cursor: 'pointer' }} // Change cursor to pointer on hover
    ><TextSignup /></motion.span>
          
        </div>
      </div>
    </div>
  );
};

export default LogInPage;