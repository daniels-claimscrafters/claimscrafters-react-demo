// InputFieldDateOfLoss.jsx
import React, { useState } from 'react';
import { isValidDateFormat } from '../../validationUtils';

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
    //backgroundColor: '#030303',
    color: '#000000',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '26px',
    textTransform: 'capitalize',
    outline: 'none',
  },
  ErrorMessage: {
    color: 'red',
    marginTop: '5px',
    fontSize: '14px',
  },
};

const defaultProps = {
  text: 'Date of Loss (mm/dd/yyyy)',
};

const InputFieldDateofLoss = (props) => {
  const { value, onChange, updateValidationErrors } = props;
  const [validationError, setValidationError] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    onChange('dateOfLoss', newValue);
    setValidationError('');
  };

  const handleBlur = () => {
    updateValidationErrors(false);
    if (value !== undefined) {
      const isValid = isValidDateFormat(value);
      if (!isValid) {
        setValidationError('Invalid date format');
        updateValidationErrors(true);
      }
    }
  };

  return (
    <div>
      <input
        style={styles.Input}
        type="date" // Use type="date" for date picker
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

export default InputFieldDateofLoss;