import React from 'react';
import { useSelector } from 'react-redux';

export default function Header() {
  const userData = useSelector((state) => state.app.users);

  return (
    <header className="bg-blue-800 py-4 shadow-lg">
      <div className="container mx-auto flex items-center justify-between">
        <h1 className="text-white text-2xl font-bold">IHUB-DATA</h1>
        {userData && (
          <div className="flex items-center space-x-4">
            <img
              src={userData.profilePhoto}
              alt="Profile"
              className="w-12 h-12 rounded-full object-cover"
            />
            <div className="text-white">
              <p className="text-lg font-semibold">{userData.name}</p>
              <p className="text-sm">{userData.email}</p>
            </div>
          </div>
        )}
      </div>
    </header>
  );
}
