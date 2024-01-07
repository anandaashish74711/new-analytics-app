import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userData = useSelector((state) => state.app.users);

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 m-5 w-64"> {/* Adjusted width to w-64 */}

      {userData && (
        <div className="flex flex-col items-center">
          {/* Removed profile photo code */}
          <p className="text-primary text-lg font-medium mb-2">{userData.name}</p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <p className="text-gray-700 text-sm mb-2">Age:</p>
              <p className="text-primary text-lg font-medium">{userData.age}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-2">Gender:</p>
              <p className="text-primary text-lg font-medium">{userData.gender}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-2">Height:</p>
              <p className="text-primary text-lg font-medium">{userData.height}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-2">Weight:</p>
              <p className="text-primary text-lg font-medium">{userData.weight}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-2">BMI:</p>
              <p className="text-primary text-lg font-medium">{userData.BMI}</p>
            </div>
            <div>
              <p className="text-gray-700 text-sm mb-2">Blood Group:</p>
              <p className="text-primary text-lg font-medium">{userData.bloodGroup}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
