import React from 'react';
import { useNavigate } from 'react-router-dom';

const MenuIcon = () => {
    const navigate = useNavigate();
  const handleClick = () => {
    navigate('/editprofile');
  };

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      width="24"
      height="24"
      viewBox="0 0 24 24"
      onClick={handleClick}
      style={{ cursor: 'pointer', fill: 'white', marginRight: '20px' }}
    >
      <path d="M0 0h24v24H0z" fill="none" />
      <path d="M4 18h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zm0-5h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1s.45 1 1 1zM3 7c0 .55.45 1 1 1h16c.55 0 1-.45 1-1s-.45-1-1-1H4c-.55 0-1 .45-1 1z" />
    </svg>
  );
};

export default MenuIcon;


