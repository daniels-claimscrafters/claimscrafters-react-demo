import React from 'react';

const styles = {
  Text: {
    color: '#080a0b',
    fontSize: '2.5em',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '20px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'Sign up',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;