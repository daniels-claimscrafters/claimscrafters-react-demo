import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '18px',
    fontFamily: 'Noto Sans JP',
    lineHeight: '23px',
    textAlign: 'justify',
    textTransform: 'capitalize',
    padding: '10px',
  },
};

const defaultProps = {
  text: 'Claims Crafters, a pioneering technology company has harnessed the power of Al to revolutionize the contents valuation process. Claims Crafters\' ContentIQ Platform allows insurance professionals to swiftly and accurately assess the value of insured items, enabling insurers to respond to customer rapidly, a departure from the days- long wait times of the past.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;