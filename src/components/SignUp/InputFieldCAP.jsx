import React from 'react';

const styles = {
  Input: {
    top: '558px',
    left: '759px',
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
  text: 'Password',
};

const InputField = (props) => {
  const { value, onChange, onBlur, text, type } = props;

  return (
    <input
      style={styles.Input}
      placeholder={text ?? defaultProps.text}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      type={type ?? defaultProps.type}
    />
  );
};

export default InputField;