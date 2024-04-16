import React from 'react';

const TextUsername = ({ userData }) => {
  return (
    <div style={styles.Text}>
      Hello, {userData && userData.firstName ? userData.firstName : '<User First Name>'}
    </div>
  );
};

const styles = {
  Text: {
    color: '#ffffff',
    
    fontFamily: 'Roboto',
    lineHeight: '16px',
    paddingTop: '5px'
  },
};

export default TextUsername;