import React from 'react';

const styles = {
  VerticalDivider: {
    top: '1018px',
    left: '1219px',
    width: '3px',
    height: '30px',
    backgroundColor: '#c2c2c2',
    borderRadius: '2px',
    marginRight: '15px',
    marginLeft: '15px',
  },
};

const VerticalDivider = (props) => {
  return (
    <div style={styles.VerticalDivider} />
  );
};

export default VerticalDivider;