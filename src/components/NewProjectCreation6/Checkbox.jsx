// checkbox.jsx
import React from 'react';

const styles = {
  Container: {
    cursor: 'pointer',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    width: '28px',
    height: '23px',
    pointerEvents: 'auto',
    color: 'rgba(42, 132, 234, 1)',
    backgroundColor: 'rgba(241, 241, 241, 1)',
    borderRadius: '5px',
    boxShadow: '0px 0px 0px rgba(0, 0, 0, 0.08)',
    border: '1px solid rgba(42, 132, 234, 1)',
    marginRight: '10px',
  },
  Check: {
    display: 'none',
    transition: 'left 0.3s ease',
    zIndex: 1,
  },
  Input: {
    position: 'absolute',
    opacity: 0,
    visibility: 'hidden',
    width: '1px',
    height: '1px',
    pointerEvents: 'none',
  },
};

const Checkbox = ({ checked, onChange }) => {
  const onClick = (event) => {
    onChange(!checked, event); // Pass the event object explicitly
  };

  return (
    <div style={styles.Container} onClick={onClick}>
      <div style={{
        ...styles.Check,
        display: checked ? 'block' : 'none',
      }}>
        ✓
      </div>
      <input type="checkbox" style={styles.Input} checked={checked} onChange={() => {}} />
    </div>
  );
};

export default Checkbox;