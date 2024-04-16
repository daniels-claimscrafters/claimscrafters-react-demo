import React from 'react';

const styles = {
  Text: {
    color: '#212121',
    fontSize: '16px',
    fontFamily: 'Noto Sans JP',
    fontWeight: 500,
    lineHeight: '22px',
    marginLeft: '10px'
  },
};

const defaultProps = {
  text: 'ContentsIQ Contents Valuation ',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;