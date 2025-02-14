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

  const verifyEmail = async () => {
    setLoading(true);
    try {
      const response = await apiServices.verifyEmail({ email: location.state.email, otp: otp.trim() });
      if (response.success) {
        navigate('/auth/signin');
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
                <Button color="primary" onClick={verifyEmail} disabled={loading}>
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