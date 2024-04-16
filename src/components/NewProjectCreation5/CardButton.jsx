import React from 'react';

const styles = {
  Card: {
    top: '766px',
    left: '628px',
    width: '100px',
    height: '50px',
    backgroundColor: '#d9d9d9',
    borderRadius: '26px',
    border: '1px solid #505050',
    boxSizing: 'border-box',
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