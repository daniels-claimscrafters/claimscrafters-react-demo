import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  ImageContainer: {
    top: '-3px',
    left: '1px',
    width: '140px',
    height: '100px',
    borderRadius: '8px',
    backgroundImage: 'url(./image.png)',
    backgroundPosition: 'center center',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    cursor: 'pointer',
  },
};

const defaultProps = {
  image: 'https://assets.api.uizard.io/api/cdn/stream/616c0541-6abe-4fb7-aedb-96cdcde8c0bd.png',
}

const Image = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    // Use the navigate function to redirect to the /login route
    navigate('/');
  };
  return (
    <div style={{
      ...styles.ImageContainer, 
      backgroundImage: `url(${props.image ?? defaultProps.image})`,
    }} onClick={handleClick}/>
    
  );
};

export default Image;