import React from 'react';

const styles = {
  Input: {
    top: '282px',
    left: '757px',
    width: '100%',
    height: '50%',
    padding: '0px 8px',
    border: '1px solid #ceced3',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.87)',
    color: '#1d1d1f',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '18px',
    outline: 'none',
    
  },
};

const defaultProps = {
  text: 'Last Name',
};

const InputField = (props) => {
  const { value, onChange, onBlur, text } = props;

  return (
    <input
      style={styles.Input}
      placeholder={text ?? defaultProps.text}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
    />
  );
};

export default InputField;

