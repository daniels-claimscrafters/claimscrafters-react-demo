// InputFieldLastName.jsx
import React, { useState } from 'react';
import { isValidLastName } from '../../validationUtils';

const styles = {
  Input: {
    top: '676px',
    left: '722px',
    width: '623px',
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
  text: 'Insured Last Name',
};

const InputFieldLastName = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldLastName - New value: ${newValue}`);
    onChange('insuredLastName', newValue);

    // Clear validation error when the user starts typing
    setValidationError('');
  };

  const handleBlur = () => {
    // Check if the value is defined before validation
    if (value !== undefined) {
      const isValid = isValidLastName(value);
      if (!isValid) {
        console.log(`InputFieldLastName - Validation error: Invalid last name`);
        // Set the validation error
        setValidationError('Invalid last name');
        updateValidationErrors(true);
      } else {
        // Clear the validation error if there is no error
        console.log('InputFieldLastName - Validation passed');
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

export default InputFieldLastName;