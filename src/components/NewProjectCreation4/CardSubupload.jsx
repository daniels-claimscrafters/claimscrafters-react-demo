import React from "react";

const styles = {
  Card: {
    top: "498px",
    left: "153px",
    width: "100%",
    height: "20px",
    backgroundColor: "#2a84ea",
    borderRadius: "12px",
    border: "1px solid #f0f0f0",
    boxSizing: "border-box",
  },
};

const Card = (props) => {
  return <div style={styles.Card}>{props.children}</div>;
};

export default Card;
