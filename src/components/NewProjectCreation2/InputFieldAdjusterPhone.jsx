// InputFieldAdjusterPhone.jsx

import React, { useState } from 'react';
import { isValidPhoneNPC } from '../../validationUtils';

const styles = {
  Input: {
    top: '838px',
    left: '80px',
    width: '616px',
    height: '45px',
    padding: '0px 8px',
    border: '1px solid #ceced3',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.87)',
    color: '#1d1d1f',
    fontSize: '20px',
    fontFamily: 'Poppins',
    lineHeight: '26px',
    outline: 'none',
  },
  ErrorMessage: {
    color: 'red',
    marginTop: '5px',
    fontSize: '14px',
  },
};

const defaultProps = {
  text: '414-321-1234',
};

const InputFieldPhone = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    let newValue = e.target.value;
    
    // Format the phone number as needed
    newValue = newValue.replace(/\D/g, ''); // Remove all non-digit characters
    newValue = newValue.replace(/(\d{3})(\d{3})(\d{4})/, '($1) $2-$3'); // Format as (XXX) XXX-XXXX
    
    onChange('adjusterPhone', newValue); // Pass the formatted value to the parent component
    setErrorMessage(''); // Clear error message when the user starts typing
  };

  const handleBlur = () => {
    const validationError = isValidPhoneNPC(value);
    if (validationError) {
      console.log(`InputFieldPhone - Validation error: ${validationError}`);
      setErrorMessage(validationError);
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
        placeholder={props.text ?? defaultProps.text}
        value={value}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {errorMessage && (
        <div style={styles.ErrorMessage}>
          {errorMessage}
        </div>
      )}
    </div>
  );
};

export default InputFieldPhone;