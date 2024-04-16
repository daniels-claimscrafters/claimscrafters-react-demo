import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '825px',
    left: '588px',
    width: '277px',
    height: '36px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '16px',
    outline: 'none',
    marginBottom: '10px',
  },
};

const defaultProps = {
  label: 'Choose your file from your computer',
};

const Button = (props) => {
  return (
    <button style={styles.Button}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;