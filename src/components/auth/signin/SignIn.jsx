import React, { useRef, useState } from 'react';
import './SignIn.scss';
import { FaRegEyeSlash, FaRegUser, FaRegEye, FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineEmail } from "react-icons/md";
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import { useAuth } from '../../../store/AuthContext';

function SignIn() {
  const { storeToken, setProfileDetails } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  // const [loading, setLoading] = useState(false);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleSubmit = async (isGuest) => {
    let response;
    try {
      if (isGuest) {
        response = await apiServices.guestLogin(credentials);
      } else {
        response = await apiServices.login(credentials);
      }
      if (response.success) {
        navigate('/');
        storeToken(response.data?.accessToken);
        setProfileDetails(response.data?.user);
        customSnackBar(response.message);
      } else {
        if (response.message === 'Email not verified') {
          navigate('/auth/signup/verification', { state: { email: credentials.email } });
          customSnackBar('Please verify your email to login');
        } else {
          customSnackBar(response.message);
        }
      }
    } catch (error) {
      customSnackBar(error.message);
    }
  };

  if (pathname === '/auth/signin/forgot-password') {
    return <Outlet />;
  }

  return (
    <div className="signin-wrapper">
      <div className="signin-container">
        <div className="signin-header">
          <h2>Welcome!</h2>
        </div>
        <div className="signin-form">
          <div className="group-input">
            <div className="input-label">
              <FaRegUser size={'1.2rem'} />
              <label htmlFor='email'>Username</label>
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
              <IconButton>
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
                type={showPassword ? 'text' : 'password'}
                ref={passwordInput}
                placeholder="Enter your password"
                value={credentials.password}
                onChange={(e) => setCredentials({ ...credentials, password: e.target.value })}
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
          <div className="rf-section">
            <FormControlLabel
              control={
                <Checkbox
                  name="remember-me"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              }
              label="Remember me"
            />
            <Link to='/auth/signin/forgot-password'>
              <Button>
                Forgot Password?
              </Button>
            </Link>
          </div>
          <Button
            variant='contained'
            className='submit-button'
            onClick={() => handleSubmit(false)}
          >
            Login
          </Button>
          <div className="or-divider">
            <div className="divider"></div>
            <div className="or-text">OR</div>
            <div className="divider"></div>
          </div>
          <Button
            variant='contained'
            className='submit-button'
            onClick={() => handleSubmit(true)}
          >
            Guest Login
          </Button>
          <div className="signup-link">
            Don't have an account? <Link to='/auth/signup'>Sign Up</Link>
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

export default SignIn;