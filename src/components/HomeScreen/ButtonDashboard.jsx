import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '46px',
    left: '1122px',
    width: '160px',
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
    marginRight: '20px'
  },
};

const defaultProps = {
  label: 'Project Dashboard',
};

const Button = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /login route
    navigate('/pmhs');
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;