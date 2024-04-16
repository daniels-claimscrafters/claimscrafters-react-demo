// ButtonCreateNew.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '193px',
    left: '630px',
    width: '175px',
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
  },
};

const defaultProps = {
  label: 'Create New Project',
};

const Button = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /privacypolicy route
    navigate('/npcpc');
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;
