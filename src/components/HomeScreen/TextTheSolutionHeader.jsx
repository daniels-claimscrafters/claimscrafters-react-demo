import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '16px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 700,
    lineHeight: '21px',
  },
};

const defaultProps = {
  text: 'Harnessing the Power of Al for Valuations',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;