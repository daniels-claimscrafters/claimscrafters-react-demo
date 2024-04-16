import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '14px',
    fontFamily: 'Poppins',
    lineHeight: '18px',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: 'Login to access your ContentIQ account.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;