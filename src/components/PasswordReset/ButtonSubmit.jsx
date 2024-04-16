// ButtonSubmit.jsx
import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '603px',
    left: '556px',
    width: '183px',
    height: '36px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#023f81',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '16px',
    outline: 'none',
    marginTop: '10px',
  },
};

const defaultProps = {
  label: 'CHANGE MY PASSWORD',
};

const Button = (props) => {
  const { label, onClick } = props;

  return (
    <button style={styles.Button} onClick={onClick}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default Button;