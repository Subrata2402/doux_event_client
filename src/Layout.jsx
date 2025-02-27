import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from './components/sidebar/SideBar';

function Layout() {

  return (
    <>
      <div className="layout">
        <SideBar />
        <Outlet />
      </div>
    </>
  )
}

export default Layout;