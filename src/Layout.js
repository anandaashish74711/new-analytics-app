import { useSelector } from 'react-redux';
import Header from './components/Header';
import Login from './Login/Login';
import { Outlet } from 'react-router-dom';

function Layout() {
  const auth = useSelector((state) => state.auth.user);
  const isLoggedIn = auth !== null;

  return (
    <>
      {!isLoggedIn && <Login />}
      {isLoggedIn && (
        <div className='grid grid-cols-7 '>
          <div className='col-span-1'>
            <Header />
          </div>
          <div className='col-span-6'>
            <Outlet/>
          </div>
        </div>
      )}
    </>
  );
}

export default Layout;
