import React, { useState } from 'react';
import { isValidCardNumber } from '../../validationUtils';

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

const InputFieldCardNumber = ({ onChange, updateValidationErrors }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    // Remove any non-numeric characters from the input value
    newValue = newValue.replace(/\D/g, '');
    // Truncate the input value if it exceeds 16 digits
    newValue = newValue.slice(0, 16);
    // Insert spaces after every 4 characters for better readability
    newValue = newValue.replace(/(.{4})/g, '$1 ').trim();
    setValue(newValue);
    onChange('cardNumber', newValue); // Pass the identifier and the new value to the parent component
    setErrorMessage('');
  };

  const handleBlur = () => {
    const isValid = isValidCardNumber(value);
    if (!isValid) {
      setErrorMessage('Invalid card number');
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
        placeholder="**** **** **** ****" // Set the placeholder text directly here
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldCardNumber;