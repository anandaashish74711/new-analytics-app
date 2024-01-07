import React from 'react';

const Header = () => {
  return (
    <div className="bg-blue-800 p-4">
      <div className="container mx-auto flex justify-between items-center">
        {/* Branding/logo */}
        <div className="text-white text-xl font-bold">
          IHUB-DATA
        </div>

        {/* Navigation links */}
        <nav className="flex space-x-4">
          <a href="#" className="text-white hover:text-gray-300">Dashboard</a>
          <a href="#" className="text-white hover:text-gray-300">Reports</a>
          <a href="#" className="text-white hover:text-gray-300">Settings</a>
        </nav>

        {/* User-related information */}
        <div className="flex items-center space-x-4">
          <span className="text-white"></span>
          <img
            src="https://placekitten.com/40/40"
            alt="User Avatar"
            className="rounded-full w-8 h-8"
          />
        </div>
      </div>
    </div>
  );
};

export default Header;
