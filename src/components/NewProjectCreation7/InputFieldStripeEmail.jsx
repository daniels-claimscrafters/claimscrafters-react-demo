import React, { useState } from 'react';
import { isValidEmail } from '../../validationUtils';

const styles = {
  Input: {
    top: '463px',
    left: '1121px',
    width: '500px',
    height: '48px',
    padding: '0px 8px',
    border: '1px solid #ceced3',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.87)',
    color: '#1d1d1f',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '18px',
    outline: 'none',
    marginBottom: '10px'
  },
  ErrorMessage: {
    color: 'red',
    marginTop: '2px',
    fontSize: '14px',
  },
};

const InputFieldStripeEmail = ({ onChange, updateValidationErrors }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value.toLowerCase().replace(/\s/g, '');
    setValue(newValue);
    onChange('stripeEmail', newValue); // Pass the identifier and the new value to the parent component
    setErrorMessage('');
};

  const handleBlur = () => {
    const isValid = isValidEmail(value);
    if (!isValid) {
      setErrorMessage('Invalid email');
      updateValidationErrors(true);
    }
    else {
        console.log('ok');
        updateValidationErrors(false);
      }
  };

  return (
    <div>
      <input
        style={styles.Input}
        placeholder="Enter Email" // Set the placeholder text directly here
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldStripeEmail;