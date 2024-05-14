import React from "react";

const styles = {
  Card: {
    top: "650px",
    left: "716px",
    margin: "auto",
    width: "60%",
    padding: "10px",
    backgroundColor: "#080a0b",
    borderRadius: "12px",
    border: "1px solid #3164f4",
    boxSizing: "border-box",
  },
};

const Card = (props) => {
  return <div style={styles.Card}>{props.children}</div>;
};

export default Card;
