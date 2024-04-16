import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '48px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '62px',
  },
};

const defaultProps = {
  text: 'Contact Us',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;