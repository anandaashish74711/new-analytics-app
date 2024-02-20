  import { useSelector ,useDispatch} from 'react-redux';
  import Header from './components/Header';
  import Login from './Login/Login';
  import { Outlet } from 'react-router-dom';
  import React, { useEffect } from 'react';
  import { useNavigate } from 'react-router-dom';

  function Layout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth.user);
    const isLoggedIn = auth !== null;

    useEffect(() => {
      if (isLoggedIn) {
        const { _id: userID, role: userRole } = auth;
        const url = `/${userRole.toLowerCase()}/${userID}`;
        navigate(url);
      }
    }, [isLoggedIn, auth, navigate]);

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




  
  