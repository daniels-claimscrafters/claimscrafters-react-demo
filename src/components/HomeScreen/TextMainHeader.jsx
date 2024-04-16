import React from 'react';

const styles = {
  Text: {
    color: '#2a2c2e',
    fontSize: '40px',
    fontFamily: 'Work Sans',
    fontWeight: 600,
    lineHeight: '52px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: 'Claims Crafters\' ContentIQ AI Contents Valuation Platform',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;