import React from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setloading } from '../../features/FetchapiSlice'; 

export default function DoctorBody() {
  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log(userData);

  const handleFetchData = async (userID, role) => {
    dispatch(setloading(true)); 

    try {
      await dispatch(getUser({ userID, role }));
    } catch (error) {
      console.error('Error fetching user data:', error);
    } finally {
      dispatch(setloading(false)); 
    }
  };

  if (!userData) {
  
    return <p>Loading...</p>;
  }

  return (
    <div style={{ backgroundColor: '#001f3f', color: '#fff', minHeight: '100vh' }}>
      <div className="flex flex-col md:flex-row">
        <div className="bg-gray-200 rounded-lg shadow-md p-4 m-5 w-64">
          <div className="flex flex-col items-center">
       
            <div className="bg-gray-300 w-20 h-20 rounded-full mb-4"></div>
            <p className="text-primary text-lg font-medium mb-2">{userData.name}</p>
            <div className="grid grid-cols-2 gap-2 w-full">
              <div>
                <p className="text-gray-700 text-sm mb-2">Email:</p>
                <p className="text-primary text-lg font-medium">{userData.email}</p>
              </div>
             
            </div>
          </div>
        </div>
        </div>
        <div className="p-4 m-5 flex-1">
          <h2 className="text-primary text-lg font-medium mb-4">Nurse List</h2>
          {userData.nurses &&
            userData.nurses.map((nurse) => (
              <div key={nurse._id} className="p-2 m-2 border rounded-lg flex items-center justify-between">
                <p className="text-primary text-lg font-medium">
                  {nurse.nurseName} - Nurse ID: <span className="ml-2">{nurse.nurseId}</span>
                </p>
                <button
                  onClick={() => handleFetchData(nurse.nurseId, 'Nurse')}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Fetch Data
                </button>
              </div>
            ))}
          <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>
          {userData.patients &&
            userData.patients.map((patient) => (
              <div key={patient._id} className="p-2 m-2 border rounded-lg flex items-center justify-between">
                <p className="text-primary text-lg font-medium">
                  {patient.patientName} - Patient ID: <span className="ml-2">{patient.patientId}</span>
                  <span className="ml-2">{patient.nurseName}</span>
                </p>
                <button
                  onClick={() => handleFetchData(patient.patientId, 'Patient')}
                  className="bg-blue-500 text-white p-2 rounded-md"
                >
                  Fetch Data
                </button>
              </div>
            ))}
        </div>
      </div>
    
  );
}
