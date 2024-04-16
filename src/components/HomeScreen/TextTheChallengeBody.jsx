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
  text: 'This demand for speed introduces a high- stress element into the claims settlement. Insurance professionals often find themselves balancing a constant stream of requests, trying to strike a balance between accuracy and expediency. The administrative workload can be overwhelming , leading to potential errors in valuation impacting customer satisfaction and carrier relations .',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;