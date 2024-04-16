import React from 'react';

const styles = {
  Text: {
    color: '#ffffff',
    fontSize: '14px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '18px',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'The Depreciation Range is designed to offer a streamlined and practical approach for depreciating line items. It aims to determine the most suitable range for setting the depreciation age for the contents related to this claim. This range is applied across different classifications of each line item, ensuring accurate calculation of their Actual Cash Value (ACV). This method enhances the precision and fairness of the valuation process.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;