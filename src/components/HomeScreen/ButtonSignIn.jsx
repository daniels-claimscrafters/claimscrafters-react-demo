import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '43px',
    left: '1265px',
    width: '120px',
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
    marginRight: '40px',
    marginLeft: '20px',
    transition: 'transform 0.3s ease', // Adding transition for transform property
  },
};

const defaultProps = {
  label: 'Log in',
};

const Button = (props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);
  const [isClicked, setIsClicked] = useState(false);

  const handleClick = () => {
    setIsClicked(true); // Set isClicked to true when the button is clicked
    setTimeout(() => {
      setIsClicked(false); // Reset isClicked after 300ms
      navigate('/login'); // Navigate to the login route after the delay
    }, 150); // Delay navigation by 300 milliseconds
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <button 
      style={{
        ...styles.Button,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Apply scale transform based on hover state
        backgroundColor: isClicked ? '#1a63ff' : '#2a84ea', // Change background color when clicked
      }} 
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;
