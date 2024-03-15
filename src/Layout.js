import React, { useState } from 'react';
import Sidebar from './components/Sidebar';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa'; // Correct import statement for FaBars

function Layout() {
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const toggleSidebarCompletely = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  return (
    <>
      <div className='grid grid-cols-7  bg-gray-100'>
        {/* Sidebar */}
        <div className='col-span-1'>
          <Sidebar 
            collapsed={sidebarCollapsed} 
            toggleSidebar={toggleSidebar} 
            toggleSidebarCompletely={toggleSidebarCompletely} 
          />
        </div>
        {/* Outlet */}
        <div className={sidebarCollapsed ? 'col-span-7' : 'col-span-6'}>
          {/* Button to toggle the sidebar completely */}
          <div 
            className="cursor-pointer absolute top-0 right-0 mr-4 mt-4" 
            onClick={toggleSidebarCompletely}
          >
            <FaBars className="text-blue" />
          </div>
          <Outlet/>
        </div>
      </div>
    </>
  );
}

export default Layout;
