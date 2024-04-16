import React from 'react';

const styles = {
  Header: {
    top: '0px',
    left: '34px',
    width: '100vw',
    height: '15%',
    backgroundColor: '#030303',
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