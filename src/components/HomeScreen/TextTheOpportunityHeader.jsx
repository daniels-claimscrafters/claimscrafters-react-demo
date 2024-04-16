import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '16px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 600,
    lineHeight: '21px',
  },
};

const defaultProps = {
  text: 'Technology as a Time to Value Resource',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;