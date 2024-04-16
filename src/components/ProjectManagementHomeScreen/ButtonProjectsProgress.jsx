// ButtonProjectsProgress.jsx

import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: '125px',
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
  },
};

const ButtonProjectsProgress = ({ onClick }) => {
  const handleClick = () => {
    
    onClick('In Process');
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      Projects In Process
    </button>
  );
};

export default ButtonProjectsProgress;