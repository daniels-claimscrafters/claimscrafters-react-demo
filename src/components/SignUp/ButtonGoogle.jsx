// ButtonGoogle.jsx


import React, { useEffect } from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: '211px',
    height: '65px',
    padding: '0px 8px',
    border: '3px solid #2b84ea',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#ffffff',
    color: '#040000',
    fontSize: '14px',
    fontFamily: 'Poppins',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    outline: 'none',
  },
  icon: {
    color: '#030303',
    fill: '#030303',
    fontSize: '40px',
    width: '40px',
    height: '40px',
    marginRight: '10px', // Space between icon and text
  },
};

const defaultProps = {
  label: 'Sign in with Google',
};

const Button = (props) => {
  return (
    <button style={styles.Button}>
      {/* Include the SVG directly */}
      <svg viewBox="0 0 488 512" style={styles.icon}>
        <path d="M488 261.8C488 403.3 391.1 504 248 504 110.8 504 0 393.2 0 256S110.8 8 248 8c66.8 0 123 24.5 166.3 64.9l-67.5 64.9C258.5 52.6 94.3 116.6 94.3 256c0 86.5 69.1 156.6 153.7 156.6 98.2 0 135-70.4 140.8-106.9H248v-85.3h236.1c2.3 12.7 3.9 24.9 3.9 41.4z" />
      </svg>
      
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default Button;

