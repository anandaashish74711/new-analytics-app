// App.js
import React from 'react';
import { Routes, Route } from 'react-router-dom'; 
import Layout from './Layout';
import Login from './Login/Login';
import Body from './components/Body';
import './index.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />} >
      <Route path="/login" element={<Login />} />
      <Route path="/userinfo/:userID" element={<Body />} />
      </Route>
    </Routes>
  );
}

export default App;
