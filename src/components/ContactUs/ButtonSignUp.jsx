import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '31px',
    left: '1176px',
    width: '120px',
    height: '53px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '21px',
    outline: 'none',
    marginRight: '30px',
  },
};

const defaultProps = {
  label: 'Sign up',
};

const Button = (props) => {
  const navigate = useNavigate();
  const [isClicked, setIsClicked] = useState(false);


  const handleClick = () => {
    setIsClicked(true); // Set isClicked to true when the button is clicked
    setTimeout(() => {
      setIsClicked(false); // Reset isClicked after 300ms
      navigate('/signup'); // Navigate to the login route after the delay
    }, 150); // Delay navigation by 300 milliseconds
  };

  return (
    <button style={{
      ...styles.Button,
      
      backgroundColor: isClicked ? '#1a63ff' : '#2a84ea', // Change background color when clicked
    }}  onClick={handleClick}>
      {props.label ?? defaultProps.label}
      
    </button>
  );
};

export default Button;