// Header.jsx

import React from 'react';

const styles = {
  Header: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',  // Use 100% width to span the entire screen
    height: '139px',
    backgroundColor: '#030303',
  },
  headerButtonsContainer: {
    display: 'flex',
    alignItems: 'center',
  },
  textGetStarted: {
    marginRight: '30px',  // Adjust the margin as needed
  },
  buttonSignIn: {
    marginLeft: '10px',  // Adjust the margin as needed
    marginRight: '30px',  // Adjust the margin as needed

  },
};

const Header = (props) => {
  const childrenArray = React.Children.toArray(props.children);

  return (
    <div style={styles.Header}>
      {/* Logo on the left */}
      {childrenArray[0]}

      {/* Header text in the middle */}
      {childrenArray[1]}

      {/* Sign In text and Login button on the right */}
      <div style={styles.headerButtonsContainer}>
        {childrenArray[2]}
        {childrenArray.slice(3).map((child, index) => (
          <div key={index} style={index === 0 ? styles.buttonSignIn : {}}>
            {child}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Header;