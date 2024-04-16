// IconPlus.jsx

import React from 'react';

const styles = {
  Icon: {
    color: '#030303',
    fill: '#030303',
    fontSize: '31px',
    top: '704px',
    left: '537px',
    width: '31px',
    height: '30px',
  },
};

const IconComponent = ({ onClick }) => (
  <div onClick={onClick} style={{ display: 'inline-block' }}>
    <svg style={styles.Icon} viewBox="0 0 24 24">
      <path d="M0 0h24v24H0z" fill="none"></path>
      <path d="M19 3H5a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm-2 10h-4v4h-2v-4H7v-2h4V7h2v4h4v2z"></path>
    </svg>
  </div>
);

export default IconComponent;