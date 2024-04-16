import React from 'react';

const styles = {
  Text: {
    color: '#080a0b',
    fontSize: '12px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '16px',
  },
};

const defaultProps = {
  text: 'Title',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;