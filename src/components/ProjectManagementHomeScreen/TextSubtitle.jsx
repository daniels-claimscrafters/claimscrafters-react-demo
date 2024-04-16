import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    lineHeight: '20px',
  },
};

const defaultProps = {
  text: 'Welcome to ContentsIQ',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;