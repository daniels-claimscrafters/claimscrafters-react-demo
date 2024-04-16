// MicrosoftButton.js
import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: '211px',
    height: '65px',
    padding: '0px 8px',
    border: '3px solid #2b84ea', // Microsoft color
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
    color: '#2672ec', // Microsoft color
    fill: '#2672ec',
    fontSize: '40px',
    width: '40px',
    height: '40px',
    marginRight: '10px', // Space between icon and text
  },
};

const defaultProps = {
  label: 'Sign in with Microsoft',
};

const MicrosoftButton = (props) => {
  return (
    <button style={styles.Button}>
      {/* Microsoft SVG */}
      <svg style={styles.Icon}  viewBox="0 0 50 50" width="40px" height="40px">
    <path d="M 5 4 C 4.448 4 4 4.447 4 5 L 4 24 L 24 24 L 24 4 L 5 4 z M 26 4 L 26 24 L 46 24 L 46 5 C 46 4.447 45.552 4 45 4 L 26 4 z M 4 26 L 4 45 C 4 45.553 4.448 46 5 46 L 24 46 L 24 26 L 4 26 z M 26 26 L 26 46 L 45 46 C 45.552 46 46 45.553 46 45 L 46 26 L 26 26 z">
    </path>
  </svg>
      
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default MicrosoftButton;
