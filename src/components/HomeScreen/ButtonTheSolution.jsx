import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '905px',
    left: '1020px',
    width: '282px',
    height: '32px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '22px',
    backgroundColor: '#2e456b',
    color: '#ffffff',
    fontSize: '18px',
    fontFamily: 'Work Sans',
    fontWeight: 600,
    lineHeight: '23px',
    outline: 'none',
    marginBottom: '5px',
  },
};

const defaultProps = {
  label: 'The Solution',
};

const Button = (props) => {
  return (
    <button style={styles.Button}>
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;