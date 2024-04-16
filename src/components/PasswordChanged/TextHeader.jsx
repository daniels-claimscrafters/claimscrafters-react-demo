import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '32px',
    fontFamily: 'Poppins',
    fontWeight: '500',
    lineHeight: '42px',
    textAlign: 'center',
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: 'Password Changed!',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;