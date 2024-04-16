// InputFieldTitle.jsx

// InputFieldTitle.jsx

import React, { useState } from 'react';
import { isValidTitle } from '../../validationUtils';

const styles = {
  Input: {
    top: '256px',
    left: '580px',
    width: '242px',
    height: '36px',
    padding: '0px 8px',
    border: '1px solid #ededed',
    boxSizing: 'border-box',
    borderRadius: '3px',
    backgroundColor: '#fcfdff',
    color: '#929699',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '18px',
    outline: 'none',
  },
  ErrorMessage: {
    color: 'red',
    marginTop: '5px',
    fontSize: '14px',
  },
};

const defaultProps = {
  text: 'Title',
};

const InputField = (props) => {
  const { value, onChange, text, updateValidationErrors, userData } = props;
  const [error, setError] = useState('');
  const title = userData.title;

  const handleInputChange = (e) => {
    const inputValue = e.target.value;
    if (!isValidTitle(inputValue)) {
      setError('Please enter a valid title.');
      updateValidationErrors(true);
    } else {
      setError('');
      updateValidationErrors(false);
    }
    onChange(e);
  };

  return (
    <div>
      <input
        style={styles.Input}
        placeholder={title ?? defaultProps.text}
        value={value}
        onChange={handleInputChange}
      />
      {error && <div style={styles.ErrorMessage}>{error}</div>}
    </div>
  );
};

export default InputField;
