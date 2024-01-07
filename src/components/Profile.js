import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/FetchapiSlice';

export default function Profile() {
  const userData = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, );

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-6 m-5 w-64">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      {userData && (
        <div className="flex flex-col items-center">
          <div className="h-44 w-44 rounded-full overflow-hidden mb-4 bg-primary">
            {/* Replace the placeholder image URL with your actual image URL */}
            <img
              src="https://placekitten.com/200/200"
              alt="Profile Avatar"
              className="w-full h-full object-cover"
            />
          </div>
          <p className="text-primary text-lg font-medium mb-2">{userData.name}</p>
          <div className="grid grid-cols-2 gap-4 w-full">
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
