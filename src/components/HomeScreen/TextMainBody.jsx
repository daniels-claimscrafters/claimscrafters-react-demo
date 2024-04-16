import React from 'react';

const styles = {
  Text: {
    color: '#030303',
    fontSize: '34px',
    fontFamily: 'Poppins',
    letterSpacing: '-2px',
    lineHeight: '44px',
    textTransform: 'capitalize',
  },
};

const defaultProps = {
  text: 'Claims Crafters introduces ContentIQ, an innovative Al- driven software designed to revolutionize the insurance content valuation process. Tailored for efficiency and accuracy, ContentIQ empowers insurance professionals and homeowners to seamlessly submit contents inventory and process valuations with unparalleled automation and precision.',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;