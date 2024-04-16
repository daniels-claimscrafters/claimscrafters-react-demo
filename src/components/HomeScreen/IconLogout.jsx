// IconLogout.jsx
import React from 'react';

const styles = {
  Icon: {
    color: '#030303',
    fill: '#FFFFFF',
    fontSize: '38px',
    paddingBottom: '10px',
    width: '40px',
    height: '40px',
    cursor: 'pointer',
  },
};

const IconComponent = () => (
  <svg style={styles.Icon}  viewBox="0 0 24 24">
    <path d="M0 0h24v24H0z" fill="none">
    </path>
    <path d="m17 7-1.41 1.41L18.17 11H8v2h10.17l-2.58 2.58L17 17l5-5zM4 5h8V3H4c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h8v-2H4V5z">
    </path>
  </svg>
);

const defaultProps = {
  IconComponent,
};

const IconLogout = ({ onClick }) => {
  return (
    <div onClick={onClick}>
      {IconComponent ? <IconComponent style={styles.Icon} /> : <defaultProps.IconComponent />}
    </div>
  );
};

export default IconLogout;