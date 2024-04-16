import React from 'react';

const styles = {
  Icon: {
    color: '#030303',
    fill: '#030303',
    fontSize: '40px',
    top: '27px',
    left: '639px',
    width: '40px',
    height: '40px',
  },
};

const IconExit = ({ onClick }) => {
  const handleClick = () => {
    if (onClick) {
      onClick();
    }
  };

  return (
    <svg style={styles.Icon} onClick={handleClick} viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path>
    <path d="M17 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V7l-4-4zm-5 16c-1.66 0-3-1.34-3-3s1.34-3 3-3 3 1.34 3 3-1.34 3-3 3zm3-10H5V5h10v4z">
    </path>
  </svg>
  );
};

export default IconExit;


