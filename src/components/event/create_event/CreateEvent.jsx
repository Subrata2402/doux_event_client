import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import { useEvent } from '../../../store/EventContext';
import socket from '../../../services/socketService';
import Spinner from 'react-bootstrap/esm/Spinner';

/**
 * CreateEvent component allows users to create a new event by filling out a form.
 * 
 * This component includes fields for event name, date, time, location, category, description, and an image.
 * It validates the input data and sends a request to create the event. If successful, it navigates to the home page,
 * fetches the updated list of events, and emits an 'update-event' event via socket.
 * 
 * @component
 * @returns {JSX.Element} The rendered CreateEvent component.
 */
function CreateEvent() {
  const { getEvents } = useEvent();
  const [fileName, setFileName] = useState('');
  const navigate = useNavigate();
  const [eventData, setEventData] = useState({
    name: '',
    date: '',
    time: '',
    location: '',
    category: '',
    description: '',
    'event-image': ''
  });
  const [loading, setLoading] = useState(false);

  const categories = [
    'Music',
    'Sports',
    'Food',
    'Travel',
    'Education',
    'Business',
    'Health',
    'Fashion',
    'Technology',
    'Art',
    'Science',
    'Other'
  ];

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEventData({ ...eventData, 'event-image': file });
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  };

  /**
   * Asynchronously creates a new event.
   * 
   * This function validates the event data, sets the loading state, and sends a request to create the event.
   * If the event is successfully created, it navigates to the home page, fetches the updated list of events,
   * and emits an 'update-event' event via socket. It also displays appropriate messages using customSnackBar.
   * 
   * @async
   * @function createEvent
   * @returns {Promise<void>} - A promise that resolves when the event creation process is complete.
   * @throws {Error} - Throws an error if the event creation fails.
   */
  const createEvent = async () => {
    if (!eventData.name || !eventData.date || !eventData.time || !eventData.location || !eventData.category || !eventData.description || !eventData['event-image']) {
      return customSnackBar('All fields are required');
    }
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in eventData) {
        formData.append(key, eventData[key]);
      }
      const response = await apiServices.createEvent(formData);
      if (response.success) {
        navigate('/');
        getEvents();
        socket.emit('update-event', response.data);
      }
      customSnackBar(response.message);
    } catch (error) {
      customSnackBar(error.message);
    }
    setLoading(false);
  }

  return (
    <div className="create-event-wrapper w-100">
      <div className='event-container'>
        <div className="header">
          <h2 className="form-title m-0">Create Event</h2>
        </div>
        <div className="event-form">
          <div className="row m-0 p-0">
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-name" className='col-sm-4'> Name <span>*</span></label>
              <input
                type="text"
                name='event-name'
                id='event-name'
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, name: e.target.value })}
                value={eventData.name}
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-date" className='col-sm-4'> Date <span>*</span></label>
              <input
                type="date"
                name='event-date'
                id='event-date'
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, date: e.target.value })}
                value={eventData.date}
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-time" className='col-sm-4'> Time <span>*</span></label>
              <input
                type="time"
                name='event-time'
                id='event-time'
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, time: e.target.value })}
                value={eventData.time}
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-location" className='col-sm-4'> Location <span>*</span></label>
              <input
                type="text"
                name='event-location'
                id='event-location'
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, location: e.target.value })}
                value={eventData.location}
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-location" className='col-sm-4'> Category <span>*</span></label>
              <select
                name="event-category"
                id="event-category"
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, category: e.target.value })}
                value={eventData.category}
              >
                <option value="">Select Category</option>
                {
                  categories.map((category, index) => (
                    <option key={index} value={category}>{category}</option>
                  ))
                }
              </select>
            </div>
            <div className="row m-0 p-0 mb-3 align-items-start">
              <label htmlFor="event-description" className='col-sm-4'> Description <span>*</span></label>
              <textarea
                name="event-description"
                id="event-description"
                cols="30"
                rows="5"
                className='col-sm-8'
                onChange={(e) => setEventData({ ...eventData, description: e.target.value })}
                value={eventData.description}
              >
              </textarea>
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-image" className='col-sm-4'> Image <span>*</span></label>
              <div className="file-upload col-sm-8">
                <label htmlFor="event-image" className="file-upload-button">Choose File</label>
                <input
                  type="file"
                  name='event-image'
                  id='event-image'
                  onChange={handleFileChange}
                  accept='image/*'
                />
                <span className="file-name">{fileName || 'No file chosen'}</span>
              </div>
            </div>
            <div className="create-button">
              <Button
                variant='contained'
                color='primary'
                className='w-100'
                disabled={loading}
                onClick={createEvent}
              >
                {loading ? <Spinner animation="border" size='md' className='me-2' /> : ""}Create Event
              </Button>
            </div>
          </div>
        </div>
      </div>

    </div>
  )
}

export default CreateEvent;