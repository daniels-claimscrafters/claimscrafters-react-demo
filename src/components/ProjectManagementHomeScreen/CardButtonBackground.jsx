// CardButtonBackground.jsx

import React from 'react';

const styles = {
  Card: {
    top: '191px',
    left: '610px',
    height: '7%',
    backgroundColor: '#f0f0f0',
    borderRadius: '24px',
    
    boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
    display: 'flex', // Added display flex
    justifyContent: 'center', // Center align the buttons
    alignItems: 'center',
    padding: '25px',
    marginBottom: '10px',
  },
  Button: {
    display: 'inline-block', // Align child elements horizontally
  },
};

const Card = (props) => {
  const childrenWithSpacing = React.Children.map(props.children, (child, index) => (
    <React.Fragment>
      {index > 0 && <div style={{ width: '20px' }} />} {/* Add space between buttons */}
      {child}
    </React.Fragment>
  ));

  return (
    <div style={styles.Card}>
      {childrenWithSpacing}
    </div>
  );
};

export default Card;


