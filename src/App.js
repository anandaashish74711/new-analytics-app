import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/PatientBody/Body';
import NurseBody from './components/NurseBody/Nursebody';
import DoctorBody from './components/DoctorBody/Doctorbody';

import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Login />} />
      <Route path="/login" element={<Login />} />
      <Route path="/layout" element={<Layout />}/>
        <Route path="doctor/:userID" element={<DoctorBody />} />
        <Route path="nurse/:userID" element={<NurseBody />} />
        <Route path="patient/:userID" element={<Body />} />
      
    </Routes>
  );
}

export default App;
