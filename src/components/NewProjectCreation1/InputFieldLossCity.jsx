import React, { useState } from 'react';
import { isNotEmpty } from '../../validationUtils';

const styles = {
  Input: {
    top: '1007px',
    left: '80px',
    width: '500px',
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
  text: 'Loss City',
};

const InputFieldLossCity = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldLossCity - New value: ${newValue}`);
    onChange('lossCity', newValue);

    // Clear validation error when the user starts typing
    setValidationError('');
  };

  const handleBlur = () => {
    // Check if the value is defined before validation
    if (value !== undefined) {
      const isValid = !isNotEmpty(value);
      if (!isValid) {
        console.log(`InputFieldLossCity - Validation error: Invalid loss city`);
        // Set the validation error
        setValidationError('Invalid loss city');
        updateValidationErrors(true);

      } else {
        // Clear the validation error if there is no error
        console.log('InputFieldLossCity - Validation passed');
        setValidationError('');
        updateValidationErrors(false);

      }
    }
    const trimmedValue = value.trim();
  
  // Update the value only if it has changed
  if (trimmedValue !== value) {
    onChange('lossCity', trimmedValue);
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

export default InputFieldLossCity;