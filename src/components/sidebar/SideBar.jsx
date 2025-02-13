import React, { useState } from 'react';
import './SideBar.scss';
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
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
        {/* <Link
          className={`sidebar-item ${(location.pathname === '/favourites' ? 'active' : '')}`}
          to='/favourites'
        >
          {
            location.pathname === '/favourites'
              ?
              <FaStar color='var(--nav-item-color)' className='icon' />
              : <FaRegStar color='var(--nav-item-color)' className='icon' />
          }
          <div className="text">
            Favourites
          </div>
        </Link> */}
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