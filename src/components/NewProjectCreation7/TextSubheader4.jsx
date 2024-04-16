import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '16px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '22px',
    marginBottom: '10px'
  },
};

const defaultProps = {
  text: 'Please fill in your payment details to complete the order.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;