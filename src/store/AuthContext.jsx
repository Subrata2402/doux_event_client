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

  /**
   * Fetches the profile details of the user.
   * 
   * This function makes an asynchronous call to the `profileDetails` API service.
   * If the response indicates success, it updates the state to reflect that the user is logged in
   * and sets the profile details with the data received from the response.
   * 
   * @async
   * @function fetchProfileDetails
   * @returns {Promise<void>} A promise that resolves when the profile details have been fetched and state has been updated.
   * @throws Will log an error to the console if the API call fails.
   */
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