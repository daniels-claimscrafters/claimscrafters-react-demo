import React from 'react';

const styles = {
  Card: {
    top: '235px',
    left: '227px',
    width: '40px',
    height: '40px',
    backgroundColor: 'rgba(42,132,234,0.25)',
    borderRadius: '100px',
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