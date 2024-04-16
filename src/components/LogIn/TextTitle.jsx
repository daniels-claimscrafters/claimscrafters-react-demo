import React from 'react';

const styles = {
  Text: {
    color: '#080a0b',
    fontSize: '48px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '56px',
    textAlign: 'center',
    marginBottom: '5px',
  },
};

const defaultProps = {
  text: 'Welcome Back',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;