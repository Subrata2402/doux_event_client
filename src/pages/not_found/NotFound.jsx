import { IconButton } from '@mui/material';
import React from 'react'
import { FaArrowCircleLeft } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import './NotFound.scss';

function NotFound() {
  return (
    <div className="not-found-wrapper">
      <h1 className='fw-bold text-center'>
        404 - Page Not Found
      </h1>
      <p className='fw-semibold mt-2 text-center'>
        The page you are looking for might have been removed, had its name changed or is temporarily unavailable.
      </p>
      <div className="home-back">
        <Link to='/'>
          <IconButton>
            <FaArrowCircleLeft size={30} color='var(--text-color)' />
          </IconButton>
        </Link>
        <p>Back to home</p>
      </div>
    </div>
  )
}

export default NotFound;