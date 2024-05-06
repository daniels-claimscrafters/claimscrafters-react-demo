import React from "react";

const styles = {
  Text: {
    color: "white",
    fontSize: "16px",
    fontFamily: "Poppins",
    lineHeight: "21px",
  },
};

const defaultProps = {
  text: "Reviewed and Agreed",
};

const Text = (props) => {
  return <div style={styles.Text}>{props.text ?? defaultProps.text}</div>;
};

export default Text;
