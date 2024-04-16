import React from 'react';

const styles = {
  Input: {
    top: '427px',
    left: '844px',
    width: '468px',
    height: '48px',
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
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: '',
};

const InputField = (props) => {
  const { value, onChange, placeholder } = props;

  return (
    <input
      type="password"
      style={styles.Input}
      value={value}
      onChange={onChange}
      placeholder={placeholder ?? defaultProps.text}
    />
  );
};

export default InputField;