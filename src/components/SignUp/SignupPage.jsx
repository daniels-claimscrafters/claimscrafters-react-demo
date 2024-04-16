// SignupPage.jsx

import React, { useState } from 'react';
import {
  isValidFirstName,
  isValidLastName,
  isValidTitle,
  isValidCompany,
  isValidPhone,
  isValidEmail,
  isValidCreatePassword,
  isValidConfirmPassword,
} from '../../validationUtils';
import ButtonSignup from './ButtonSignup';
import Checkbox from './Checkbox';
import ImageLogo from './ImageLogo';
import InputFieldCAP from './InputFieldCAP';
import InputFieldCompany from './InputFieldCompany';
import InputFieldCP from './InputFieldCP';
import InputFieldEmail from './InputFieldEmail';
import InputFieldFirstName from './InputFieldFirstName';
import InputFieldLastName from './InputFieldLastName';
import InputFieldPhone from './InputFieldPhone';
import InputFieldTitle from './InputFieldTitle';
import TextAlreadyHave from './TextAlreadyHave';
import TextAnd from './TextAnd';
import TextBySigning from './TextBySigning';
import TextCompany from './TextCompany';
import TextConfirmPassword from './TextConfirmPassword';
import TextCreateAPassword from './TextCreateAPassword';
import TextEmail from './TextEmail';
import TextFirstName from './TextFirstName';
import TextHeader from './TextHeader';
import TextLastName from './TextLastName';
import TextLogIn from './TextLogIn';
import TextPhone from './TextPhone';
import TextPrivacy from './TextPrivacy';
import TextSubtitle from './TextSubtitle';
import TextTitle from './TextTitle';
import TextTOU from './TextTOU';
import IconHome from './IconHome';
import { motion } from "framer-motion";
import Popup from './Popup'

