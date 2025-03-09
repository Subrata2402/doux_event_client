import React, { useRef, useState } from 'react';
import './ForgotPassword.scss';
import { Button, IconButton } from '@mui/material';
import { MdEdit } from 'react-icons/md';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [wrapper, setWrapper] = useState('forgot');
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [password, setPassword] = useState('');
  const [cpassword, setCPassword] = useState('');
  const [resend, setResend] = useState(false);
  const [timer, setTimer] = useState(30);
  const [loading, setLoading] = useState(false);
  const [loadingr, setLoadingr] = useState(false);
  const intervalId = useRef(null);
  const navigate = useNavigate();

  /**
   * Handles the submission of the form.
   * Sets the loading state to true, sends a request to the API, and handles the response.
   * If the request is successful, updates the wrapper state and shows a success message.
   * If the request fails, shows an error message.
   * Finally, sets the loading state to false.
   * 
   * @async
   * @function handleSubmit
   * @returns {Promise<void>}
   */
  const handleSubmit = async () => {
    setLoading(true);
    if (wrapper === 'verify') {
      const response = await apiServices.verifyEmail({ email, otp });
      if (response.success) {
        setWrapper('reset');
      } else {
        customSnackBar(response.message);
      }
    } else if (wrapper === 'reset') {
      if (password !== cpassword) {
        setLoading(false);
        return customSnackBar('Passwords do not match');
      }
      const response = await apiServices.resetPassword({ email, password, cpassword });
      if (response.success) {
        navigate('/auth/signin');
        customSnackBar(response.message);
      } else {
        customSnackBar(response.message);
      }
    } else {
      const response = await apiServices.sendOtp({ email });
      if (response.success) {
        setWrapper('verify');
        startTimer();
        customSnackBar(response.message);
      } else {
        customSnackBar(response.message);
      }
    }
    setLoading(false);
  }

  /**
   * Starts a countdown timer for 30 seconds.
   * Disables the resend button and updates the timer state every second.
   * After 31 seconds, clears the interval and enables the resend button.
   */
  const startTimer = () => {
    setResend(false);
    setTimer(30);
    intervalId.current = setInterval(() => {
      setTimer((prev) => prev - 1);
    }, 1000);
    setTimeout(() => {
      clearInterval(intervalId.current);
      setResend(true);
    }, 31000);
  }

  /**
   * Stops the timer by clearing the interval using the stored interval ID.
   */
  const stopTimer = () => {
    clearInterval(intervalId.current);
  }

  /**
   * Handles the resend OTP action.
   * Sets the loading state to true, sends an OTP request, and handles the response.
   * If the request is successful, starts the timer and shows a success message.
   * If the request fails, shows an error message.
   * Finally, sets the loading state to false.
   * 
   * @async
   * @function handleResend
   * @returns {Promise<void>}
   */
  const handleResend = async () => {
    setLoadingr(true);
    const response = await apiServices.sendOtp({ email });
    if (response.success) {
      startTimer();
      customSnackBar(response.message);
    } else {
      customSnackBar(response.message);
    }
    setLoadingr(false);
  }

  /**
   * Handles the action to edit the email.
   * Sets the wrapper state to 'forgot' and stops the timer.
   */
  const editEmail = () => {
    setWrapper('forgot');
    stopTimer();
  }

  return (
    <div className="fp-wrapper">
      <div className="fp-container">
        <div className="fp-header">
          <h2>
            {
              wrapper === 'verify' ? 'Verify Email' :
                wrapper === 'reset' ? 'Reset Password' :
                  'Forgot Password'
            }
          </h2>
        </div>
        <hr />
        <div className="fp-content">
          {
            wrapper === 'verify' ?
              <p className='m-0'>An OTP has been successfully sent to your email</p> :
              wrapper === 'forgot' ?
                <p className='m-0'>Enter your email to forgot your password:</p> :
                null
          }
          {
            wrapper === 'verify' ?
              <p className='fw-bold m-0'>
                {email}
                <IconButton onClick={editEmail}>
                  <MdEdit size={15} color='var(--text-color)' />
                </IconButton>
              </p> :
              null
          }
          {
            wrapper === 'verify' ?
              <input
                type="text"
                placeholder="Enter the OTP"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
              /> :
              (wrapper === 'reset' ?
                <input
                  type="password"
                  placeholder="Enter new password"
                  className='mt-0'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                /> :
                <input
                  type="text"
                  placeholder="Enter your email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              )
          }
          {
            wrapper === 'reset' ?
              <input
                type="password"
                placeholder="Confirm password"
                className='mt-0'
                value={cpassword}
                onChange={(e) => setCPassword(e.target.value)}
              /> :
              null
          }
          {
            wrapper === 'verify' ?
              <div className="d-flex justify-content-between align-items-center mb-3">
                <p className='m-0'>Didn't receive the OTP?
                  <span> 00:{`${timer < 10 ? '0' + timer : timer}`}</span>
                </p>
                <Button
                  color="primary"
                  className={`resend-button ${resend ? '' : 'disabled'} ${loadingr ? 'disabled' : ''}`}
                  disabled={!resend}
                  onClick={handleResend}
                >
                  {loadingr ? <Spinner animation="border" size='sm' className='me-2' /> : ''}
                  Resend
                </Button>
              </div> :
              null
          }
          <Button
            variant="contained"
            color="primary"
            className={`submit-button ${loading ? 'disabled' : ''}`}
            onClick={handleSubmit} disabled={loading}
          >
            {loading ? <Spinner animation="border" size='sm' className='me-2' /> : ''}
            {
              wrapper === 'verify' ? 'Verify OTP' :
                wrapper === 'reset' ? 'Reset Password' :
                  'Send OTP'
            }
          </Button>
        </div>
      </div>
    </div>
  )
}

export default ForgotPassword;