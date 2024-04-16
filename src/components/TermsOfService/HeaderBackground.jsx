import React from 'react';

const styles = {
  Card: {
    top: '-18px',
    left: '-7px',
    width: '100%',
    height: '148px',
    backgroundColor: '#000000',
    marginBottom: '10px',
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