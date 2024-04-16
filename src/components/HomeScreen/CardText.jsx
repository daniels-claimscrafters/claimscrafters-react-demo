// Text.jsx

import React from 'react';

const styles = {
  text: {
    color: '#ffffff',
    fontSize: '40px',
    fontFamily: 'Work Sans',
    fontWeight: '500',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'Crafting Contents Value with Al Intelligence',
};

const Text = (props) => {
  return (
    <div style={styles.text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;
