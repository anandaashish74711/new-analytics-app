import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setloading } from '../../features/FetchapiSlice'; 
import { useState } from 'react';

export default function DoctorBody() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);

  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();

  console.log(userData);

  useEffect(() => {
    handleSearch(); // Call handleSearch initially to display all records
  }, [userData]); // Trigger the effect whenever userData changes

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

  const handleSearch = () => {
    const filterNurses = userData.nurses.filter(
      (nurse) =>
        nurse.nurseName.toLowerCase().includes(searchInput.toLowerCase()) ||
        nurse.nurseId.includes(searchInput)
    );

    const filterPatients = userData.patients.filter(
      (patient) =>
        patient.patientName.toLowerCase().includes(searchInput.toLowerCase()) ||
        patient.patientId.includes(searchInput) ||
        patient.nurseName.toLowerCase().includes(searchInput.toLowerCase())
    );

    setFilteredNurses(filterNurses);
    setFilteredPatients(filterPatients);
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  // Calculate the number of records for nurses and patients
  const totalNurses = userData.nurses.length;
  const totalPatients = userData.patients.length;

  return (
    <div style={{ backgroundColor: '#fff', color: '#008000', minHeight: '100vh' }}>
      <div className="flex flex-col md:flex-row">
   
  
 
    
    

 



      


 
</div>
        <div className="p-4 m-5 ">
          <div className="flex justify-between mb-4">
            
            <div className="bg-blue-200 p-2 rounded-lg h-52 w-52">
             <div >Nurses </div> 
              {totalNurses}
            </div>
            <div className="bg-yellow-200 p-2 rounded-lg w-52 h-52">
              <div>Patients</div>
               <div>{totalPatients}</div>
            </div>
            {/* Search input and button */}
            <div className="flex items-center">
              <input
                type="text"
                placeholder="Search..."
                value={searchInput}
                onChange={(e) => setSearchInput(e.target.value)}
                className="border-2 border-gray-300 rounded-l-md px-2 py-1 focus:outline-none"
              />
              <button onClick={handleSearch}className="bg-blue-500 rounded-md h-11 w-16 transition hover:bg-blue-600 ml-2">
              <h1 className="text-center text-white">Search</h1>
              </button>
            </div>
          </div>

          <h2 className="text-primary text-lg font-medium mb-4">Nurse List</h2>
          {userData.nurses &&
            userData.nurses.map((nurse, index) => (
              <div key={nurse._id} className={`p-2 m-2 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-light-green-600 transition-all duration-200 ease-in-out`}>
               <p className="text-primary text-sm font-medium">
              {nurse.nurseName}
                </p>

                <button
                  onClick={() => handleFetchData(nurse.nurseId, 'Nurse')}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  View
                </button>
              </div>
            ))}
          <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>
          {userData.patients &&
            userData.patients.map((patient, index) => (
              <div key={patient._id} className={`p-2 m-2 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-light-green-200 transition-all duration-200 ease-in-out`}>
                <p className="text-primary text-sm font-medium">
                  {patient.patientName}   
                  <span className="ml-2">{patient.nurseName}</span>
                </p>
                <button
                  onClick={() => handleFetchData(patient.patientId, 'Patient')}
                  className="bg-green-500 text-white p-2 rounded-md"
                >
                  View
                </button>
              </div>
            ))}
        </div>
      </div>
    
  );
}
