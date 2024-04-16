import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '18px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '23px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: '1',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;