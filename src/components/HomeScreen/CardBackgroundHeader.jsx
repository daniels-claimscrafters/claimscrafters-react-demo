import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '32px',
    fontFamily: 'Work Sans',
    fontWeight: '500',
    lineHeight: '42px',
    marginTop: '20px',
    marginBottom: '10px',
  },
};

const defaultProps = {
  text: 'The ContentIQ\'s Valuation Process - from days to minutes',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;