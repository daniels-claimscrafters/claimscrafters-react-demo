import React from 'react';

const styles = {
  Input: {
    top: '565px',
    left: '848px',
    width: '412px',
    height: '35px',
    padding: '0px 8px',
    border: '1px solid #ceced3',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.87)',
    color: '#1d1d1f',
    fontSize: '16px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '21px',
    outline: 'none',
    marginBottom: '10px'
  },
};

const defaultProps = {
  text: 'Email address',
};

const InputField = ({ text, value, onChange, onBlur }) => {
  const handleChange = (e) => {
    if (onChange) {
      onChange(e); // Pass the entire event object
    }
  };

  const handleBlur = (e) => {
    if (onBlur) {
      onBlur(e); // Pass the entire event object
    }
  };

  return (
    <input
      style={styles.Input}
      placeholder={text ?? defaultProps.text}
      value={value ?? ''}
      onChange={handleChange}
      onBlur={handleBlur}  // Add onBlur handling
    />
  );
};

export default InputField;