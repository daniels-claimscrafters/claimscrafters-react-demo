

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '18px',
    fontFamily: 'Poppins',
    lineHeight: '23px',
    cursor: 'pointer',
    transition: 'transform 0.3s ease',
  },
};

const defaultProps = {
  text: 'Terms of Use',
};

const Text = (props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Redirect to /contactus
    navigate('/tos');
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      style={{
        ...styles.Text,
        transform: isHovered ? 'scale(1.1)' : 'scale(1)', // Apply scale transform based on hover state
        ...props.style,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;