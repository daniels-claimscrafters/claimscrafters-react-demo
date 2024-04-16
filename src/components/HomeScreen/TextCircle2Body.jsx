import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '19px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '25px',
    textAlign: 'justify',
    padding: '10px',
    minWidth: '350px',
  },
};

const defaultProps = {
  text: 'Upon inventory submission and validation, ContentIQ\'s Al engine assigns a Replacement Cost Value (RCV), Actual Cash Value (ACV) and Depreciated value for each item by Class and Subclass.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;