const SignupPage = () => {
  const [showEvdbPage, setShowEvdbPage] = useState(false);
  const [isAgreeChecked, setIsAgreeChecked] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const API_URL = process.env.REACT_APP_API_URL;

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    createPassword: '',
    confirmPassword: '',
  });

  const [validationErrors, setValidationErrors] = useState({
    firstName: '',
    lastName: '',
    title: '',
    company: '',
    phone: '',
    email: '',
    createPassword: '',
    confirmPassword: '',
  });

  const handleChange = (fieldName, value) => {
    let formattedValue = value;

    // Check if the field is the email
  if (fieldName === 'email') {
    // Remove spaces
    formattedValue = formattedValue.replace(/\s/g, '');
    // Convert to lowercase
    formattedValue = formattedValue.toLowerCase();
  }

  if (fieldName === 'title' || fieldName === 'company') {
    // Capitalize the first letter
    formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
  }

    if (fieldName === 'firstName' || fieldName === 'lastName') {
      // Remove leading and trailing spaces
      formattedValue = formattedValue.trim();
      // Capitalize the first letter
      formattedValue = formattedValue.charAt(0).toUpperCase() + formattedValue.slice(1);
    }
  
    // If the field is the phone number, format it
    if (fieldName === 'phone') {
      // Remove all non-digit characters
      const phoneNumber = value.replace(/\D/g, '');
      formattedValue = phoneNumber;
      
      // Apply phone number format if it matches a specific pattern
      if (phoneNumber.length > 3 && phoneNumber.length <= 6) {
        formattedValue = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3)}`;
      } else if (phoneNumber.length > 6) {
        formattedValue = `(${phoneNumber.slice(0, 3)}) ${phoneNumber.slice(3, 6)}-${phoneNumber.slice(6, 10)}`;
      }
    }
  
    setFormData({
      ...formData,
      [fieldName]: formattedValue,
    });
  
    // Clear validation error for the current field when user starts typing
    setValidationErrors({
      ...validationErrors,
      [fieldName]: '',
    });
  };

  const isFormComplete = () => {
    // Check if all fields are not empty and validation errors are empty
    return (
      formData.firstName !== '' &&
      formData.lastName !== '' &&
      formData.title !== '' &&
      formData.company !== '' &&
      formData.phone !== '' &&
      formData.email !== '' &&
      formData.createPassword !== '' &&
      formData.confirmPassword !== '' &&
      validationErrors.firstName === '' &&
      validationErrors.lastName === '' &&
      validationErrors.title === '' &&
      validationErrors.company === '' &&
      validationErrors.phone === '' &&
      validationErrors.email === '' &&
      validationErrors.createPassword === '' &&
      validationErrors.confirmPassword === '' &&
      isAgreeChecked
    );
  };

  const handleFirstNameBlur = () => {
    const isValid = isValidFirstName(formData.firstName);
    console.log('First Name Validation Result:', isValid);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      firstName: isValid ? '' : 'Invalid first name.',
    }), () => {
      console.log('Validation Errors After Update:', validationErrors);
    });
  };

  const handleLastNameBlur = () => {
    const isValid = isValidLastName(formData.lastName);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      lastName: isValid ? '' : 'Invalid last name.',
    }));
  };
  
  const handleTitleBlur = () => {
    const isValid = isValidTitle(formData.title);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      title: isValid ? '' : 'Invalid title.',
    }));
  };
  
  const handleCompanyBlur = () => {
    const isValid = isValidCompany(formData.company);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      company: isValid ? '' : 'Invalid company name.',
    }));
  };
  
  const handlePhoneBlur = () => {
    const isValid = isValidPhone(formData.phone);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      phone: isValid ? '' : 'Invalid phone number.',
    }));
  };
  
  const handleEmailBlur = () => {
    const isValid = isValidEmail(formData.email);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      email: isValid ? '' : 'Invalid email address.',
    }));
  };
  
  const handleCreatePasswordBlur = () => {
    const isValid = isValidCreatePassword(formData.createPassword);
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      createPassword: isValid
        ? ''
        : (
          <>
            Password must be at least 8 characters long and contain at least one uppercase letter, one lowercase letter, one number, and one special character
          </>
        ),
    }));
  };
  
  const handleConfirmPasswordBlur = () => {
    const isValid = isValidConfirmPassword(
      formData.confirmPassword,
      formData.createPassword
    );
    setValidationErrors((prevErrors) => ({
      ...prevErrors,
      confirmPassword: isValid ? '' : 'Password does not match.',
    }));
  };

  const handleCheckboxChange = (isChecked) => {
    setIsAgreeChecked(isChecked);
    console.log('Checkbox State (parent):', isChecked);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate all fields
    const firstNameValid = isValidFirstName(formData.firstName);
    const lastNameValid = isValidLastName(formData.lastName);
    const titleValid = isValidTitle(formData.title);
    const companyValid = isValidCompany(formData.company);
    const phoneValid = isValidPhone(formData.phone);
    const emailValid = isValidEmail(formData.email);
    const createPasswordValid = isValidCreatePassword(formData.createPassword);
    const confirmPasswordValid = isValidConfirmPassword(
      formData.confirmPassword,
      formData.createPassword
    );

    // Update validation errors
    setValidationErrors({
      firstName: firstNameValid ? '' : 'Invalid first name.',
      lastName: lastNameValid ? '' : 'Invalid last name.',
      title: titleValid ? '' : 'Invalid title.',
      company: companyValid ? '' : 'Invalid company name.',
      phone: phoneValid ? '' : 'Invalid phone number.',
      email: emailValid ? '' : 'Invalid email address.',
      createPassword: createPasswordValid ? '' : 'Invalid create password.',
      confirmPassword: confirmPasswordValid ? '': 'Confirm password does not match.',
      isAgreeChecked: isAgreeChecked ? '' : 'Please agree to terms.',
    });

    // Log validation errors
    console.log('Validation Errors:', validationErrors);

    // Check if the form is complete and valid
    const isFormValid =
      isFormComplete(formData) &&
      firstNameValid &&
      lastNameValid &&
      titleValid &&
      companyValid &&
      phoneValid &&
      emailValid &&
      createPasswordValid &&
      confirmPasswordValid &&
      isAgreeChecked;

      // Check the checkbox state separately
      const isCheckboxChecked = isAgreeChecked;

      // Log isFormValid
      console.log('Is Form Valid:', isFormValid);
      console.log('Is Checkbox Checked:', isCheckboxChecked);

      if (isFormValid) {
        try {
          const response = await fetch(`${API_URL}/auth/register`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
          });
    
          if (response.ok) {
            // Redirect to '/evdb' upon successful signup
            setTimeout(() => {
              setShowEvdbPage(true);
            }, 0);
          } else {
            if (response.status === 400) {
              setErrorMessage('Email is already registered. Please use a different email.');
            } else {
              setErrorMessage('An error occurred. Please try again later.');
            }
          }
        } catch (error) {
          console.error('Error sending form data:', error);
          setErrorMessage('An error occurred while processing your request. Please try again later.');
        }
      } else {
        // Form is incomplete or invalid, handle accordingly
        console.log('Form is incomplete or invalid. Please check fields.');
        setErrorMessage('Form is incomplete or invalid. Please check fields.');
      }
    };

    return (
      <form onSubmit={handleSubmit}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '100vw', height: '100vh', padding: '50px' }}>
      
      <div style={{ width: '90%', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '20%', height: '15%', justifyContent: 'center', fontSize: '1.0vw' }}>
  <TextHeader/>
  <TextSubtitle/>
</div>
      {/* First row */}
      <div style={{ display: 'flex', width: '90%', alignItems: 'center', height: '15%' }}>
        <div style={{ marginRight: '10px', width: '50%', height: '100%' }}>
          <TextFirstName/>
          <InputFieldFirstName
            value={formData.firstName}
            onChange={(e) => handleChange('firstName', e.target.value)}
            onBlur={handleFirstNameBlur}
          />
          {validationErrors.firstName && (
        <div style={{ color: 'red' }}>{validationErrors.firstName}</div>
      )}

        </div>
        <div style={{ marginLeft: '10px', width: '50%', height: '100%' }}>
        <TextLastName/>
          <InputFieldLastName
            value={formData.lastName}
            onChange={(e) => handleChange('lastName', e.target.value)}
            onBlur={handleLastNameBlur}
          />
          {validationErrors.lastName && (
        <div style={{ color: 'red' }}>{validationErrors.lastName}</div>
      )}
        </div>
      </div>

      {/* Second row */}
      <div style={{ display: 'flex', width: '90%', height: '15%', alignItems: 'center' }}>
        <div style={{ marginRight: '10px', width: '50%', height: '100%' }}>
          <TextTitle/>
          <InputFieldTitle
            value={formData.title}
            onChange={(e) => handleChange('title', e.target.value)}
            onBlur={handleTitleBlur}
          />
          {validationErrors.title && (
        <div style={{ color: 'red' }}>{validationErrors.title}</div>
      )}
        </div>
        <div style={{ marginLeft: '10px', width: '50%', height: '100%' }}>
        <TextCompany/>
          <InputFieldCompany
            value={formData.company}
            onChange={(e) => handleChange('company', e.target.value)}
            onBlur={handleCompanyBlur}
          />
          {validationErrors.company && (
        <div style={{ color: 'red' }}>{validationErrors.company}</div>
      )}
        </div>
      </div>

      {/* Third row */}
      <div style={{ display: 'flex', width: '90%', height: '15%', alignItems: 'center' }}>
      <div style={{ marginRight: '10px', width: '50%', height: '100%' }}>
      <TextPhone/>
          <InputFieldPhone
            value={formData.phone}
            onChange={(e) => handleChange('phone', e.target.value)}
            onBlur={handlePhoneBlur}
          />
          {validationErrors.phone && (
        <div style={{ color: 'red' }}>{validationErrors.phone}</div>
      )}
        </div>
        <div style={{ marginLeft: '10px', width: '50%', height: '100%' }}>
        <TextEmail/>
          <InputFieldEmail
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            onBlur={handleEmailBlur}
          />
          {validationErrors.email && (
        <div style={{ color: 'red' }}>{validationErrors.email}</div>
      )}
        </div>
      </div>

      {/* Fourth row */}
      <div style={{ display: 'flex', justifyContent: 'center', height: '40%', width: '90%' }}>
      <div style={{ display: 'flex', justifyContent: 'center', marginRight: '10px', width: '50%' }}>
          {/* First column */}
          <motion.div
          initial={{ scale: 0 }} // Initial scale is 0
          animate={{ scale: 1 }} // Animate to scale 1
          transition={{ duration: 1.0 }} // Transition duration
          style={{ width: '100%', display: 'flex', justifyContent: 'center',  }}
        ><ImageLogo/></motion.div>
        </div>
        
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', marginLeft: '10px', width: '50%' }}>
  {/* First Row */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', height: '33%' }}>
    <TextCreateAPassword />
    <InputFieldCAP
      value={formData.createPassword}
      onChange={(e) => handleChange('createPassword', e.target.value)}
      onBlur={handleCreatePasswordBlur}
      type="password"
    />
    {validationErrors.createPassword && (
      <div style={{ color: 'red', maxWidth: '468px' }}>{validationErrors.createPassword}</div>
    )}
  </div>
  {/* Second Row */}
  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', width: '100%', height: '33%' }}>
    <TextConfirmPassword />
    <InputFieldCP
      value={formData.confirmPassword}
      onChange={(e) => handleChange('confirmPassword', e.target.value)}
      onBlur={handleConfirmPasswordBlur}
      type="password"
    />
    {validationErrors.confirmPassword && (
      <div style={{ color: 'red', marginBottom: '5px' }}>{validationErrors.confirmPassword}</div>
    )}
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', width: '100%', paddingTop: '5px', whiteSpace: 'nowrap', fontSize: '1.0vw', }}>
    <Checkbox onChange={handleCheckboxChange} />
    <TextBySigning />
    <motion.div
      whileHover={{ textDecoration: 'underline' }}
    >
      <TextTOU />
    </motion.div>
    <TextAnd />
    <motion.div
      whileHover={{ textDecoration: 'underline' }}
    >
      <TextPrivacy />
    </motion.div>
  </div>
  </div>
  
  {/* Fourth Row */}
  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column', width: '100%', height: '33%', paddingTop: '30px' }}>
    {/* Remaining Content */}
    {errorMessage && <div style={{ color: 'red', marginBottom: '2px' }}>{errorMessage}</div>}
    <motion.div
      initial={{ scale: 0 }}
      animate={{ scale: 1 }}
      whileHover={{ scale: 1.1 }}
      transition={{ duration: 1.0 }}
      style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', height: '70%'}}
    >
      <ButtonSignup disabled={!isFormComplete()} />
    </motion.div>
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', paddingTop: '10px' }}></div>
    <div style={{ display: 'flex' }}>
      <TextAlreadyHave />
      <motion.div
        whileHover={{ textDecoration: 'underline' }}
      >
        <TextLogIn />
      </motion.div>
    </div>
  </div>
</div>

      </div>
      {showEvdbPage && <Popup />}
    </div>
    </form>
  );
};

export default SignupPage;