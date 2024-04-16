// ButtonSend.jsx

import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '594px',
    left: '590px',
    width: '129px',
    height: '36px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#023f81',
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '16px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'SEND RESET LINK',
};

const ButtonSend = (props) => {
  const { label, onClick } = props;

  return (
    <button style={styles.Button} onClick={onClick}>
      {label ?? defaultProps.label}
    </button>
  );
};

export default ButtonSend;