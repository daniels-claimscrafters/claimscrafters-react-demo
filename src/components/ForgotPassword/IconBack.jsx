// IconBack.jsx
import React from "react";
import { useNavigate } from "react-router-dom";

const styles = {
  Icon: {
    color: "white",
    fill: "white",
    fontSize: "40px",
    top: "225px",
    left: "45px",
    width: "40px",
    height: "40px",
    marginRight: "10px",
    cursor: "pointer", // Add cursor pointer for indicating it's clickable
  },
};

const IconBack = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login"); // Redirect to login page when clicked
  };

  return (
    <svg style={styles.Icon} onClick={handleClick} viewBox="0 0 24 24">
      <path fill="none" d="M0 0h24v24H0z"></path>
      <path d="m9 19 1.41-1.41L5.83 13H22v-2H5.83l4.59-4.59L9 5l-7 7 7 7z"></path>
    </svg>
  );
};

export default IconBack;
