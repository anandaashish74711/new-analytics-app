import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getUser } from '../features/FetchapiSlice';

export default function Profile() {
  const userData = useSelector((state) => state.app.users);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
  }, [dispatch]);

  return (
    <div className="p-4 w-96 bg-secondary rounded-lg shadow-md">
      <h1 className="text-2xl font-bold mb-4 text-center">Profile</h1>

      {userData && (
        <div className="flex flex-col items-center">
          <div className="w-24 h-44 rounded-full overflow-hidden mb-4">
           
          </div>
          <p className="text-primary text-lg font-medium mb-2">{userData.name}</p>
          <div className="grid grid-cols-2 gap-4 w-full">
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">Age:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.age}</p>
            </div>
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">Gender:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.gender}</p>
            </div>
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">Height:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.height}</p>
            </div>
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">Weight:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.weight}</p>
            </div>
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">BMI:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.BMI}</p>
            </div>
            <div>
              <p style={{ display: 'inline-block' }} className="text-gray-700 text-sm mb-2">Blood Group:</p>
              <p style={{ display: 'inline-block' }} className="text-primary text-lg font-medium">{userData.bloodGroup}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}