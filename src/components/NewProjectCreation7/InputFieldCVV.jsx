import React, { useState } from 'react';
import { isValidCVV } from '../../validationUtils';

const styles = {
  Input: {
    top: '463px',
    left: '1121px',
    width: '235px',
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

const InputFieldCVV = ({ onChange, updateValidationErrors }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    // Remove any non-numeric characters from the input value
    newValue = newValue.replace(/\D/g, '');
    // Limit the input to a maximum of 4 digits
    newValue = newValue.slice(0, 4);
    setValue(newValue);
    onChange('cvv', newValue); // Pass the identifier and the new value to the parent component
    setErrorMessage('');
};


  const handleBlur = () => {
    const isValid = isValidCVV(value);
    if (!isValid) {
      setErrorMessage('Invalid CVV');
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
        placeholder="***"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldCVV;
