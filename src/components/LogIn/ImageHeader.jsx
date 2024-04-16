import React from 'react';

const styles = {
  ImageContainer: {
    position: 'relative',
    width: '194px',
    height: '205px',
    borderRadius: '8px',
    overflow: 'hidden',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '0 auto', // Add this line to center the component horizontally
    marginBottom: '10px',
  },
  Image: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/d661662c-a6d2-4ac0-bb25-6af76fb995bd.png',
}

const Image = (props) => {
  return (
    <div style={styles.ImageContainer}>
      <img
        src={props.image ?? defaultProps.image}
        alt=""
        style={styles.Image}
      />
    </div>
  );
};

export default Image;
