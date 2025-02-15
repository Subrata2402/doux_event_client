import React, { useRef, useState } from 'react';
import { FaRegEyeSlash, FaRegUser, FaRegEye, FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineEmail } from "react-icons/md";
import { Button, IconButton } from '@mui/material';
import { Link, Outlet, redirect, useLocation, useNavigate } from 'react-router-dom';
import './SignUp.scss';
import customSnackBar from '../../snackbar/CustomSnackBar';
import apiServices from '../../../services/apiServices';
import Spinner from 'react-bootstrap/esm/Spinner';

function SignUp() {
  const [credentials, setCredentials] = useState({
    name: '',
    email: '',
    password: '',
    cpassword: '',
  });
  const [showPassword, setShowPassword] = useState(false);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const [loading, setLoading] = useState(false);
  const location = useLocation();

  /**
   * Handles the form submission for user registration.
   * Validates the input fields and sends the registration request to the server.
   * Displays appropriate messages based on the response.
   * 
   * @async
   * @function handleSubmit
   * @returns {void}
   */
  const handleSubmit = async () => {
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword) {
      return customSnackBar('All fields are required');
    }
    setLoading(true);
    try {
      const response = await apiServices.register(credentials);
      if (response.success) {
        navigate('/auth/signup/verification', { state: { email: credentials.email, redirectTo: location.state?.redirectTo || '/' } });
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  };

  if (pathname === '/auth/signup/verification') {
    return <Outlet />;
  }

  return (
    <div className="signup-wrapper">
      <div className="signup-container">
        <div className="signup-header">
          <h2>Create Account</h2>
        </div>
        <div className="signup-form">
          <div className="group-input">
            <div className="input-label">
              <FaRegUser size={'1.2rem'} />
              <label htmlFor='name'>Name</label>
            </div>
            <div className="input-field">
              <input
                id='name'
                name='name'
                type="name"
                placeholder="Enter your name"
                value={credentials.name}
                onChange={(e) => setCredentials({ ...credentials, name: e.target.value })}
              />
              <IconButton className='visibility-hidden'>
                <MdOutlineEmail size={'1.5rem'} />
              </IconButton>
            </div>
          </div>
          <div className="group-input">
            <div className="input-label">
              <MdOutlineEmail size={'1.5rem'} />
              <label htmlFor='email'>Email</label>
            </div>
            <div className="input-field">
              <input
                id='email'
                name='email'
                type="email"
                placeholder="Enter your email"
                value={credentials.email}
                onChange={(e) => setCredentials({ ...credentials, email: e.target.value })}
              />
              <IconButton className='visibility-hidden'>
                <MdOutlineEmail size={'1.5rem'} />
              </IconButton>
            </div>
          </div>
          <div className="group-input">
            <div className="input-label">
              <MdOutlinePassword size={'1.2rem'} />
              <label htmlFor='password'>Password</label>
            </div>
            <div className="input-field">
              <input
                id='password'
                name='password'
                type='password'
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
              />
              <IconButton onClick={() => setShowPassword(!showPassword)} className='visibility-hidden'>
                {
                  showPassword ?
                    <FaRegEyeSlash size={'1.5rem'} color='var(--text-color)' />
                    : <FaRegEye size={'1.5rem'} color='var(--text-color)' />
                }
              </IconButton>
            </div>
          </div>
          <div className="group-input">
            <div className="input-label">
              <MdOutlinePassword size={'1.2rem'} />
              <label htmlFor='cpassword'>Confirm Password</label>
            </div>
            <div className="input-field">
              <input
                id='cpassword'
                name='cpassword'
                type={showPassword ? 'text' : 'password'}
                ref={passwordInput}
                placeholder="Enter your password again"
                value={credentials.cpassword}
                onChange={(e) => setCredentials({ ...credentials, cpassword: e.target.value })}
              />
              <IconButton onClick={() => setShowPassword(!showPassword)}>
                {
                  showPassword ?
                    <FaRegEyeSlash size={'1.5rem'} color='var(--text-color)' />
                    : <FaRegEye size={'1.5rem'} color='var(--text-color)' />
                }
              </IconButton>
            </div>
          </div>
          <Button
            variant='contained'
            className='submit-button'
            onClick={handleSubmit}
          >
            {loading ? <Spinner animation="border" size='sm' className='me-2' /> : ''}Sign Up
          </Button>
          <div className="signup-link">
            Already have an account? <Link to='/auth/signin'>Sign In</Link>
          </div>
        </div>
      </div>
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

export default SignUp;