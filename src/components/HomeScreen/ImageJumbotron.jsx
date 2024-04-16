import React from 'react';

const styles = {
  ImageContainer: {
    top: '141px',
    left: '-6px',
    width: '751px',
    height: '624px',
    borderRadius: '12px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/1183c21e-490a-4068-bb0b-d2fbec3a453b.png',
}

const Image = (props) => {
  return (
    <div style={{
      ...styles.ImageContainer,
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
    }} />
  );
};

export default Image;