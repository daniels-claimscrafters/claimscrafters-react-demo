// TextPricingNum.jsx

import React from 'react';

const styles = {
  Text: {
    color: '#212121',
    fontSize: '20px',
    fontFamily: 'Poppins',
    fontWeight: 700,
    lineHeight: '26px',
    textAlign: 'right',
    marginRight: '20px',
  },
};

const TextPricingNum = ({ totalPrice }) => {
  return (
    <div style={styles.Text}>
      ${totalPrice} {/* Display the total price */}
    </div>
  );
};

export default TextPricingNum;
