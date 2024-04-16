import React, { useState } from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '560px',
    left: '844px',
    width: '468px',
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
    marginTop: '10px',
    marginBottom: '10px',
  },
};

const defaultProps = {
  label: 'Log in',
};

const Button = (props) => {
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true); // Set isClicked to true when the button is clicked
    setTimeout(() => {
      setIsClicked(false); // Reset isClicked after 300ms
     // Navigate to the login route after the delay
    }, 150); // Delay navigation by 300 milliseconds
  };

  return (
    <button style={{
      ...styles.Button,
      backgroundColor: isClicked ? '#1a63ff' : '#2a84ea', // Change background color when clicked
    }}
    onClick={handleClick}
    >
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;