import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import apiServices from "../services/apiServices";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [profileDetails, setProfileDetails] = useState({});

  const storeToken = (token) => {
    localStorage.setItem('token', token);
    setIsLoggedIn(true);
  }

  const fetchProfileDetails = async () => {
    try {
      const response = await apiServices.profileDetails();
      setIsLoggedIn(response.success);
      if (response.success) {
        setProfileDetails(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
      fetchProfileDetails().then(() => setLoading(false));
  }, []);

  return (
    <AuthContext.Provider value={{
      storeToken,
      isLoggedIn,
      setIsLoggedIn,
      profileDetails,
      setProfileDetails
    }}>
      {loading ? <Loader /> : children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthProvider;