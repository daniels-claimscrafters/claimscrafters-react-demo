import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Text: {
    color: '#023f81',
    fontSize: '24px',
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: '31px',
    marginTop: '10px',
    cursor: 'pointer',
  },
};

const defaultProps = {
  text: 'Sign up',
};

const Text = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /login route
    navigate('/signup');
  };
  return (
    <div style={styles.Text} onClick={handleClick}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;