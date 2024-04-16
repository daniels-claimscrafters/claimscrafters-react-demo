import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontFamily: 'Poppins',
    fontWeight: 800,
    lineHeight: '40px',
  },
};

const defaultProps = {
  text: 'Project Management',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;