import React from 'react';

const styles = {
  Card: {
    top: '148px',
    left: '276px',
    width: '80%',
    height: '45%',
    backgroundColor: '#cddef2',
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