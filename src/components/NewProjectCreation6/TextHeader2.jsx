import React from 'react';

const styles = {
  Text: {
    color: '#222222',
    fontSize: '32px',
    fontFamily: 'Work Sans',
    fontWeight: 700,
    lineHeight: '42px',
  },
};

const defaultProps = {
  text: 'Acceptance & Payment',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;