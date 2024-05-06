import React from "react";

const styles = {
  Text: {
    color: "white",
    fontSize: "20px",
    fontFamily: "Poppins",
    fontWeight: 700,
    lineHeight: "26px",
    textAlign: "right",
    marginRight: "20px",
  },
};

const TextNumberOfLinesNum = ({ numberOfLines }) => {
  return (
    <div style={styles.Text}>
      {numberOfLines}{" "}
      {/* Use the value of numberOfLines if available, otherwise fallback to a default value */}
    </div>
  );
};

export default TextNumberOfLinesNum;
