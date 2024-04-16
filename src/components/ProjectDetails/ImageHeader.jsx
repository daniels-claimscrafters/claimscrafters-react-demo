import React from 'react';

const styles = {
  ImageContainer: {
    top: '8px',
    left: '13px',
    width: '5%',
    height: '90%',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginLeft: '20px',
    marginTop: '5px',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/ffd9fb9d-25b1-4238-aa81-10979a405a8e.png',
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