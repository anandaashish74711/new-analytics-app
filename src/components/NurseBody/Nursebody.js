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
    <div className="h-screen py-6 pl-10">
      <div className="grid grid-cols-3 pl-16">
        <div className="bg-blue-300 p-12 w-48 h-40 rounded-lg mb-4">
          <p className="text-primary text-lg font-medium">
            Total Nurses: <span className="ml-2">{totalNurses}</span>
          </p>
        </div>
        <div className="bg-yellow-300 p-12 w-48 h-40 rounded-lg mb-4">
          <p className="text-primary text-lg font-medium">
            Total Patients: <span className="ml-2">{totalPatients}</span>
          </p>
        </div>
        <div className="bg-blue-300 p-12 w-48 h-40 rounded-lg mb-4">
          <p className="text-primary text-lg font-medium">
            Total Patients: <span className="ml-2">{totalPatients}</span>
          </p>
        </div>
      </div>

      <div className="p-4 m-5 border rounded-lg bg-white flex-grow">
        <div className="mb-4 flex items-center justify-end">
          <input
            type="text"
            placeholder="Search..."
            value={searchInput}
            onChange={(e) => setSearchInput(e.target.value)}
            className="p-2 border rounded-md rounded-end focus:outline-none focus:ring focus:border-blue-300"
          />
          <button
            onClick={handleSearch}
            className="bg-blue-500 rounded-md h-11 w-16 transition hover:bg-blue-600 ml-2"
          >
            <h1 className="text-center text-white">Search</h1>
          </button>
        </div>

        <h2 className="text-primary text-lg font-medium mb-4">Nurse List</h2>

        <div className="flex flex-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredNurses.map((nurse) => (
            <div
              key={nurse._id}
              className="p-2 m-2 border rounded-lg bg-white shadow-md w-full cursor-pointer hover:bg-light-green-600 transition-all duration-200 ease-in-out"
            >
              <p className="text-primary text-md font-medium">{nurse.nurseName}</p>
              <button
                onClick={() => handleFetchData(nurse.nurseId, 'Nurse')}
                className="bg-green-500 text-white p-2 rounded-md mt-2"
              >
                View
              </button>
            </div>
          ))}
        </div>

        <h2 className="text-primary text-lg font-medium mb-4">Patient List</h2>

        <div className="flex flex-wrap" style={{ maxHeight: '300px', overflowY: 'auto' }}>
          {filteredPatients.map((patient) => (
            <div
              key={patient._id}
              className="p-2 m-2 border rounded-lg bg-white shadow-md w-full cursor-pointer hover:bg-light-green-200 transition-all duration-200 ease-in-out"
            >
              <p className="text-primary text-md font-medium">{patient.patientName}</p>
              <span className="ml-2">{patient.nurseName}</span>
              <button
                onClick={() => handleFetchData(patient.patientId, 'Patient')}
                className="bg-green-500 text-white p-2 rounded-md mt-2"
              >
                View
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
