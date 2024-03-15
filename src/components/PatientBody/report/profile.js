import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userData = useSelector((state) => state.app.users);

  return (
    <div className="flex items-center space-x-4">
      {userData && (
        <div className="bg-purple-100 transition-shadow rounded-lg shadow-md p-4 w-64 ml-4">
          {/* Profile photo code */}
          <div className="flex flex-col items-center space-y-4">
            <p className="text-2xl font-bold text-center text-white">{userData.name}</p>
            <div className="grid grid-cols-2 gap-2 w-full text-white">
              <div className="flex flex-col">
                <p className="text-sm mb-1">Age:</p>
                <p className="font-medium text-lg text-primary">{userData.age}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm mb-1">Gender:</p>
                <p className="font-medium text-lg text-primary">{userData.gender}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm mb-1">Height:</p>
                <p className="font-medium text-lg text-primary">{userData.height}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm mb-1">Weight:</p>
                <p className="font-medium text-lg text-primary">{userData.weight}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm mb-1">BMI:</p>
                <p className="font-medium text-lg text-primary">{userData.BMI}</p>
              </div>
              <div className="flex flex-col">
                <p className="text-sm mb-1">Blood Group:</p>
                <p className="font-medium text-lg text-primary">{userData.bloodGroup}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
