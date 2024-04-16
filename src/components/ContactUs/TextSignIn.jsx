import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '16px',
    fontFamily: 'Work Sans',
    fontWeight: 600,
    lineHeight: '21px',
    textAlign: 'center',
    marginRight: '20px',
    cursor: 'pointer',
  },
};

const defaultProps = {
  text: 'Sign In',
};

const Text = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /login route
    navigate('/login');
  };
  return (
    <div style={styles.Text} onClick={handleClick}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;