import React from "react";

const styles = {
  ImageContainer: {
    top: "20px",
    left: "61px",
    width: "176px",
    height: "181px",
    borderRadius: "8px",
    backgroundImage: "url(./image.png)",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
  },
};

const defaultProps = {
  image: "ContentsIQ.png",
};

const Image = (props) => {
  return (
    <div
      style={{
        ...styles.ImageContainer,
        backgroundImage: `url(${props.image ?? defaultProps.image})`,
      }}
    />
  );
};

export default Image;
