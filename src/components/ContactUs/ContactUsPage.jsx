import React, { useState, useEffect } from 'react';
import { useMediaQuery } from 'react-responsive';
import axios from 'axios';
import ButtonSendMessage from './ButtonSendMessage';
import ButtonSignUp from './ButtonSignUp';
import CardFooterBackground from './CardFooterBackground';
import Header from './Header';
import ImageFooterLogo from './ImageFooterLogo';
import ImageJumbotron from './ImageJumbotron';
import ImageLogo from './ImageLogo';
import InputFieldEmail from './InputFieldEmail';
import InputFieldMessage from './InputFieldMessage';
import InputFieldName from './InputFieldName';
import TextEmailField from './TextEmailField';
import TextMainBody from './TextMainBody';
import TextMainHeader from './TextMainHeader';
import TextMessageField from './TextMessageField';
import TextNameField from './TextNameField';
import TextPrivacyPolicy from './TextPrivacyPolicy';
import TextSignIn from './TextSignIn';
import TextTermsOfUse from './TextTermsOfUse';
import VerticalDividerFooter from './VerticalDividerFooter';
import { isNotEmpty2, isValidEmail } from '../../validationUtils';
import ReCAPTCHA from "react-google-recaptcha";
import { motion } from "framer-motion";
import Popup from './Popup'

