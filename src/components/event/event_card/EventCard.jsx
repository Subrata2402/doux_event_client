import React, { useEffect, useState } from 'react';
import './EventCard.scss';
import { useEvent } from '../../../store/EventContext';
import customSnackBar from '../../snackbar/CustomSnackBar';
import ApiConnection from '../../../connections/api_connection';
import { Button, Tooltip } from '@mui/material';
import { useAuth } from '../../../store/AuthContext';
import apiServices from '../../../services/apiServices';
import Confirmation from '../../Confirmation';
import socket from '../../../services/socketService';

function EventCard(props) {
  const { getEvents } = useEvent();
  const { profileDetails, isLoggedIn } = useAuth();
  const [event, setEvent] = useState(props.event);
  const apiConnection = new ApiConnection();
  const [cnfModalShow, setCnfModalShow] = useState(false);
  const [delModalShow, setDelModalShow] = useState(false);

  const joinEvent = async () => {
    if (!isLoggedIn) {
      return customSnackBar('Please login to join the event');
    }
    try {
      const response = await apiServices.joinEvent(event._id);
      if (response.success) {
        getEvents();
        setEvent(response.data);
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
  }

  const leaveEvent = async () => {
    try {
      const response = await apiServices.leaveEvent(event._id);
      if (response.success) {
        getEvents();
        setEvent(response.data);
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
  }

  const deleteEvent = async () => {
    try {
      const response = await apiServices.deleteEvent(event._id);
      if (response.success) {
        getEvents();
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
  }

  useEffect(() => {
    // Listen for events
    socket.on('update-event', (data) => {
      if (data._id === event._id) {
        setEvent(data);
      }
    });
    // Cleanup on component unmount
    return () => {
      socket.off('update-event');
    };
  }, []);

  return (
    <div className="event-card">
      <div className="card-image">
        <img src={`${apiConnection.baseUrl}/images/${event?.image}`} alt="event" className='img-fluid' />
      </div>
      <div className="card-title">
        {event?.name}
      </div>
      <div className="card-body">
        <div className="description">
          {event?.description}
        </div>
        <div className="location">
          <strong>Location: </strong>{event?.location}
        </div>
        <div className="date-time">
          <strong>Date:</strong>
          <span>
            {new Date(event?.date).toDateString().slice(4)}
          </span>
          <div className='dot'></div>
          <span>
            {event?.time}
          </span>
        </div>
        <div className="attendees">
          <span>
            <strong>Attendees: </strong>{event?.attendees?.length}
          </span>
        </div>
      </div>
      <div className="card-footer">
        {
          event?.attendees?.includes(profileDetails?._id) ?
            <>
              <Tooltip title='Leave the event' placement='top'>
                <Button onClick={() => setCnfModalShow(true)}>
                  Leave
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
              <Button onClick={joinEvent}>
                Join
              </Button>
            </Tooltip>
        }
        {
          profileDetails?._id === event?.organizer &&
          <>
            <Tooltip title='Delete the event' placement='top'>
              <Button className='bg-danger' onClick={() => setDelModalShow(true)}>
                Delete
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