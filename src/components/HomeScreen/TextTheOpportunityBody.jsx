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
  text: 'Advanced technology focusing on efficiency and accuracy is critical to the insurance industry . Settlement times will continue to constrict with service levels becoming imperative." The Opportunity underscores the importance of adapting to meet customer demands in an era of instant gratification, a pivotal moment in insurance history that will redefine industry standards .',
};

const Text = (props) => {
  return (
    <div style={styles.Text}>
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;