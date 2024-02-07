import React, { useState } from 'react';
import { useSelector } from 'react-redux';

export default function NurseBody() {
  const userData = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPatients = userData?.patients.filter(
    (patient) =>
      patient.patientName.toLowerCase().includes(searchTerm.toLowerCase()) 
  );

  const totalPatients = userData?.patients.length || 0;

  return (
    <div className=" h-screen py-6 pl-10 mt-4">
<div className='grid grid-cols-3   ml-10 mb-10'>
<div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {totalPatients}
          <div className="text-white text-sm ">Total Patients</div>
        
      </div>
      <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {totalPatients}
          <div className="text-white text-sm ">Total visits</div>
        
      </div>
      <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {totalPatients}
          <div className="text-white text-sm ">Total Nurses</div>
        
      </div>
      </div>

      <div className="p-4 m-5 border rounded-lg bg-white flex-grow">
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
       <div className='p-4 bg-white'></div>
        <div className="flex flex-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredPatients.map((patient) => (
            <div key={patient._id} className="p-2 m-2 border rounded-lg bg-white shadow-md w-full grid-flow-col">
              <p className="text-primary text-md font-medium">{patient.patientName}</p>
              <p className="text-primary text-md font-medium">{patient.nurseName}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}