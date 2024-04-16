import React from 'react';

const styles = {
  Text: {
    color: '#222222',
    fontSize: '18px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '31px',
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: 'Depreciation Range',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;