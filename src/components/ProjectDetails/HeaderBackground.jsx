import React from 'react';

const styles = {
  Header: {
    top: '3px',
    left: '0px',
    width: '100%',
    height: '100%',
    backgroundColor: '#1e1f26',
    boxShadow: '0px 1px 12px rgba(3,3,3,0.32)',
  },
};

const Header = (props) => {
  return (
    <div style={styles.Header}>
      {props.children}
    </div>
  );
};

export default Header;