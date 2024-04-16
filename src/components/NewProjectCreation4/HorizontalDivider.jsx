import React from 'react';

const styles = {
  HorizontalDivider: {
    top: '262px',
    left: '80px',
    width: '148px',
    height: '2px',
    backgroundColor: '#c2c2c2',
    borderRadius: '2px',
  },
};

const HorizontalDivider = (props) => {
  return (
    <div style={styles.HorizontalDivider} />
  );
};

export default HorizontalDivider;