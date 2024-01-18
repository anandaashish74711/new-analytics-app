import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { Routes, Route, useNavigate } from 'react-router-dom'; // Import useNavigate
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/Body';
import './index.css';

function App() {
  
  const auth = useSelector((state) => state.auth.user);
  const navigate = useNavigate(); // Initialize the useNavigate hook


  const userID = auth ? auth._id : null;

 
  useEffect(() => {
    if (auth) {
      navigate(`/userinfo/${userID}`);
    }
  }, [ userID, navigate]);

  return (
    <Routes>
      <Route path="/" element={<Layout />} />
      <Route path="/login" element={<Login />} />
      <Route path={`/userinfo/:${userID}`} element={<Body />} />
    </Routes>
  );
}

export default App;
