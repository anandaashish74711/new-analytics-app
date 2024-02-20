
  import Header from './components/Header';
 
  import { Outlet } from 'react-router-dom';
  
 

  function Layout() {


    return (
      <>
        
       
          <div className='grid grid-cols-7 '>
            <div className='col-span-1'>
              <Header />
            </div>
            <div className='col-span-6'>
              <Outlet/>
            </div>
          </div>
        
      </>
    );
  }

  export default Layout;




  
  