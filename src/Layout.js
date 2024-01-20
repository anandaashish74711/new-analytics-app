import React from 'react';
import { useSelector } from 'react-redux';
import Header from './components/Header';
import Footer from './components/Footer';
import Login from './Login/Login';

import { Outlet } from 'react-router-dom';

function Layout() {
  const auth = useSelector((state) => state.auth.user);
  console.log(auth)
  const isLoggedIn = auth !== null; // Check if the user is logged in based on user information

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <>
          <Header />
          <Outlet />
          <Footer />
        </>
      )}
    </>
  );
}

export default Layout;
