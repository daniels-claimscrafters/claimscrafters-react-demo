import React from 'react';

const styles = {
  Icon: {
    color: '#023f81',
    fill: '#023f81',
    fontSize: '78px',
    top: '1362px',
    left: '378px',
    width: '78px',
    height: '86px',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 576 512">
    <path d="M572.6 270.3l-96 192C471.2 473.2 460.1 480 447.1 480H64c-35.35 0-64-28.66-64-64V96c0-35.34 28.65-64 64-64h117.5c16.97 0 33.25 6.742 45.26 18.75L275.9 96H416c35.35 0 64 28.66 64 64v32h-48V160c0-8.824-7.178-16-16-16H256L192.8 84.69C189.8 81.66 185.8 80 181.5 80H64C55.18 80 48 87.18 48 96v288l71.16-142.3C124.6 230.8 135.7 224 147.8 224h396.2C567.7 224 583.2 249 572.6 270.3z">
    </path>
  </svg>
);

const defaultProps = {
  IconComponent,
};

const Icon = (props) => {
  return (
    props.IconComponent 
      ? <props.IconComponent style={styles.Icon} /> 
      : <defaultProps.IconComponent />
  );
};

export default Icon;