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
  text: '2',
};

const Text = ({ inProcess }) => {
  return (
    <div style={styles.Text}>
      {inProcess ?? defaultProps.text}
    </div>
  );
};

export default Text;