import React from 'react';

const styles = {
  Dropdown: {
    cursor: 'pointer',
    top: '539px',
    left: '716px',
    width: '276px',
    height: '45px',
    padding: '0px 8px',
    border: '1px solid #ceced3',
    boxSizing: 'border-box',
    borderRadius: '12px',
    backgroundColor: 'rgba(255,255,255,0.87)',
    color: '#1d1d1f',
    fontSize: '20px',
    fontFamily: 'Poppins',
    lineHeight: '26px',
    outline: 'none',
  },
};

const defaultProps = {
  label: 'Depreciation',
  values: [
    'Please Select',
    '0 - 3 years',
    '4 - 6 years',
    '7 - 9 years',
    '10+ years',
    'N/A',
  ],
};

const DropdownDepreciation = (props) => {
  const { value, onChange } = props; // Destructure value and onChange from props

  const handleChange = (e) => {
    const selectedValue = e.target.value;
    onChange('depreciationRange', selectedValue); // Call the onChange handler with the selected value
    console.log('depreciationRange', selectedValue);
  };

  return (
    <select style={styles.Dropdown} value={value} onChange={handleChange}>
      <option value="" disabled hidden>{props.label ?? defaultProps.label}</option>
      {(props.values ?? defaultProps.values).map((value) => (
        <option value={value} key={value}>{value}</option>
      ))}
    </select>
  );
};

export default DropdownDepreciation;