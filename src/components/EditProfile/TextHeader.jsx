import React from 'react';

const styles = {
  Text: {
    color: '#52565c',
    fontSize: '32px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '42px',
    marginLeft: '20px',
    marginTop: '10px',
  },
};

const defaultProps = {
  text: 'My Profile',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;