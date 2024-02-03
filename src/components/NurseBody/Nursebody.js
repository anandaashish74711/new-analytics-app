// Profile.js
import React from 'react';
import { useSelector } from 'react-redux';

export default function NurseBody() {
  const userData = useSelector((state) => state.auth.user);

  return (
    <div style={{ backgroundColor: '#001f3f', color: '#fff', minHeight: '100vh' }}>
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-200 rounded-lg shadow-md p-4 m-5 w-64">
          {userData && (
            <div className="flex flex-col items-center">
              {/* Placeholder for profile photo */}
              <div className="bg-gray-300 w-20 h-20 rounded-full mb-4"></div>
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
        </div>
        {userData && (
          <div className="p-4 m-5 flex-1">
            <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>
            {userData.patients.map((patient) => (
              <div key={patient._id} className="p-2 m-2 border rounded-lg">
                <p className="text-primary text-lg font-medium">
                  {patient.patientName} - Patient ID: <span className="ml-2">{patient.patientId}</span>
                </p>
              </div>
            ))}
          </div>
        )}
      </div>
   
  );
}
