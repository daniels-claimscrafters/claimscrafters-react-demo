import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '28px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '36px',
  },
};

const defaultProps = {
  text: 'Payment Details',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;