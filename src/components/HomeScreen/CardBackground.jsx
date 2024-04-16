import React from 'react';

const styles = {
  Card: {
    top: '1208px',
    left: '1px',
    width: '100%',
    height: '450px',
    backgroundColor: '#f3dbb1',
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