import React from 'react';
import { useNavigate } from 'react-router-dom';

const styles = {
  Icon: {
    color: '#030303',
    fill: '#030303',
    fontSize: '58px',
    top: '32px',
    left: '1315px',
    width: '58px',
    height: '46px',
    marginRight: '20px'
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path>
    <path d="M12.5 8c-2.65 0-5.05.99-6.9 2.6L2 7v9h9l-3.62-3.62c1.39-1.16 3.16-1.88 5.12-1.88 3.54 0 6.55 2.31 7.6 5.5l2.37-.78C21.08 11.03 17.15 8 12.5 8z">
    </path>
  </svg>
);

const defaultProps = {
  IconComponent,
};

const Icon = (props) => {
  const navigate = useNavigate();

  const handleClick = () => {
    console.log('Clicked!');
    // Use the navigate function to redirect to the /homescreen route
    navigate('/pmhs');
  };

  const IconToRender = props.IconComponent ? props.IconComponent : defaultProps.IconComponent;

  return (
    <div style={{ cursor: 'pointer' }} onClick={handleClick}>
      <IconToRender style={styles.Icon} />
    </div>
  );
};

export default Icon;