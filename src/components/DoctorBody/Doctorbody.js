import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { getUser, setloading } from '../../features/FetchapiSlice';

export default function DoctorBody() {
  const [searchInput, setSearchInput] = useState('');
  const [filteredNurses, setFilteredNurses] = useState([]);
  const [filteredPatients, setFilteredPatients] = useState([]);
  const [displayPatients, setDisplayPatients] = useState(true); // State to toggle between patient and nurse list

  const userData = useSelector((state) => state.auth.user);
  const dispatch = useDispatch();



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
    if (searchInput === '') {
    
      setFilteredNurses(userData.nurses);
      setFilteredPatients(userData.patients);
    } else {
      // Filter based on search input
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
    }
  };

  if (!userData) {
    return <p>Loading...</p>;
  }

  // Calculate the number of records for nurses and patients
  const totalNurses = userData.nurses.length;
  const totalPatients = userData.patients.length;

  return (
    <div className="flex flex-row h-screen overflow-hidden">
      {/* Sidebar */}
      <div className="">
        {/* Sidebar content */}
      </div>

      {/* Main content */}
      <div className="flex-grow bg-white">
        <div className="p-4 m-5 ">
          <div className="flex justify-between mb-4">
            <div className="bg-yellow-200 p-2 rounded-lg w-52 h-52">
              <div>Patients</div>
              <div>{totalPatients}</div>
            </div>
            <div className="bg-blue-200 p-2 rounded-lg h-52 w-52">
              <div>Nurses</div>
              {totalNurses}
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
              <button
                onClick={handleSearch}
                className="bg-blue-500 rounded-r-md h-11 px-4 text-white hover:bg-blue-600 transition"
              >
                Search
              </button>
            </div>
          </div>

          {/* Toggle button */}
          <div className="mb-4">
            <button
              onClick={() => setDisplayPatients(!displayPatients)}
              className="bg-gray-300 px-4 py-2 rounded-md"
            >
              {displayPatients ? 'Show Nurses' : 'Show Patients'}
            </button>
          </div>

          {/* List */}
          <div className="max-h-screen overflow-y-auto">
            <h2 className="text-primary text-lg font-medium mb-4">
              {displayPatients ? 'Patient List' : 'Nurse List'}
            </h2>
            {displayPatients ? (
              <div>
                {filteredPatients &&
                  filteredPatients.map((patient, index) => (
                    <div
                      key={patient._id}
                      className={`p-2 m-2 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-light-green-200 transition-all duration-200 ease-in-out`}
                    >
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
            ) : (
              <div>
                {filteredNurses &&
                  filteredNurses.map((nurse, index) => (
                    <div
                      key={nurse._id}
                      className={`p-2 m-2 border rounded-lg flex items-center justify-between cursor-pointer hover:bg-light-green-600 transition-all duration-200 ease-in-out`}
                    >
                      <p className="text-primary text-sm font-medium">{nurse.nurseName}</p>
                      <button
                        onClick={() => handleFetchData(nurse.nurseId, 'Nurse')}
                        className="bg-green-500 text-white p-2 rounded-md"
                      >
                        View
                      </button>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
