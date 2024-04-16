import React from 'react';

const styles = {
  Text: {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 500,
    lineHeight: '26px',
    textAlign: 'center',
  },
};

const defaultProps = {
  text: '5',
};

const Text = ({total}) => {
  return (
    <div style={styles.Text}>
      {total ?? defaultProps.text}
    </div>
  );
};

export default Text;