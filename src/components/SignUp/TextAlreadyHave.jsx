import React from 'react';

const styles = {
  Text: {
    color: '#5d5d5b',
    fontSize: '0.9em',
    fontFamily: 'Poppins',
    lineHeight: '18px',
    textAlign: 'right',
    marginRight: '5px',
  },
};

const defaultProps = {
  text: 'Already have an account?',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;