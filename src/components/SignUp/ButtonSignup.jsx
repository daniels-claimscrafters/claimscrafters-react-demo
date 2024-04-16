// ButtonSignUp.jsx

import React, { useState } from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '766px',
    left: '765px',
    width: '90%',
    height: '48px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '22px',
    outline: 'none',
    
  },
  ClickedButton: {
    backgroundColor: '#1a63ff', // Change the color to whatever you prefer
  },
};

const defaultProps = {
  label: 'Sign up',
};

const Button = ({ disabled, label }) => {
  const [clicked, setClicked] = useState(false);

  const handleClick = () => {
    setClicked(true);
    setTimeout(() => {
      setClicked(false); // Revert back to original style after 500 milliseconds
    }, 500);
  };

  const buttonStyles = {
    ...styles.Button,
    backgroundColor: disabled ? '#CCCCCC' : (clicked ? styles.ClickedButton.backgroundColor : styles.Button.backgroundColor),
    cursor: disabled ? 'not-allowed' : 'pointer',
  };

  return (
    <button style={buttonStyles} onClick={handleClick} disabled={disabled}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default Button;
