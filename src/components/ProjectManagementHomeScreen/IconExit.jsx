import React from 'react';

const styles = {
  Icon: {
    color: '#1d1d1f',
    fill: '#1d1d1f',
    fontSize: '24px',
    top: '35px',
    left: '695px',
    width: '24px',
    height: '24px',
    cursor: 'pointer', // Add cursor pointer for better UX
    marginTop: '10px'
    //marginLeft: '20px',
  },
};

const IconExit = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick(); // Call the onClick function when the icon is clicked
    }
  };

  return (
    <svg style={styles.Icon} onClick={handleClick} viewBox="0 0 352 512">
      <path d="M242.72 256l100.07-100.07c12.28-12.28 12.28-32.19 0-44.48l-22.24-22.24c-12.28-12.28-32.19-12.28-44.48 0L176 189.28 75.93 89.21c-12.28-12.28-32.19-12.28-44.48 0L9.21 111.45c-12.28 12.28-12.28 32.19 0 44.48L109.28 256 9.21 356.07c-12.28 12.28-12.28 32.19 0 44.48l22.24 22.24c12.28 12.28 32.2 12.28 44.48 0L176 322.72l100.07 100.07c12.28 12.28 32.2 12.28 44.48 0l22.24-22.24c12.28-12.28 12.28-32.19 0-44.48L242.72 256z" />
    </svg>
  );
};

export default IconExit;

