// CardInProcess.jsx

import React from 'react';
import CardInProcessSubcard from './CardInProcessSubcard';
import IconInProcess from './IconInProgress';
import TextInProcessInt from './TextInProcessInt';
import TextInProcess from './TextInProcess';

const styles = {
  Card: {
    top: '136px',
    left: '102px',
    width: '100%',
    height: '100%',
    backgroundColor: '#f0f0f0',
    borderRadius: '12px',
    boxShadow: '0 4px 8px rgba(255, 255, 255, 0.2)',
  },
  // Additional styles for the child components
  ChildContainer: {
    padding: '7px',
    height: '100%',
    paddingTop: '10px',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    gap: '5px'
  },
  IconInProcessContainer: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100%',
  },
};

const CardInProcess = ({inProcess}) => {
  console.log('Value of inProcess:', inProcess);
  return (
    <div style={styles.Card}>
      <div style={styles.ChildContainer}>
        <CardInProcessSubcard >
          {/* Apply inline styling to center IconInProcess */}
          <div style={styles.IconInProcessContainer}>
            <IconInProcess />
          </div>
        </CardInProcessSubcard >
        <TextInProcess />
        <TextInProcessInt inProcess={inProcess} />
      </div>
    </div>
  );
};

export default CardInProcess;