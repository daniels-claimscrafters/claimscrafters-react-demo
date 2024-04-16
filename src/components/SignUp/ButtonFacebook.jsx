// FacebookButton.js
import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    width: '211px',
    height: '65px',
    padding: '0px 8px',
    border: '3px solid #2b84ea', // Facebook color
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
    color: '#000000',
    fill: '#000000',
    fontSize: '40px',
    width: '40px',
    height: '40px',
    marginRight: '10px', // Space between icon and text
  },
};

const defaultProps = {
  label: 'Sign in with Facebook',
};

const FacebookButton = (props) => {
  return (
    <button style={styles.Button}>
      {/* Facebook SVG */}
      <svg style={styles.icon} viewBox="0 0 50 50" width="50px" height="50px">
        <path d="M25,3C12.85,3,3,12.85,3,25c0,11.03,8.125,20.137,18.712,21.728V30.831h-5.443v-5.783h5.443v-3.848 c0-6.371,3.104-9.168,8.399-9.168c2.536,0,3.877,0.188,4.512,0.274v5.048h-3.612c-2.248,0-3.033,2.131-3.033,4.533v3.161h6.588 l-0.894,5.783h-5.694v15.944C38.716,45.318,47,36.137,47,25C47,12.85,37.15,3,25,3z"/>
      </svg>
      
      {props.label ?? defaultProps.label}
    </button>
  );
};

export default FacebookButton;