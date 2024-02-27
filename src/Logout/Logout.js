// LogoutButton.js

import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';
import { useNavigate } from 'react-router-dom';
import { IoIosLogOut } from "react-icons/io";

const LogoutButton = () => {
  const dispatch = useDispatch();
  const navigate=useNavigate();

  const handleLogout = () => {
    // Store the current URL before logging out
    localStorage.setItem('lastLocation', window.location.pathname);
    dispatch(logoutUser());
    navigate('/login');
  };

  return (
    <button className="bg-white-500 hover:bg-white-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
       <IoIosLogOut className="text-white" />
    </button>
  );
};

export default LogoutButton;
