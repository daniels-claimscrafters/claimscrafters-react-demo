//TextGetStarted.jsx

import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Text: {
    color: '#f1f5ec',
    fontSize: '16px',
    fontFamily: 'Work Sans',
    fontWeight: '500',
    lineHeight: '21px',
    cursor: 'pointer', // Add this to indicate it's clickable
    transition: 'transform 0.3s ease', // Add transition for transform property
  },
};

const defaultProps = {
  text: 'Get Started',
};

const TextGetStarted = (props) => {
  const navigate = useNavigate();
  

  const handleClick = () => {
    // Redirect to /signup
    navigate('/signup');
  };



  return (
    <div
      style={{
        ...styles.Text,
        
      }}
      onClick={handleClick}
      
    >
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default TextGetStarted;