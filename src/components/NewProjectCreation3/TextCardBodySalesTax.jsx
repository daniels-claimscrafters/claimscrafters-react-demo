import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '18px',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'Enter the corresponding sales tax per loss address zip code.  This will be used to calculate tax incurred and will be applied to RCV valuations.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;