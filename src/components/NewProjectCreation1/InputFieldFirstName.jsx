// InputFieldFirstName.jsx
import React, { useState } from 'react';
import { isValidFirstName } from '../../validationUtils';

const styles = {
  Input: {
    top: '676px',
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
  text: 'Insured First Name',
};

const InputFieldFirstName = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldFirstName - New value: ${newValue}`);
    onChange('insuredFirstName', newValue);

    // Clear validation error when user starts typing
    setValidationError('');
  };

  const handleBlur = () => {
    // Check if value is defined before validation
    if (value !== undefined) {
      const isValid = isValidFirstName(value);
      if (!isValid) {
        console.log(`InputFieldFirstName - Validation error: Invalid first name`);
        // Set the validation error
        setValidationError('Invalid first name');
        updateValidationErrors(true);
      } else {
        // Clear the validation error if there is no error
        console.log('InputFieldFirstName - Validation passed');
        setValidationError('');
        updateValidationErrors(false);
      }
    }
  };

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

export default InputFieldFirstName;