import React from 'react';

const styles = {
  Text: {
    color: '#080a0b',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '18px',
  },
};

const defaultProps = {
  text: 'Street Address',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;