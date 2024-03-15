import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userData = useSelector((state) => state.app.users);

  return (
    <div className="bg-white-800 transition-shadow rounded-lg shadow-lg p-4 m-5 w-64"> 

      {userData && (
        <div className="flex flex-col items-center">
          {/* Removed profile photo code */}
          <p className="text-2xl font-bold mb-4 text-center text-white">{userData.name}</p>
          <div className="grid grid-cols-2 gap-2 w-full  text-white">
            <div>
              <p className=" text-white text-sm mb-2">Age:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.age}</p>
            </div>
            <div>
              <p className=" text-white text-sm mb-2">Gender:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.gender}</p>
            </div>
            <div>
              <p className=" text-white text-sm mb-2">Height:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.height}</p>
            </div>
            <div>
              <p className=" text-white text-sm mb-2">Weight:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.weight}</p>
            </div>
            <div>
              <p className=" text-white text-sm mb-2">BMI:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.BMI}</p>
            </div>
            <div>
              <p className=" text-white text-sm mb-2">Blood Group:</p>
              <p className="text-primary text-lg font-medium  text-white">{userData.bloodGroup}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
