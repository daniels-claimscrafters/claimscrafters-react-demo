import React from 'react';

const styles = {
  Input: {
    top: '330px',
    left: '875px',
    width: '239px',
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
};

const defaultProps = {
  text: 'Email',
};

const InputField = (props) => {
  const { value, onChange, text } = props;

  return (
    <input
      style={styles.Input}
      placeholder={text ?? defaultProps.text}
      value={value}
      onChange={onChange}
    />
  );
};

export default InputField;