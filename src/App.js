import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { Routes, Route, useNavigate } from 'react-router-dom'; 
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/Body';
import './index.css';

function App() {
  
  const auth = useSelector((state) => state.auth.user);
   


  const userID = auth ? auth._id : null;

 


  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path={`/userinfo/:${userID}`} element={<Body />} />
    </Routes>
  );
}

export default App;
