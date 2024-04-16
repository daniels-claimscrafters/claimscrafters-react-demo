import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '32px',
    fontFamily: 'Poppins',
    fontWeight: 800,
    lineHeight: '44px',
  },
};

const defaultProps = {
  text: '<SUBJECT INPUT>',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;