const ContactUsPage = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [formSubmitted, setFormSubmitted] = useState(false);
  const [recaptchaValue, setRecaptchaValue] = useState('');
  const [submitEnabled, setSubmitEnabled] = useState(false);
  const [FailureMessage, setFailureMessage] = useState('');
  const [showCudbPage, setShowCudbPage] = useState(false);
  const isSmallScreen = useMediaQuery({ maxWidth: 1280, maxHeight: 850 });
  const API_URL = process.env.REACT_APP_API_URL;

  const handleRecaptchaChange = (value) => {
    setRecaptchaValue(value);
    setSubmitEnabled(!!value);
  };

  const [validationErrors, setValidationErrors] = useState({
    name: '',
    email: '',
    message: '',
  });

  useEffect(() => {
    window.scrollTo(0, 0); // Scroll to the top of the page when component mounts
  }, []);

  useEffect(() => {
    // Enable submit button if all fields are filled and there are no validation errors
    setSubmitEnabled(!!name && !!email && !!message && !!recaptchaValue && Object.values(validationErrors).every(error => !error));
  }, [name, email, message, recaptchaValue, validationErrors]);

  const handleNameChange = (e) => {
    setName(e.target.value);
    setValidationErrors({ ...validationErrors, name: '' });
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setValidationErrors({ ...validationErrors, email: '' });
  };

  const handleMessageChange = (e) => {
    setMessage(e.target.value);
    setValidationErrors({ ...validationErrors, message: '' });
  };

  const handleNameBlur = () => {
    const isValid = isNotEmpty2(name);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      name: isValid ? '' : 'Invalid name.',
    }));
  };

  const handleEmailBlur = () => {
    const isValid = isValidEmail(email);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      email: isValid ? '' : 'Invalid email.',
    }));
  };

  const handleMessageBlur = () => {
    const isValid = isNotEmpty2(message);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      message: isValid ? '' : 'Invalid message.',
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Form submitted with reCAPTCHA value:", recaptchaValue);

    try {
      // Add your validation checks here before making the API call
      if (!isNotEmpty2(name)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          name: 'Invalid name.',
        }));
        console.error('Invalid name');
        return;
      }

      if (!isValidEmail(email)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          email: 'Invalid email.',
        }));
        console.error('Invalid email');
        return;
      }

      if (!isNotEmpty2(message)) {
        setValidationErrors((prevErrors) => ({
          ...prevErrors,
          message: 'Invalid message.',
        }));
        console.error('Invalid message');
        return;
      }
      const response = await axios.post(`${API_URL}/email/contact`, {
        name,
        email,
        message,
        recaptchaToken: recaptchaValue, // Include the reCAPTCHA token in the request
      });

      if (response.status === 200) {
        setTimeout(() => {
          setShowCudbPage(true);
        }, 0);
        setName('');
        setEmail('');
        setMessage('');
        setRecaptchaValue('');
      } else {
        console.error('Form submission failed');
        setFormSubmitted(true); // Update formSubmitted state to true
        setFailureMessage('Your message was sent successfully!');
      }
    } catch (error) {
      console.error('Error during form submission', error);
      setFormSubmitted(true); // Set formSubmitted to true to trigger rendering of failure message
      setFailureMessage('An unexpected error occurred. Please try again later.'); // Set failure message
    }
  };

  return (
    <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', minHeight: '720px', minWidth: '1280px' }}>
      <Header>
        {/* Header content */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '100%' }}>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              transition={{ duration: 1.0 }} // Transition duration
            ><ImageLogo /></motion.div>

          </div>
          <div style={{ display: 'flex', alignItems: 'center' }}>
            <motion.div
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
              transition={{ duration: 1.0 }} // Transition duration
            ><TextSignIn style={{ marginRight: '10px' }} /></motion.div>

            <motion.div
              initial={{ scale: 0 }} // Initial scale is 0
              animate={{ scale: 1 }} // Animate to scale 1
              whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
              transition={{ duration: 1.0 }} // Transition duration
            ><ButtonSignUp /></motion.div>

          </div>
        </div>
      </Header>

      <div style={{ display: 'flex', height: '85%' }}>
  {/* Left column with ImageJumbotron */}
  <div style={{ flex: 1 }}>
    <motion.div
      style={{ height: '100%' }}
      initial={{ scale: 0 }} // Initial scale is 0
      animate={{ scale: 1 }} // Animate to scale 1
      transition={{ duration: 1.0 }} // Transition duration
    >
      <ImageJumbotron />
    </motion.div>
  </div>

  {/* Right column with other elements */}
  <div style={{ 
    flex: 1, 
    display: 'flex', 
    flexDirection: 'column', 
    justifyContent: 'center', 
    alignItems: 'center',
    height: '100%',
  }}>
    
    <TextMainHeader />
    <TextMainBody />
    {/* Add similar rendering for other components */}
    {formSubmitted && (
      <div style={{ color: 'red', marginBottom: '10px' }}>
        {FailureMessage}
      </div>
    )}
    <form onSubmit={handleSubmit}>
      {/* Name Field */}
      <div>
        <TextNameField />
        <InputFieldName value={name} onChange={handleNameChange} onBlur={handleNameBlur} />
        {validationErrors.name && <div style={{ color: 'red' }}>{validationErrors.name}</div>}
      </div>
      {/* Email Field */}
      <div>
        <TextEmailField />
        <InputFieldEmail value={email} onChange={handleEmailChange} onBlur={handleEmailBlur} />
        {validationErrors.email && <div style={{ color: 'red' }}>{validationErrors.email}</div>}
      </div>
      {/* Message Field */}
      <div>
        <TextMessageField />
        <InputFieldMessage value={message} onChange={handleMessageChange} onBlur={handleMessageBlur} />
        {validationErrors.message && <div style={{ color: 'red' }}>{validationErrors.message}</div>}
      </div>
      {/* reCAPTCHA v3 */}
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
        <ReCAPTCHA
          sitekey="6LcqgZQpAAAAAPvJIRRCHA5wMhk-npenCAPDjKsN" // Your reCAPTCHA site key
          onChange={handleRecaptchaChange}
        />
      </div>
      {/* Use ButtonSendMessage as the submit button */}
      <motion.div
        initial={{ scale: 0 }} // Initial scale is 0
        animate={{ scale: 1 }} // Animate to scale 1
        whileHover={{ scale: 1.1 }} // Scale up to 1.1 when hovered
        transition={{ duration: 1.0 }} // Transition duration
      >
        <ButtonSendMessage type="submit" disabled={!submitEnabled}>Send Message</ButtonSendMessage>
      </motion.div>
    </form>
  </div>
</div>

      {/* Elements under two columns and nested inside CardFooterBackground */}
      

      {showCudbPage && <Popup />}

    </div>
  );
};

export default ContactUsPage;
