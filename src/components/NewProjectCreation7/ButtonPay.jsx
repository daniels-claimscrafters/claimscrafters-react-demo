import React from 'react';

const styles = {
  Button: {
    cursor: 'pointer',
    top: '796px',
    left: '842px',
    width: '500px',
    height: '56px',
    padding: '0px 8px',
    border: '0',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: '#2a84ea',
    color: '#ffffff',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '26px',
    outline: 'none',
  },
  DisabledButton: {
    backgroundColor: '#999999',
    cursor: 'not-allowed',
  }
};

const ButtonPay = ({ totalPrice, onClick, disabled }) => {
  const label = totalPrice ? `Pay $${totalPrice}` : 'Pay $0.00';

  const buttonStyle = disabled ? { ...styles.Button, ...styles.DisabledButton } : styles.Button;

  return (
    <button style={buttonStyle} onClick={onClick} disabled={disabled}>
      {label}
    </button>
  );
};

export default ButtonPay;