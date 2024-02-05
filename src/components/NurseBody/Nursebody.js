// Profile.js
import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function NurseBody() {
  const userData = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');

  // Function to filter patients based on the search term
  const filteredPatients = userData?.patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPatients = userData?.patients.length || 0;

  return (
    <div style={{ backgroundColor: '#fff', color: '#008000', minHeight: '100vh' }}>
      <div className="flex flex-col md:flex-row">
        <div className="bg-blue-200 rounded-lg shadow-md p-4 m-5 w-1/4"> {/* Fixed width for the profile column */}
          {userData && (
            <div className="flex flex-col items-center">
              {/* Placeholder for profile photo */}
              <div className="bg-gray-300 w-32 h-32 rounded-full mb-4"></div>
              <p className="text-primary text-xl font-medium mb-2">{userData.name}</p>
              <div className="grid grid-cols-1 gap-2 w-full">
                <div>
                  <p className="text-gray-700 text-sm mb-2">Email:</p>
                  <p className="text-primary text-lg font-medium">{userData.email}</p>
                </div>
              </div>
            </div>
          )}
        </div>
        </div>
         {/* Box for displaying total number of patients */}
         <div className="bg-yellow-300 p-8 w-40 h-30 rounded-lg ">
            <p className="text-primary text-lg font-medium">
              Total Patients: <span className="ml-2">{totalPatients}</span>
            </p>
          </div>

        <div className="p-4 m-5 flex-1">
          <div className="mb-4 flex items-center justify-end">
            {/* Search bar */}
            <input
              type="text"
              placeholder="Search patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md mr-2"
            />
            {/* Search button */}
            <button
              onClick={() => {
                // Perform search logic if needed
              }}
              className="p-2 bg-primary text-white rounded-md"
            >
              Search
            </button>
          </div>

          <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>

        

          {filteredPatients.map((patient) => (
            <div key={patient._id} className="p-2 m-2 border rounded-lg bg-white">
              <p className="text-primary text-lg font-medium">
                {patient.patientName} - Patient ID: <span className="ml-2">{patient.patientId}</span>
              </p>
            </div>
          ))}
        </div>
      </div>
    
  );
}
