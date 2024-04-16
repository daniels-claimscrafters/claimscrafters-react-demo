//InputFieldCardholderName.jsx

import React, { useState } from 'react';
import { isValidCardholderName } from '../../validationUtils';

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

const InputFieldCardholderName = ({ onChange, updateValidationErrors }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    // Capitalize the start of each word
    newValue = newValue.replace(/\b\w/g, char => char.toUpperCase());
    setValue(newValue);
    onChange('cardholderName', newValue); // Pass the identifier and the new value to the parent component
    setErrorMessage(''); // Clear any previous error message
  };

  const handleBlur = () => {
    const isValid = isValidCardholderName(value);
    if (!isValid) {
      setErrorMessage('Invalid cardholder name');
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
        placeholder="Name" // Set the placeholder text directly here
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldCardholderName;

