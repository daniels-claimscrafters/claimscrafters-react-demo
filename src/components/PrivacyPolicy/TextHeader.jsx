import React from "react";

const styles = {
  Text: {
    color: "white",
    fontSize: "36px",
    fontFamily: "Poppins",
    fontWeight: "1000",
    lineHeight: "31px",
    padding: "5px",
  },
};

const defaultProps = {
  text: "PRIVACY POLICY",
};

const Text = (props) => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
