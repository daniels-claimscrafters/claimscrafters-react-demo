import React from 'react';

const styles = {
  Text: {
    color: '#2a2c2e',
    fontSize: '21px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 600,
    lineHeight: '27px',
  },
};

const defaultProps = {
  text: 'Submission',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;