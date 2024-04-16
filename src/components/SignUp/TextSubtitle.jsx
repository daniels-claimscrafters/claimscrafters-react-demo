import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '0.9em',
    fontFamily: 'Poppins',
    lineHeight: '21px',
    textAlign: 'center',
    
  },
};

const defaultProps = {
  text: 'Enter your details to create an account.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;