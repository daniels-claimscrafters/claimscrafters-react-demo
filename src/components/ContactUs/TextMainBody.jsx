import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '20px',
    fontFamily: 'Poppins',
    lineHeight: '26px',
    marginBottom: '10px',
    maxWidth: '50%',
  },
};

const defaultProps = {
  text: 'Need help with something? Feel free to get in touch.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;