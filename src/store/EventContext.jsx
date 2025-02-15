import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import apiServices from "../services/apiServices";
import socket from "../services/socketService";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);

  /**
   * Fetches the list of events from the API and updates the state with the retrieved data.
   * 
   * @async
   * @function getEvents
   * @returns {Promise<Array>} The list of events retrieved from the API.
   * @throws Will log an error message to the console if the API request fails.
   */
  const getEvents = async () => {
    try {
      const response = await apiServices.eventList();
      setEvents(response.data);
      return response.data;
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getEvents().then(() => setLoading(false));
  }, []);

  return (
    <EventContext.Provider value={{
      events,
      getEvents
    }}>
      {loading ? <Loader /> : children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};

export default EventProvider;