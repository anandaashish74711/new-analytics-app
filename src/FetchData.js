import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Profile from './components/Profile';



const FetchData = () => {
  const [patientData, setPatientData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:4000/api/v1/patientinfo/6564c248b30f32776ed6270a')
      .then(response => {
        setPatientData(response.data);
      })
      .catch(err => {
        setError(err.message || 'An error occurred');
      });
  }, []);

  return (
    <div>
      {error && <p>Error: {error}</p>}
      <Profile {...patientData} />
     
     
    </div>
  );
};

export default FetchData;
