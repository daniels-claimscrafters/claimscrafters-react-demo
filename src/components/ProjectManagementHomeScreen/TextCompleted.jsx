import React from 'react';

const styles = {
  Text: {
    color: 'black',
    fontSize: '14px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '18px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'Completed',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;