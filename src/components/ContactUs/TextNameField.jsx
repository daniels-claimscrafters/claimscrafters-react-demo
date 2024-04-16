import React from 'react';

const styles = {
  Text: {
    color: '#040000',
    fontSize: '16px',
    fontFamily: 'Poppins',
    lineHeight: '21px',
    marginBottom: '5px'
  },
};

const defaultProps = {
  text: 'Name',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;