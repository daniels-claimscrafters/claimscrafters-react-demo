import React from 'react';

const styles = {
  ImageContainer: {
    top: '2333px',
    left: '33px',
    width: '1371px',
    height: '521px',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    margin: '10px',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/76cbb20e-6617-499c-b083-a5f10f825461.png',
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