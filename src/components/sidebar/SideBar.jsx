import React, { useState } from 'react';
import './SideBar.scss';
import { PiSignInBold } from "react-icons/pi";
import { GoHome } from "react-icons/go";
import { GoHomeFill } from "react-icons/go";
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { MdLightMode, MdDarkMode, MdLogout } from "react-icons/md";
import { useTheme } from '../../store/ThemeContext';
import { IconButton, Tooltip } from '@mui/material';
import { useAuth } from '../../store/AuthContext';
import Confirmation from '../Confirmation';
import customSnackBar from '../snackbar/CustomSnackBar';
import { IoMdAddCircleOutline } from "react-icons/io";
import { IoMdAddCircle } from "react-icons/io";

function SideBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { profileDetails, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth/signin');
    customSnackBar('Logged out successfully');
  };

  return (
    <div className='sidebar-wrapper'>
      <div className="ai-header">
        <img src="event-logo.png" alt="logo" />
        <h4 className="title m-0">Doux Event</h4>
      </div>
      <div className="devider"></div>
      <div className="sidebar-items">
        <Link
          className={`sidebar-item ${(location.pathname === '/' || location.pathname === '/add-notes' ? 'active' : '')}`}
          to='/'
        >
          {
            location.pathname === '/' || location.pathname === '/add-notes'
              ? <GoHomeFill color='var(--nav-item-color)' className='icon' />
              : <GoHome color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            Home
          </div>
        </Link>
        {
          !profileDetails.isGuest &&
          <Link
            className={`sidebar-item ${(location.pathname === '/create-event' ? 'active' : '')}`}
            to='/create-event'
          >
            {
              location.pathname === '/create-event'
                ?
                <IoMdAddCircle color='var(--nav-item-color)' className='icon' />
                : <IoMdAddCircleOutline color='var(--nav-item-color)' className='icon' />
            }
            <div className="text">
              Create Event
            </div>
          </Link>
        }
        <div className="devider"></div>
        <div className="sidebar-item" onClick={toggleTheme}>
          {
            theme === 'dark'
              ? <MdDarkMode color='var(--nav-item-color)' className='icon' />
              : <MdLightMode color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            {theme === 'dark' ? 'Dark Mode' : 'Light Mode'}
          </div>
        </div>
      </div>
      <div className="profile-section">
        {
          isLoggedIn ?
            <>
              <div className="profile-avatar">{profileDetails.name[0]}</div>
              <div className="profile-name">{profileDetails.name}</div>
              <div className="arrow-icon">
                <Tooltip title='Logout' placement='top'>
                  <IconButton onClick={() => setShowModal(true)}>
                    <MdLogout color='var(--nav-item-color)' />
                  </IconButton>
                </Tooltip>
              </div>
              <Confirmation
                show={showModal}
                handleClose={() => setShowModal(false)}
                onConfirm={handleLogout}
                title='Logout'
                message='Are you sure you want to logout?'
              />
            </>
            :
            <>
              <Link to='/auth/signin' className='d-flex align-items-center gap-2 w-100'>
                <Tooltip title='Login' placement='top'>
                  <IconButton>
                    <PiSignInBold color='var(--nav-item-color)' />
                  </IconButton>
                </Tooltip>
                <div className="profile-name">Login</div>
              </Link>
            </>
        }
      </div>
    </div>
  )
};

export default SideBar;