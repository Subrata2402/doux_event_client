import React from 'react'
import { useAuth } from '../store/AuthContext';
import { Navigate, Outlet, useLocation } from 'react-router-dom';

const ProtectedRoute = () => {
    const { isLoggedIn, profileDetails } = useAuth();
    const { pathname } = useLocation();
    // const { eventId } = useParams();

    if (!isLoggedIn) {
        // If the user is not logged in, redirect to the login page
        return <Navigate to="/auth/signin" replace state={{ redirectTo: pathname }} />;
    }

    if (profileDetails?.isGuest) {
        
        // If the user is a guest, redirect to the home page
        return <Navigate to="/" />;
    }

    return <Outlet />;
}

export default ProtectedRoute;