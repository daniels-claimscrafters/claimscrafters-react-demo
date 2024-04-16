import React from 'react';

const styles = {
  VerticalDivider: {
    top: '1817px',
    left: '1206px',
    width: '3px',
    height: '30px',
    backgroundColor: '#c2c2c2',
    borderRadius: '2px',
    marginLeft: '15px',
    marginRight: '15px',
  },
};

const VerticalDivider = (props) => {
  return (
    <div style={styles.VerticalDivider} />
  );
};

export default VerticalDivider;