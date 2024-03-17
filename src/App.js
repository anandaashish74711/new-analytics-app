import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/PatientBody/Body';
import NurseBody from './components/NurseBody/Nursebody';
import DoctorBody from './components/DoctorBody/Doctorbody';
import { useSelector } from 'react-redux'; // Corrected import
import Report from './components/PatientBody/report/report';
import './index.css';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/dashboard" element={<Layout isLoggedIn={isLoggedIn} />}>
        <Route path="doctor/:userID" element={<DoctorBody />} />
        <Route path="doctor/patient/:userID" element={<Body/>} />
        <Route path="nurse/patient/:userID" element={<Body/>} />
        <Route path="nurse/:userID" element={<NurseBody />} />
        <Route path="doctor/nurse/:userID" element={<NurseBody />} />
        <Route path="patient/:userID" element={<Body />} />
        <Route path="patient/:userID/report" element={<Report />} />
    
        
      </Route>
    </Routes>
  );
}

export default App;
