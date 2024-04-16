import React from 'react';

const styles = {
  Text: {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '26px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: '3',
};

const Text = ({ completed }) => {
  return (
    <div style={styles.Text}>
      {completed ?? defaultProps.text}
    </div>
  );
};

export default Text;