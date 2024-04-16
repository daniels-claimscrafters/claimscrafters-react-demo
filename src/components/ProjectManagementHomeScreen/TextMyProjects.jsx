import React from 'react';

const styles = {
  Text: {
    color: 'black',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 600,
    lineHeight: '32px',
    paddingTop: '5px',
    paddingBottom: '5px',
    marginBottom: '10px',
    textAlign: 'center',
    height: '5%',
  },
};

const defaultProps = {
  text: 'My Projects',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;