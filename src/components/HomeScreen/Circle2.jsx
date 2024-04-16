import React from 'react';

const Circle = ({ children }) => {
  const circleStyle = {
    top: '1330px',
    left: '339px',
    width: '150px',
    height: '150px',
    backgroundColor: '#ffffff',
    border: '3px solid #023f81',
    boxSizing: 'border-box',
    borderRadius: '50%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // Center vertically
    alignItems: 'center', // Center horizontally
  };

  return (
    <div style={circleStyle}>
      {children}
    </div>
  );
};

export default Circle;