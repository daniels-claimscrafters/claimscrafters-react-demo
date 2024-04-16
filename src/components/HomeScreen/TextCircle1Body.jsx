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
  text: 'User registers and creates a new, unique claims related project. Next, the user is guided to easily upload the content inventory data from Excel into ContentIQ . Eliminating the need to enter data and lookup values.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;