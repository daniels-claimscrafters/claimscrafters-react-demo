import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '1323px',
    left: '961px',
    width: '170px',
    height: '58px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '26px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'Back',
  onClick: () => {}, // Default empty function for onClick
  resetParentData: () => {},
};

const ButtonBack = (props) => {
  const { label, onClick, resetParentData } = props;

  const handleClick = () => {
    onClick(); // Call the onClick function passed as a prop
    resetParentData(); // Call the resetParentData function passed as a prop
  };

  return (
    <button style={styles.Button} onClick={handleClick}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default ButtonBack;