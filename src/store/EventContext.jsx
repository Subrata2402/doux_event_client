import { createContext, useContext, useEffect, useState } from "react";
import Loader from "../components/loader/Loader";
import apiServices from "../services/apiServices";
import { useAuth } from "./AuthContext";
import customSnackBar from "../components/snackbar/CustomSnackBar";
import socket from "../services/socketService";

export const EventContext = createContext();

const EventProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [events, setEvents] = useState([]);
  const { isLoggedIn, profileDetails } = useAuth();

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

  /**
   * Handles the logic for a user to join an event.
   * 
   * @async
   * @function joinEvent
   * @returns {Promise<void>}
   * 
   * @throws Will display a snackbar message if the user is not logged in or if the user is the organizer of the event.
   * 
   * @description
   * - If the user is not logged in, a snackbar message will prompt the user to login.
   * - If the user is the organizer of the event, a snackbar message will inform the user that they cannot join their own event.
   * - Sets loading state to true while the request is being processed.
   * - Sends a request to join the event using the event ID.
   * - If the request is successful, updates the events list and emits an 'update-event' socket event.
   * - Displays a snackbar message with the response message from the server.
   * - Sets loading state to false after the request is processed.
   */
  const joinEvent = async (event, setLoading) => {
    if (!isLoggedIn) {
      return customSnackBar('Please login to join the event');
    }
    setLoading(true);
    try {
      const response = await apiServices.joinEvent(event?._id);
      if (response.success) {
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  /**
   * Asynchronously handles the process of leaving an event.
   * 
   * This function sets the loading state to true, attempts to leave the event
   * using the provided API service, and updates the event list and UI accordingly.
   * If the operation is successful, it emits an event update via socket and shows
   * a success message. If an error occurs, it shows an error message.
   * 
   * @async
   * @function leaveEvent
   * @returns {Promise<void>} A promise that resolves when the operation is complete.
   */
  const leaveEvent = async (event, setLoading) => {
    setLoading(true);
    try {
      const response = await apiServices.leaveEvent(event?._id);
      if (response.success) {
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  /**
   * Deletes an event and updates the event list.
   *
   * This function sets the loading state to true, attempts to delete the event using the provided API service,
   * and updates the event list and notifies other clients via socket if the deletion is successful.
   * It also displays a custom snackbar message based on the response or error.
   *
   * @async
   * @function deleteEvent
   * @returns {Promise<void>} A promise that resolves when the event deletion process is complete.
   */
  const deleteEvent = async (eventId, setLoading) => {
    setLoading(true);
    try {
      const response = await apiServices.deleteEvent(eventId);
      if (response.success) {
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    getEvents().then(() => setLoading(false));
  }, []);

  return (
    <EventContext.Provider value={{
      events,
      getEvents,
      joinEvent,
      leaveEvent,
      deleteEvent
    }}>
      {loading ? <Loader /> : children}
    </EventContext.Provider>
  );
};

export const useEvent = () => {
  return useContext(EventContext);
};

export default EventProvider;