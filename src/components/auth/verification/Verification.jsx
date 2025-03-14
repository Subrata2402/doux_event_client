import React, { useState } from 'react';
import './Verification.scss';
import { Navigate, useLocation, useNavigate } from 'react-router-dom';
import { Button } from '@mui/material';
import customSnackBar from '../../snackbar/CustomSnackBar';
import apiServices from '../../../services/apiServices';
import Spinner from 'react-bootstrap/esm/Spinner';

function Verification() {
  const location = useLocation();
  const [otp, setOtp] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  let userEmail = null;
  if (location.state) {
    userEmail = location.state.email.split('@');
    userEmail[0] = userEmail[0].slice(0, 3) + '***';
    userEmail = userEmail.join('@');
  }

  /**
   * Verifies the user's email using the provided OTP.
   * 
   * This function sets the loading state to true, then attempts to verify the email
   * by calling the `apiServices.verifyEmail` method with the email and trimmed OTP.
   * If the verification is successful, it navigates the user to the sign-in page,
   * optionally redirecting to a specified path. It also displays a custom snackbar
   * message based on the response or error.
   * 
   * @async
   * @function verifyEmail
   * @returns {Promise<void>} A promise that resolves when the email verification process is complete.
   */
  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await apiServices.verifyEmail({ email: location.state.email, otp: otp.trim() });
      if (response.success) {
        navigate('/auth/signin', { state: { redirectTo: location.state?.redirectTo || '/' } });
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  return (
    <>
      {
        location.state && userEmail ?
          <div className="verification-wrapper">
            <div className="verification-container">
              <div className="verification-header">
                <h2>Email Verification</h2>
              </div>
              <hr />
              <div className="verification-content">
                <p className='m-0'>An OTP has been successfully sent to your email </p>
                <p className='fw-bold m-0'>{userEmail}</p>
              </div>
              <div className="otp-container">
                <input
                  type="tel"
                  name='otp'
                  value={otp}
                  onChange={(e) => setOtp(e.target.value)}
                />
              </div>
              <div className="submit-button">
                <Button
                  color="primary"
                  className={loading ? 'disabled' : ''}
                  onClick={verifyEmail}
                  disabled={loading}
                >
                  {loading ? <Spinner animation="border" size='sm' className='me-2' /> : ''}Verify
                </Button>
              </div>
            </div>
          </div>
          : <Navigate to='/auth/signup' />
      }
    </>
  )
}

export default Verification;