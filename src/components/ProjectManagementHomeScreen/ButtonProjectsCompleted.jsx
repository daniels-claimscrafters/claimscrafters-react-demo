// ButtonProjectsCompleted.jsx

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

const ButtonProjectsCompleted = ({ onClick }) => {
  const handleClick = () => {
    onClick('Complete');
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      Projects Completed
    </button>
  );
};

export default ButtonProjectsCompleted;