import React, { useState } from 'react';
import { isNotEmpty } from '../../validationUtils';


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
  text: 'Adjuster Last Name',
};

const InputFieldAdjusterLastName = (props) => {
  const { value, onChange } = props;
  const [errorMessage, setErrorMessage] = useState('');

  const handleChange = (e) => {
    const newValue = e.target.value;
    console.log(`InputFieldAdjusterLastName - New value: ${newValue}`);
    onChange('adjusterLastName', newValue);
    setErrorMessage(''); // Clear error message when user starts typing
  };

  const handleBlur = () => {
    const validationError = isNotEmpty(value);
    if (validationError) {
      console.log(`InputFieldLastName - Validation error: ${validationError}`);
      setErrorMessage(validationError);
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

export default InputFieldAdjusterLastName;