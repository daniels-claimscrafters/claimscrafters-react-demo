import React from "react";

const styles = {
  ImageContainer: {
    top: "20px",
    left: "61px",
    width: "89px",
    height: "89px",
    borderRadius: "8px",
    backgroundImage: "url(./image.png)",
    backgroundPosition: "center center",
    backgroundSize: "cover",
    backgroundRepeat: "no-repeat",
    marginBottom: "10px",
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
