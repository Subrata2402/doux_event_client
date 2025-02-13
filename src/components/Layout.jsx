import React from 'react';
import SideBar from './sidebar/SideBar';
import { Outlet } from 'react-router-dom';

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