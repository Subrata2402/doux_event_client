import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import './EventDetails.scss';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import Loader from '../../loader/Loader';
import ApiConnection from '../../../connections/api_connection';
import { useAuth } from '../../../store/AuthContext';
import { Button, IconButton, Tooltip } from '@mui/material';
import Confirmation from '../../Confirmation';
import Spinner from 'react-bootstrap/esm/Spinner';
import { useEvent } from '../../../store/EventContext';
import socket from '../../../services/socketService';
import Modal from 'react-bootstrap/Modal';
import { FaArrowCircleLeft } from 'react-icons/fa';
import { FiEdit } from "react-icons/fi";
import EditEvent from '../edit_event/EditEvent';

function EventDetails() {
  const { eventId } = useParams();
  const { profileDetails } = useAuth();
  const { joinEvent, leaveEvent, deleteEvent, getEvents } = useEvent();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(false);
  const apiConnection = new ApiConnection();
  const [loadingj, setLoadingj] = useState(false);
  const [loadingl, setLoadingl] = useState(false);
  const [loadingd, setLoadingd] = useState(false);
  const [cnfModalShow, setCnfModalShow] = useState(false);
  const [delModalShow, setDelModalShow] = useState(false);
  const [show, setShow] = useState(false);
  const [showModal, setShowModal] = useState(false);

  const fetchEventDetails = async () => {
    setLoading(true);
    try {
      const response = await apiServices.eventDetails(eventId);
      if (response.success) {
        setEvent(response.data);
      } else {
        customSnackBar(response.message);
      }
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  useEffect(() => {
    fetchEventDetails();
    socket.on('update-event', (data) => {
      if (data._id === eventId) {
        if (data.isDeleted) {
          setEvent(null);
        } else {
          setEvent(data);
        }
      }
      getEvents();
    });

    return () => {
      setEvent(null);
      socket.off('update-event');
    }
  }, []);

  const getRandomColor = () => {
    const letters = '0123456789ABCDEF';
    let color = '#';
    for (let i = 0; i < 6; i++) {
      color += letters[Math.floor(Math.random() * 16)];
    }
    return color;
  };

  if (loading) {
    return <Loader />
  }

  if (!event) {
    return (
      <div className="d-flex justify-content-center align-items-center event-details-wrapper w-100 fw-bold fs-3 text-center">
        Event not found or has been deleted
        <div className="home-back">
          <Link to='/'>
            <IconButton>
              <FaArrowCircleLeft size={30} color='var(--text-color)' />
            </IconButton>
          </Link>
          <p>Back to home</p>
        </div>
      </div>
    );
  }

  return (
    <div className="event-details-wrapper">
      <div className="event-image">
        <img src={`${apiConnection.baseUrl}/images/${event.image}`} alt={event.title} />
      </div>
      <div className="event-details">
        <div className="event-name home-back">
          {event.name}
          {/* <Tooltip title='Edit event' placement='top'>
            <IconButton className='view-image' onClick={() => setShowModal(true)}>
              <FiEdit size={25} color='var(--text-color)' />
            </IconButton>
          </Tooltip>
          <EditEvent
            show={showModal}
            onHide={() => setShowModal(false)}
            event={event}
          /> */}
        </div>
        <div className="action-buttons d-flex gap-3">
          {
            event?.attendees?.some(attendee => attendee._id?.toString() === profileDetails?._id?.toString()) ?
              <>
                <Tooltip title='Leave the event' placement='top'>
                  <Button
                    onClick={() => setCnfModalShow(true)}
                    disabled={loadingl}
                    className={loadingl ? 'disabled' : ''}
                  >
                    {loadingl ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Leave
                  </Button>
                </Tooltip>
                <Confirmation
                  title='Leave Event'
                  message='Are you sure you want to leave the event?'
                  onConfirm={() => leaveEvent(event, setLoadingl)}
                  show={cnfModalShow}
                  handleClose={() => setCnfModalShow(false)}
                />
              </>
              : <Tooltip title='Join the event' placement='top'>
                <Button
                  onClick={() => joinEvent(event, setLoadingj)}
                  disabled={loadingj}
                  style={{ backgroundColor: 'var(--primary-bt-color)' }}
                  className={loadingj ? 'disabled' : ''}
                >
                  {loadingj ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Join
                </Button>
              </Tooltip>
          }
          {
            profileDetails?._id === event?.organizer._id &&
            <>
              <Tooltip title='Delete the event' placement='top'>
                <Button
                  className={`bg-danger ${loadingd ? 'disabled' : ''}`}
                  onClick={() => setDelModalShow(true)}
                  disabled={loadingd}
                >
                  {loadingd ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Delete
                </Button>
              </Tooltip>
              <Confirmation
                title='Delete Event'
                message='Are you sure you want to delete the event?'
                onConfirm={() => deleteEvent(event._id, setLoadingd)}
                show={delModalShow}
                handleClose={() => setDelModalShow(false)}
              />
            </>
          }
        </div>
        <div className="event-description">
          {event.description}
        </div>
        <div className="d-flex flex-column gap-1">
          <div className="event-date fs-5">
            <span className="fw-bold">Date:</span> {new Date(event.date).toLocaleDateString()}
          </div>
          <div className="event-time fs-5">
            <span className="fw-bold">Time:</span> {event.time}
          </div>
          <div className="event-location fs-5">
            <span className="fw-bold">Location:</span> {event.location}
          </div>
          <div className="event-category fs-5">
            <span className="fw-bold">Category:</span> {event.category}
          </div>
          <div className="event-organizer fs-5">
            <span className="fw-bold">Organizer:</span> {event.organizer?.name}
          </div>
          <div className="attendees fs-5 d-flex">
            <span className="fw-bold me-2">Attendees:</span> {event.attendees?.length < 10 ? `0${event.attendees?.length}` : event.attendees?.length}

            {
              event.attendees?.length > 0 &&
              <Tooltip title='View attendees' placement='top'>
                <Button style={{ backgroundColor: 'var(--green-color)' }} className='view-button' onClick={() => setShow(true)}>
                  View
                </Button>
                <Modal
                  show={show}
                  onHide={() => setShow(false)}
                  centered
                >
                  <div className="d-flex flex-column gap-2 p-4">
                    <div className="text-center fw-bold fs-3">
                      List of Attendees
                    </div>
                    <hr />
                    <div className="fs-5 attendees-list">
                      {
                        event.attendees?.map((attendee, index) => (
                          <div key={index} className="attendee">
                            <div className="logo" style={{ backgroundColor: getRandomColor(), color: 'white' }}>
                              {attendee.name.charAt(0).toUpperCase()}
                            </div>
                            <div className="name">
                              {attendee.name}
                            </div>
                          </div>
                        ))
                      }
                    </div>
                    <hr />
                    <div className="d-flex justify-content-end gap-3">
                      <Button
                        variant="contained"
                        style={{ backgroundColor: "var(--button-color)" }}
                        onClick={() => setShow(false)}>
                        Close
                      </Button>
                    </div>
                  </div>
                </Modal>
              </Tooltip>
            }
          </div>
        </div>
      </div>
    </div>
  )
}

export default EventDetails;