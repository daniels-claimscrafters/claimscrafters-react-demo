import React from 'react';

const styles = {
  Text: {
    color: '#898989',
    fontSize: '20px',
    fontFamily: 'Poppins',
    lineHeight: '26px',
  },
};

const defaultProps = {
  text: 'A sampling of data uploaded and processed',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;