
import { useSelector } from 'react-redux';
import Header from './components/Header';

import Login from './Login/Login';

import { Outlet } from 'react-router-dom';

function Layout() {
  const auth = useSelector((state) => state.auth.user);
  const isLoggedIn = auth !== null;

  return (
    <div className="flex">
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <>
         
            <Header />
         
         
            <Outlet />
     
        </>
      )}
    </div>
  );
}

export default Layout;
