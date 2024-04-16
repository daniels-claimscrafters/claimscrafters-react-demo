// InputFieldLossAddress.jsx
import React, { useState } from 'react';
import { isNotEmpty2 } from '../../validationUtils';

const styles = {
  Input: {
    top: '838px',
    left: '80px',
    width: '1259px',
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
  text: 'Loss Address',
};

const InputFieldLossAddress = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldLossAddress - New value: ${newValue}`);
    onChange('lossAddress', newValue);

    // Clear validation error when the user starts typing
    setValidationError('');
  };

  const handleBlur = () => {
    // Check if the value is defined before validation
    if (value !== undefined) {
      const isValid = isNotEmpty2(value);
      console.log('Validation Error:', !isValid);
      if (!isValid) {
        console.log(`InputFieldLossAddress - Validation error: Invalid loss address`);
        // Set the validation error
        setValidationError('Invalid loss address');
        updateValidationErrors(true);
      } else {
        // Clear the validation error if there is no error
        console.log('InputFieldLossAddress - Validation passed');
        setValidationError('');
        updateValidationErrors(false);
      }
    }
    const trimmedValue = value.trim();
  
  // Update the value only if it has changed
  if (trimmedValue !== value) {
    onChange('lossAddress', trimmedValue);
  }
  };

  console.log('ValidationError:', validationError);

  return (
    <div>
      <input
        style={styles.Input}
        placeholder={props.text ?? defaultProps.text}
        value={value || ''}
        onChange={handleChange}
        onBlur={handleBlur}
      />
      {validationError && (
        <div style={styles.ErrorMessage}>{validationError}</div>
      )}
    </div>
  );
};

export default InputFieldLossAddress;