import React from 'react';
import { useSelector } from 'react-redux';

export default function Profile() {
  const userData = useSelector((state) => state.auth.user);

  return (
    <div className="bg-gray-200 rounded-lg shadow-md p-4 m-5 w-64"> 

      {userData && (
        <div className="flex flex-col items-center">
          {/* Removed profile photo code */}
          <p className="text-primary text-lg font-medium mb-2">{userData.name}</p>
          <div className="grid grid-cols-2 gap-2 w-full">
            <div>
              <p className="text-gray-700 text-sm mb-2">Email:</p>
              <p className="text-primary text-lg font-medium">{userData.email}</p>
            </div>
           
            
            
           
          
          </div>
        </div>
      )}
    </div>
  );
}
