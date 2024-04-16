import React from 'react';

const styles = {
  Text: {
    color: '#080a0b',
    fontSize: '0.9em',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '18px',
  },
};

const defaultProps = {
  text: 'and',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;