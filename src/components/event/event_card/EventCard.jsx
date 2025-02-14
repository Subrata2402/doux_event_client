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

function EventCard(props) {
  const { getEvents } = useEvent();
  const { profileDetails, isLoggedIn } = useAuth();
  const apiConnection = new ApiConnection();
  const [cnfModalShow, setCnfModalShow] = useState(false);
  const [delModalShow, setDelModalShow] = useState(false);
  const [loadingj, setLoadingj] = useState(false);
  const [loadingl, setLoadingl] = useState(false);
  const [loadingd, setLoadingd] = useState(false);

  const joinEvent = async () => {
    if (!isLoggedIn) {
      return customSnackBar('Please login to join the event');
    }
    if (profileDetails?._id === props.event?.organizer) {
      return customSnackBar('You can\'t join your own event');
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
        <img src={`${apiConnection.baseUrl}/images/${props.event?.image}`} alt="event" className='img-fluid' />
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