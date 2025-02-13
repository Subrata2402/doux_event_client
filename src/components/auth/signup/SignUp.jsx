import React, { useRef, useState } from 'react';
import { FaRegEyeSlash, FaRegUser, FaRegEye, FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineEmail } from "react-icons/md";
import { Button, IconButton } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import './SignUp.scss';
import customSnackBar from '../../snackbar/CustomSnackBar';
import apiServices from '../../../services/apiServices';

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

  const handleSubmit = async () => {
    if (!credentials.name || !credentials.email || !credentials.password || !credentials.cpassword) {
      return customSnackBar('All fields are required');
    }
    console.log(credentials);
    try {
      const response = await apiServices.register(credentials);
      if (response.success) {
        navigate('/auth/signup/verification', { state: { email: credentials.email } });
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
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
                    <FaRegEyeSlash size={'1.5rem'} />
                    : <FaRegEye size={'1.5rem'} />
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
                    <FaRegEyeSlash size={'1.5rem'} />
                    : <FaRegEye size={'1.5rem'} />
                }
              </IconButton>
            </div>
          </div>
          <Button
            variant='contained'
            className='submit-button'
            onClick={handleSubmit}
          >
            Sign Up
          </Button>
          <div className="signup-link">
            Already have an account? <Link to='/auth/signup'>Sign In</Link>
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