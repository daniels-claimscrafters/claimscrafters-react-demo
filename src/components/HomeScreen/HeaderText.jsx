import React from 'react';

const styles = {
  Text: {
    color: '#f1f5ec',
    fontSize: '32px',
    fontFamily: 'Work Sans',
    lineHeight: '42px',
    minWidth: '350px',
  },
};

const defaultProps = {
  text: 'Claims Crafters AI Powered Insured Content Valuations',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;