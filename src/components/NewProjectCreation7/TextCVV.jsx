import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '20px',
  },
};

const defaultProps = {
  text: 'CVV *',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;