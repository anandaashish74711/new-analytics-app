import React from 'react';
import { useDispatch } from 'react-redux';
import { logoutUser } from '../features/authSlice';

const LogoutButton = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutUser());
  };

  return (
    <button className="bg-white-500 hover:bg-white-600 text-white font-bold py-2 px-4 rounded" onClick={handleLogout}>
      Logout
    </button>
  );
};

export default LogoutButton;
