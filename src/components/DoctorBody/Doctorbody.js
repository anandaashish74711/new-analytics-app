import React, { useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function DoctorBody() {
  const navigate = useNavigate();
  const userData = useSelector((state) => state.auth.user);
  const [showNurses, setShowNurses] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');

  const toggleView = () => {
    setShowNurses((prevShowNurses) => !prevShowNurses);
  };

  const handleView = (userId, userType) => {
    navigate(`/dashboard/${userType}/${userId}`);
  };

  const filteredData = showNurses
    ? userData?.nurses?.filter((nurse) =>
        nurse.nurseName.toLowerCase().includes(searchTerm.toLowerCase())
      )
    : userData?.patients?.filter((patient) =>
        patient.patientName.toLowerCase().includes(searchTerm.toLowerCase())
      );

  return (
    
    <div className='ml-6'>
      <div className="grid grid-cols-3 m-6 mt-4 ml-20 ">
        {/* Total Nurses */}
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl   ">
          {userData?.nurses ? userData.nurses.length : 0} 
          <div className="text-white text-sm ">Total Nurses</div>
        </div>
        {/* Total Patients */}
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {userData?.patients ? userData.patients.length : 0} 
          <div className="text-white text-sm ">Total Patients</div>
        </div>
        {/* Other Data */}
        <div className="h-24 w-64 bg-blue-800 text-white ml-10 mt-10 text-center p-6 rounded-lg col-span-1 text-2xl">
          {userData?.patients ? userData.patients.length : 0} 
          <div className="text-white text-sm ">Total Patients</div>
        </div>
      </div>

      <div className="p-4 m-5 border rounded-lg bg-white flex-grow col-span-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            {/* Search Input */}
            <input
              type="text"
              placeholder="Search patients"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="p-2 border rounded-md rounded-end focus:outline-none focus:ring focus:border-blue-300"
            />
            {/* Search Button */}
            <button
              
              className="bg-blue-500 rounded-md h-11 w-16 transition hover:bg-blue-600 ml-2"
            >
              <h1 className="text-center text-white">Search</h1>
            </button>
          </div>
          {/* Toggle Button */}
          <button className="toggle bg-blue-500 rounded-md h-11 w-36 transition hover:bg-blue-600" onClick={toggleView}>
            <div className='text-white'>{showNurses ? 'Show Patients' : 'Show Nurses'}</div>
          </button>
        </div>
        {/* List of Nurses/Patients */}
        <h2 className="text-primary text-lg font-medium mb-4">{showNurses ? 'Nurse List' : 'Patient List'}</h2>
<div className="p-4 bg-white">
  <div className="flex-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
    {filteredData.map((data, index) => (
      <div key={index} className="p-2 m-2 border rounded-lg bg-white shadow-md w-full flex items-center justify-between">
        <p className="text-primary text-md font-medium">
          {showNurses ? data.nurseName : data.patientName}
        </p>
        {showNurses && data.patientName && (
          <p className="text-primary text-md font-medium">
            Assigned to: {data.patientName}
          </p>
        )}
        {!showNurses && data.nurseName && (
          <p className="text-primary text-md font-medium">
            {data.nurseName}
          </p>
        )}
        <button className="toggle bg-blue-500 rounded-md mr-4 h-9 w-16 transition hover:bg-blue-600 ml-auto" onClick={() => handleView(showNurses ? data.nurseId : data.patientId, showNurses ? 'nurse' : 'patient')}>
          <p className='text-white'>View</p>
        </button>
      </div>
    ))}
  </div>
</div>



  </div>
            
    </div>
  );
}
