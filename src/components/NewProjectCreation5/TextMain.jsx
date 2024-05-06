import React from "react";

const styles = {
  Text: {
    padding: "10px",
    color: "white",
    fontSize: "18px",
    fontFamily: "Poppins",
    lineHeight: "42px",
  },
};

const defaultProps = {
  text: "Count of line items being evaluated:",
};

const Text = (props) => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
