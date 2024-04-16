import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '25px',
    fontFamily: 'Work Sans',
    fontWeight: 700,
    lineHeight: '70px',
  },
};

const defaultProps = {
  text: 'New Project Creation',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;