// CardTask.jsx

import React from 'react';

const styles = {
  Card: {
    top: '20px',
    left: '31px',
    width: '720px',
    height: '657px',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
  },
};

const Card = (props) => {
  return (
    <div style={styles.Card}>
      {props.children}
    </div>
  );
};

export default Card;