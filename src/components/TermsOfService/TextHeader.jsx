import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '36px',
    fontFamily: 'Poppins',
    fontWeight: '1000',
    lineHeight: '31px',
    
  },
};

const defaultProps = {
  text: 'Terms of Use',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;