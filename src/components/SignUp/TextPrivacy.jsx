import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Text: {
    color: '#2a84ea',
    fontSize: '0.9em',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '18px',
    marginRight: '5px',
    marginLeft: '5px',
    cursor: 'pointer',
  },
};

const defaultProps = {
  text: 'Privacy Policy.',
};

const Text = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /login route
    navigate('/privacypolicy');
  };
  return (
    <div style={styles.Text} onClick={handleClick}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;