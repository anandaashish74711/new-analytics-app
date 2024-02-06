import React from 'react';

const Sidebar = () => {
  return (
    <div className="bg-blue-800 h-full fixed w-1/6  p-4 flex flex-col">
     
      <div className="text-white text-xl font-bold mb-4">
        IHUB-DATA
      </div>

      
      <nav className="space-y-5 ">
        <a href="#" className="text-white hover:text-gray-300 block">Dashboard</a>
        <a href="#" className="text-white hover:text-gray-300 block">Patients</a>
        <a href="#" className="text-white hover:text-gray-300 block">Appointments</a>
        <a href="#" className="text-white hover:text-gray-300 block">Tasks</a>
        <a href="#" className="text-white hover:text-gray-300 block">Settings</a>
      </nav>

      
      <div className="mt-auto flex items-center space-x-4">
        <span className="text-white">Nurse Name</span>
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
