import React, { useRef, useState } from 'react';
import './SignIn.scss';
import { FaRegEyeSlash, FaRegUser, FaRegEye, FaArrowCircleLeft } from "react-icons/fa";
import { MdOutlinePassword, MdOutlineEmail } from "react-icons/md";
import { Button, Checkbox, FormControlLabel, IconButton } from '@mui/material';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import { useAuth } from '../../../store/AuthContext';
import Spinner from 'react-bootstrap/esm/Spinner';

function SignIn() {
  const { storeToken, setProfileDetails } = useAuth();
  const [credentials, setCredentials] = useState({
    email: '',
    password: ''
  });
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loadingl, setLoadingl] = useState(false);
  const [loadingg, setLoadingg] = useState(false);
  const passwordInput = useRef(null);
  const navigate = useNavigate();
  const { state, pathname } = useLocation();

  /**
   * Handles the submission of the sign-in form.
   * 
   * @param {boolean} isGuest - Indicates whether the user is signing in as a guest.
   * @returns {Promise<void>} - A promise that resolves when the sign-in process is complete.
   * 
   * @throws {Error} - Throws an error if the sign-in process fails.
   */
  const handleSubmit = async (isGuest) => {
    let response;
    try {
      if (isGuest) {
        setLoadingg(true);
        response = await apiServices.guestLogin(credentials);
      } else {
        setLoadingl(true);
        response = await apiServices.login(credentials);
      }
      if (response.success) {
        navigate('/');
        storeToken(response.data?.accessToken, rememberMe);
        setProfileDetails(response.data?.user);
        customSnackBar(response.message);
      } else {
        if (response.message === 'Email not verified') {
          navigate('/auth/signup/verification', { state: { email: credentials.email, redirectTo: state?.redirectTo || '/' } });
          customSnackBar('Please verify your email to login');
        } else {
          customSnackBar(response.message);
        }
      }
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoadingl(false);
    setLoadingg(false);
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
                <MdOutlineEmail size={'1.5rem'} color='var(--text-color)' />
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
                    <FaRegEyeSlash size={'1.5rem'} color='var(--text-color)' />
                    : <FaRegEye size={'1.5rem'} color='var(--text-color)' />
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
          <div className="buttons">
            <Button
              variant='contained'
              className='submit-button'
              disabled={loadingl || loadingg}
              onClick={() => handleSubmit(false)}
            >
              {loadingl ? <Spinner animation="border" size='sm' className='me-2' /> : ''}Login
            </Button>
            <div className="or-divider">
              <div className="divider"></div>
              <div className="or-text">OR</div>
              <div className="divider"></div>
            </div>
            <Button
              variant='contained'
              className='submit-button'
              disabled={loadingl || loadingg}
              onClick={() => handleSubmit(true)}
            >
              {loadingg ? <Spinner animation="border" size='sm' className='me-2' /> : ''}Guest Login
            </Button>
          </div>
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