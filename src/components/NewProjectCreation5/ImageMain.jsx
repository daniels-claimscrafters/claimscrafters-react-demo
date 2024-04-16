import React from 'react';

const styles = {
  ImageContainer: {
    top: '561px',
    left: '40px',
    width: '100%',
    height: '127px',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    marginBottom: '20px',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/0dd2fc5e-233f-4cd4-b4ce-10d297e77fd8.png',
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