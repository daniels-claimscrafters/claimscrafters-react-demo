import React from 'react';

const styles = {
  Card: {
    top: '0px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
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