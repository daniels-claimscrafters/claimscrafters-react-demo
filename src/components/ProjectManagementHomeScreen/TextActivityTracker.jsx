import React from 'react';

const styles = {
  Text: {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '32px',
    textAlign: 'center',
    marginTop: '10px',
    marginBottom: '10px',
    width: '100%',
    height: '5%',
  },
};

const defaultProps = {
  text: 'Activity Tracker',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;