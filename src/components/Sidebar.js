import React from 'react';
import LogoutButton from '../Logout/Logout';
import { useSelector } from 'react-redux';
import { FaBars, FaTimes, FaHome, FaUser, FaCog } from 'react-icons/fa';

const Sidebar = ({ collapsed, toggleSidebar, toggleSidebarCompletely }) => {
  const userData = useSelector((state) => state.auth.user);

  let navContent;
  if (userData.role === 'Nurse' || userData.role === 'doctor') {
    navContent = (
      <nav className="space-y-5">
        <a href="#" className="text-white hover:text-gray-300 block"><FaHome className="inline-block mr-2" />Dashboard</a>
        <a href="#" className="text-white hover:text-gray-300 block"><FaUser className="inline-block mr-2" />Patients</a>
        <a href="#" className="text-white hover:text-gray-300 block"><FaCog className="inline-block mr-2" />Appointments</a>
      </nav>
    );
  } else {
    navContent = (
      <nav className="space-y-5">
        <a href="#" className="text-white hover:text-gray-300 block"><FaHome className="inline-block mr-2" />Visits</a>
        <a href="#" className="text-white hover:text-gray-300 block"><FaUser className="inline-block mr-2" />Settings</a>
        <a href="#" className="text-white hover:text-gray-300 block"><FaCog className="inline-block mr-2" />Appointments</a>
      </nav>
    );
  }

  return (
    <div className={`bg-blue-800 h-full fixed w-1/6 p-4 flex flex-col ${collapsed ? 'hidden' : ''}`}>
      <div className="flex justify-between items-center mb-4">
        <div className="text-white text-xl font-bold">
          IHUB-DATA
        </div>
        <div className="cursor-pointer" onClick={toggleSidebar}>
          {collapsed ? <FaBars className="text-white" /> : <FaTimes className="text-white" />}
        </div>
      </div>
      {navContent}
      <div className="mt-80 flex items-center space-x-4">
        <LogoutButton />
      </div>
      <div className="mt-auto flex items-center space-x-4">
        <span className="text-white">{userData.name}</span>
        <img
          src="https://placekitten.com/40/40"
          alt="User Avatar"
          className="rounded-full w-8 h-8"
        />
      </div>
    </div>
  );
};

export default Sidebar;
