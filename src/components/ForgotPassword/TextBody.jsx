import React from 'react';

const styles = {
  Text: {
    color: '#000000',
    fontSize: '18px',
    fontFamily: 'Roboto',
    lineHeight: '23px',
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: 'Enter your email below and we\'ll send you a link on how to reset it',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;