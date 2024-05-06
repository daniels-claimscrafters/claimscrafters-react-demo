import React, { useState } from "react";

const styles = {
  Dropdown: {
    cursor: "pointer",
    top: "631px",
    left: "583px",
    width: "100%",
    height: "36px",
    padding: "0px 8px",
    borderBottom: "1px solid #ededed",
    boxSizing: "border-box",
    borderRadius: "3px",
    backgroundColor: "#04101E",
    color: "#929699",
    fontSize: "14px",
    fontFamily: "Poppins",
    lineHeight: "18px",
    outline: "none",
  },
  ErrorMessage: {
    color: "red",
    marginTop: "5px",
    fontSize: "14px",
  },
};

const defaultProps = {
  text: "Choose",
  values: [
    "Alabama",
    "Alaska",
    "Arizona",
    "Arkansas",
    "California",
    "Colorado",
    "Connecticut",
    "Delaware",
    "Florida",
    "Georgia",
    "Hawaii",
    "Idaho",
    "Illinois",
    "Indiana",
    "Iowa",
    "Kansas",
    "Kentucky",
    "Louisiana",
    "Maine",
    "Maryland",
    "Massachusetts",
    "Michigan",
    "Minnesota",
    "Mississippi",
    "Missouri",
    "Montana",
    "Nebraska",
    "Nevada",
    "New Hampshire",
    "New Jersey",
    "New Mexico",
    "New York",
    "North Carolina",
    "North Dakota",
    "Ohio",
    "Oklahoma",
    "Oregon",
    "Pennsylvania",
    "Rhode Island",
    "South Carolina",
    "South Dakota",
    "Tennessee",
    "Texas",
    "Utah",
    "Vermont",
    "Virginia",
    "Washington",
    "West Virginia",
    "Wisconsin",
    "Wyoming",
  ],
};

const InputFieldState = (props) => {
  const { value, onChange, userData } = props;
  const state = userData.state;

  const handleInputChange = (e) => {
    const newValue = e.target.value;
    onChange(e);
  };

  return (
    <div className="inputFill">
      <select
        style={styles.Dropdown}
        value={value || state}
        onChange={handleInputChange}
      >
        <option value="" disabled hidden>
          {props.label ?? defaultProps.label}
        </option>
        {(props.values ?? defaultProps.values).map((value) => (
          <option value={value} key={value}>
            {value}
          </option>
        ))}
      </select>
    </div>
  );
};

export default InputFieldState;
