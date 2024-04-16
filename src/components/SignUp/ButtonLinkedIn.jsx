// LinkedInButton.js
import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: '211px',
    height: '65px',
    padding: '0px 8px',
    border: '3px solid #2b84ea', // LinkedIn color
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
    color: '#0077B5', // LinkedIn color
    fill: '#0077B5',
    fontSize: '40px',
    width: '40px',
    height: '40px',
    marginRight: '10px', // Space between icon and text
  },
};

const defaultProps = {
  label: 'Sign in with LinkedIn',
};

const LinkedInButton = (props) => {
  return (
    <button style={styles.Button}>
      {/* LinkedIn SVG */}
      <svg style={styles.Icon}  viewBox="0 0 30 30" width="45px" height="45px">
    <path d="M24,4H6C4.895,4,4,4.895,4,6v18c0,1.105,0.895,2,2,2h18c1.105,0,2-0.895,2-2V6C26,4.895,25.105,4,24,4z M10.954,22h-2.95 v-9.492h2.95V22z M9.449,11.151c-0.951,0-1.72-0.771-1.72-1.72c0-0.949,0.77-1.719,1.72-1.719c0.948,0,1.719,0.771,1.719,1.719 C11.168,10.38,10.397,11.151,9.449,11.151z M22.004,22h-2.948v-4.616c0-1.101-0.02-2.517-1.533-2.517 c-1.535,0-1.771,1.199-1.771,2.437V22h-2.948v-9.492h2.83v1.297h0.04c0.394-0.746,1.356-1.533,2.791-1.533 c2.987,0,3.539,1.966,3.539,4.522V22z">
    </path>
  </svg>
      
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default LinkedInButton;
