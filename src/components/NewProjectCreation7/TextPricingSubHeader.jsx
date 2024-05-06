import React from "react";

const styles = {
  Text: {
    color: "white",
    fontSize: "14px",
    fontFamily: "Manrope",
    lineHeight: "20px",
    marginLeft: "20px",
  },
};

const defaultProps = {
  text: "Line Item Pricing",
};

const Text = (props) => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
