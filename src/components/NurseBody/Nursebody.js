import React, { useState } from 'react';
import { useSelector } from 'react-redux';



export default function NurseBody() {
  const userData = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedDate, setSelectedDate] = useState(new Date()); // State to store selected date

  const filteredPatients = userData?.patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      patient.patientId.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const totalPatients = userData?.patients.length || 0;

  return (
    <div className="flex flex-col ml-5 my-8 h-screen ">
      <div className="bg-yellow-300 p-10 w-48 h-40 rounded-lg mb-4">
        <p className="text-primary text-lg font-medium">
          Total Patients: <span className="ml-2">{totalPatients}</span>
        </p>
      </div>
      

      <div className="p-4 m-5 border rounded-lg bg-white">
        <div className="mb-4 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search patients"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="p-2 border rounded-md rounded-end focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={() => {
              
            }}
            className="bg-blue-500 rounded-md h-11 w-16 transition hover:bg-blue-600 ml-2"
          >
            <h1 className="text-center text-white">Search</h1>
          </button>
        </div>

        <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>

        <div className="flex flex-wrap">
          {filteredPatients.map((patient) => (
            <div key={patient._id} className="p-2 m-2 border rounded-lg bg-white shadow-md w-full">
              <p className="text-primary text-md font-medium">{patient.patientName}</p>
            </div>
          ))}
        </div>

        
      </div>
    </div>
  );
}


