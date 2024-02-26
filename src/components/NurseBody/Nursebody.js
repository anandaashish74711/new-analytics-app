import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getUser } from '../../features/FetchapiSlice';

export default function NurseBody() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const userData = useSelector((state) => state.auth.user);
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState(null);

  const handleView = async (userId, userType) => {
    try {
      console.log("Dispatching getUser with userId:", userId, "and userType:", userType);
      await dispatch(getUser({ userId, userType })); 
      navigate(`/dashboard/${userType}/${userId}`);
    } catch (error) {
      setError('Error fetching user data');
    }
  };
  

  // Ensure userData and userData.patients are not null before accessing
  const filteredPatients =userData?.patients?.filter((patient) =>
  patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())|| 
  patient.patientAge.toLowerCase().includes(searchTerm.toLowerCase()) 
  ) || [];

  const totalPatients = userData?.patients ? userData.patients.length : 0;

  return (
    <div className="h-screen py-6 pl-10 mt-4">
      <div className='grid grid-cols-3 ml-10 mb-10'>
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {totalPatients}
          <div className="text-white text-sm">Total Patients</div>
        </div>
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {/* Display Total Visits */}
        </div>
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {/* Display Total Nurses */}
        </div>
      </div>

      <div className="p-4 border rounded-lg bg-white flex-grow">
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
              // Handle Search
            }}
            className="bg-blue-500 rounded-md h-11 w-16 transition hover:bg-blue-600 ml-2"
          >
            <h1 className="text-center text-white">Search</h1>
          </button>
        </div>

        <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>
        {error && <p className="text-red-500">{error}</p>}
        <div className='p-4 bg-white'></div>
        <div className="flex flex-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {/* Check if filteredPatients is an array before mapping */}
          {filteredPatients.map((patient, index) => (
  <div key={index} className="p-2 m-2 border rounded-lg bg-white shadow-md w-full flex items-center justify-between">
    <div>
      <p className="text-primary text-md font-medium">Name: {patient.patientName}</p>
   
    </div>
    <button 
      className="toggle bg-blue-500 rounded-md mr-4 h-9 w-16 transition hover:bg-blue-600 ml-auto" 
      onClick={() => handleView(patient.patientId, 'patient')}>
      <p className='text-white'>View</p>
    </button>
  </div>
))}



        
        </div>
      </div>
    </div>
  );
}
