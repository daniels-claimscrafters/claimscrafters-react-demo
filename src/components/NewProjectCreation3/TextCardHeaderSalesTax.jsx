import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '18px',
    fontFamily: 'Red Hat Display',
    fontWeight: 600,
    lineHeight: '24px',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'Sales Tax',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;