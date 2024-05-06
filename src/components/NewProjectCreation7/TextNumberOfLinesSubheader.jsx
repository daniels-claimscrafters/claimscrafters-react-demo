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
  text: "Number of lines evaluated",
};

const Text = (props) => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
