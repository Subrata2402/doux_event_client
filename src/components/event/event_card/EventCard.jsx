import React, { useState } from 'react';
import './EventCard.scss';
import { useEvent } from '../../../store/EventContext';
import customSnackBar from '../../snackbar/CustomSnackBar';
import ApiConnection from '../../../connections/api_connection';
import { Button, Tooltip } from '@mui/material';
import { useAuth } from '../../../store/AuthContext';
import apiServices from '../../../services/apiServices';
import Confirmation from '../../Confirmation';
import socket from '../../../services/socketService';
import Spinner from 'react-bootstrap/Spinner';

/**
 * EventCard component renders a card with event details and provides options to join, leave, or delete the event.
 *
 * @component
 * @param {Object} props - The properties object.
 * @param {Object} props.event - The event object containing details of the event.
 *
 * @returns {JSX.Element} The rendered EventCard component.
 */
function EventCard(props) {
  const { getEvents } = useEvent();
  const { profileDetails, isLoggedIn } = useAuth();
  const apiConnection = new ApiConnection();
  const [cnfModalShow, setCnfModalShow] = useState(false);
  const [delModalShow, setDelModalShow] = useState(false);
  const [loadingj, setLoadingj] = useState(false);
  const [loadingl, setLoadingl] = useState(false);
  const [loadingd, setLoadingd] = useState(false);

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
  const joinEvent = async () => {
    if (!isLoggedIn) {
      return customSnackBar('Please login to join the event');
    }
    setLoadingj(true);
    try {
      const response = await apiServices.joinEvent(props.event._id);
      if (response.success) {
        getEvents();
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoadingj(false);
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
  const leaveEvent = async () => {
    setLoadingl(true);
    try {
      const response = await apiServices.leaveEvent(props.event._id);
      if (response.success) {
        getEvents();
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoadingl(false);
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
  const deleteEvent = async () => {
    setLoadingd(true);
    try {
      const response = await apiServices.deleteEvent(props.event._id);
      if (response.success) {
        getEvents();
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoadingd(false);
  }

  return (
    <div className="event-card">
      <div className="card-image">
        <img src={`${apiConnection.baseUrl}/images/${props.event?.image}`} alt={props.event?.name} className='img-fluid' />
      </div>
      <div className="card-title">
        {props.event?.name}
      </div>
      <div className="card-body">
        <div className="description">
          {props.event?.description}
        </div>
        <div className="location">
          <strong>Location: </strong>{props.event?.location}
        </div>
        <div className="date-time">
          <strong>Date:</strong>
          <span>
            {new Date(props.event?.date).toDateString().slice(4)}
          </span>
          <div className='dot'></div>
          <span>
            {props.event?.time}
          </span>
        </div>
        <div className="attendees">
          <span>
            <strong>Attendees: </strong>{props.event?.attendees?.length}
          </span>
        </div>
      </div>
      <div className="card-footer">
        {
          props.event?.attendees?.includes(profileDetails?._id) ?
            <>
              <Tooltip title='Leave the event' placement='top'>
                <Button onClick={() => setCnfModalShow(true)} disabled={loadingl}>
                  {loadingl ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Leave
                </Button>
              </Tooltip>
              <Confirmation
                title='Leave Event'
                message='Are you sure you want to leave the event?'
                onConfirm={leaveEvent}
                show={cnfModalShow}
                handleClose={() => setCnfModalShow(false)}
              />
            </>
            : <Tooltip title='Join the event' placement='top'>
              <Button onClick={joinEvent} disabled={loadingj} style={{ backgroundColor: 'var(--primary-bt-color)'}}>
                {loadingj ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Join
              </Button>
            </Tooltip>
        }
        {
          profileDetails?._id === props.event?.organizer &&
          <>
            <Tooltip title='Delete the event' placement='top'>
              <Button className='bg-danger' onClick={() => setDelModalShow(true)} disabled={loadingd}>
                {loadingd ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Delete
              </Button>
            </Tooltip>
            <Confirmation
              title='Delete Event'
              message='Are you sure you want to delete the event?'
              onConfirm={deleteEvent}
              show={delModalShow}
              handleClose={() => setDelModalShow(false)}
            />
          </>
        }
      </div>
    </div>
  )
}

export default EventCard;