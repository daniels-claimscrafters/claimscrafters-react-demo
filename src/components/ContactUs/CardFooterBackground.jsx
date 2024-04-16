import React from 'react';

const styles = {
  Card: {
    top: '977px',
    left: '0px',
    width: '100%',
    height: '75px',
    backgroundColor: '#040000',
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