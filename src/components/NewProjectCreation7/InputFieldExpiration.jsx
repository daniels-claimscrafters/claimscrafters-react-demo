// InputFieldExpiration.jsx
import React, { useState } from 'react';
import { isValidExpirationDate } from '../../validationUtils';

const styles = {
  Input: {
    top: '463px',
    left: '1121px',
    width: '255px',
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

const InputFieldExpiration = ({ onChange, updateValidationErrors }) => {
  const [value, setValue] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    // Remove any non-numeric characters from the input value
    newValue = newValue.replace(/[^\d/]/g, '');
    // Limit the input to a maximum of 5 characters (MM/YY format)
    newValue = newValue.slice(0, 5);
    // Format the input value as MM/YY
    if (newValue.length > 2 && newValue.indexOf('/') === -1) {
        newValue = `${newValue.slice(0, 2)}/${newValue.slice(2)}`;
    }
    setValue(newValue);
    onChange('expiration', newValue); // Pass the identifier and the new value to the parent component
    setErrorMessage('');
};




  const handleBlur = () => {
    const isValid = isValidExpirationDate(value);
    if (!isValid) {
      setErrorMessage('Invalid expiration date');
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
        placeholder="MM/YY"
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && <div style={styles.ErrorMessage}>{errorMessage}</div>}
    </div>
  );
};

export default InputFieldExpiration;
