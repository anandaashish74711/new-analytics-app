// App.js
import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/PatientBody/Body';
import NurseBody from './components/NurseBody/Nursebody';
import DoctorBody from './components/DoctorBody/Doctorbody';

import './index.css';
import { useSelector } from 'react-redux';

function App() {
  const user = useSelector((state) => state.auth.user);
  const role = user?.role;
  const userID = user?._id;

  console.log(role);

  const GetRouteForRole = (role) => {
    switch (role) {
      case 'Patient':
        return <Route path="/userinfo/:userID" element={<Body />} />;
      case 'Nurse':
        return <Route path="/userinfo/:userID" element={<NurseBody />} />;
      case 'Doctor':
        return <Route path="/userinfo/:userID" element={<DoctorBody />} />;
      default:
        return <Route path="*" element={<Login />} />;
    }
  };

  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="/login" element={<Login />} />
        {GetRouteForRole(role)}
      </Route>
    </Routes>
  );
}

export default App;
