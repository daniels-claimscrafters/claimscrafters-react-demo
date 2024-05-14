import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const defaultProps = {
  text: "Privacy Policy",
};

const Text = (props) => {
  const navigate = useNavigate();
  const [isHovered, setIsHovered] = useState(false);

  const handleClick = () => {
    // Redirect to /contactus
    navigate("/privacypolicy");
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
      className="Text"
      style={{
        transform: isHovered ? "scale(1.1)" : "scale(1)", // Apply scale transform based on hover state
        ...props.style,
      }}
      onClick={handleClick}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      {props.text ?? defaultProps.text}
    </div>
  );
};

export default Text;
