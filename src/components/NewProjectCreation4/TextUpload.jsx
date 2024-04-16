import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '16px',
    fontFamily: 'Poppins',
    lineHeight: '16px',
    
    fontWeight: 'bold'
  },
};

const Text = (props) => {
  const { fileName } = props;
  return (
    <div style={styles.Text}>
      File Uploaded: {fileName ? fileName : '...'}
    </div>
  );
};

export default Text;
