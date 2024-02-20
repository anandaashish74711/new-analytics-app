import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/PatientBody/Body';
import NurseBody from './components/NurseBody/Nursebody';
import DoctorBody from './components/DoctorBody/Doctorbody';
import { useSelector } from 'react-redux'; // Corrected import
import './index.css';

function App() {
  const isLoggedIn = useSelector((state) => state.auth.isLoggedIn);

  return (
    <Routes>
    <Route path="/" element={<Login />} />
    <Route path="/login" element={<Login />} />
    <Route path="/layout" element={<Layout isLoggedIn={isLoggedIn} />} >
      <Route path="doctor/:userID" element={<DoctorBody />} />
      <Route path="nurse/:userID" element={<NurseBody />} />
      <Route path="patient/:userID" element={<Body />} />
    </Route>
  </Routes>
  
  );
}

export default App;
