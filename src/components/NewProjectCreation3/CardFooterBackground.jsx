import React from 'react';

const styles = {
  Card: {
    top: '1436px',
    left: '0px',
    width: '100%',
    height: '80px',
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