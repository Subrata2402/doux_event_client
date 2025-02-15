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
import StyledMenu from '../menu/StyledMenu';

function SideBar() {
  const location = useLocation();
  const { theme, toggleTheme } = useTheme();
  const { profileDetails, isLoggedIn, setIsLoggedIn } = useAuth();
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const [menuList, setMenuList] = useState([
    { text: 'Logout', icon: <MdLogout color='var(--text-color)' size={20} /> }
  ]);

  /**
   * Handles the user logout process.
   * 
   * This function performs the following actions:
   * 1. Removes the authentication token from local storage.
   * 2. Updates the state to indicate the user is logged out.
   * 3. Navigates the user to the sign-in page.
   * 4. Displays a snackbar notification indicating successful logout.
   * 5. Closes any open dialogs or menus.
   */
  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/auth/signin');
    customSnackBar('Logged out successfully');
    handleClose();
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
        <Link
          className={`sidebar-item ${(location.pathname === '/create-event' ? 'active' : '')}`}
          to='/create-event'
          onClick={() => profileDetails.isGuest && customSnackBar('Guest users are not allowed to create events')}
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
              <div className="profile-avatar" onClick={handleClick}>{profileDetails.name[0]}</div>
              <StyledMenu
                anchorEl={anchorEl}
                open={open}
                onClose={handleClose}
                onClick={handleClose}
                id="sort-menu"
                menuList={menuList}
                onMenuItemClick={() => setShowModal(true)}
                width="15rem"
              />
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