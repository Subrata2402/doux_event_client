import { Button } from '@mui/material'
import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom';
import './CreateEvent.scss';
import apiServices from '../../../services/apiServices';
import customSnackBar from '../../snackbar/CustomSnackBar';
import { useEvent } from '../../../store/EventContext';
import socket from '../../../services/socketService';
import Spinner from 'react-bootstrap/esm/Spinner';
import CustomDatePicker from '../../../custom/date_picker/CustomDatePicker';
import CustomTimePicker from '../../../custom/time_picker/CustomTimePicker';
import CustomDropDown from '../../../custom/drop_down/CustomDropDown';

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
    date: null,
    time: null,
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
    console.log(eventData);
    if (!eventData.name || !eventData.date || !eventData.time || !eventData.location || !eventData.category || !eventData.description || !eventData['event-image']) {
      return customSnackBar('All fields are required');
    }
    // check if the file is image or not
    if (!eventData['event-image'].type.includes('image')) {
      return customSnackBar('Please upload an image file');
    }
    setLoading(true);
    try {
      const formData = new FormData();
      for (let key in eventData) {
        if (key === 'date') {
          formData.append(key, new Date(eventData[key]).toISOString());
        } else if (key === 'time') {
          formData.append(key, new Date(eventData[key]).toLocaleTimeString());
        } else {
          formData.append(key, eventData[key]);
        }
      }
      const response = await apiServices.createEvent(formData);
      if (response.success) {
        navigate('/events');
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
                placeholder='Enter event name'
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-date" className='col-sm-4'> Date <span>*</span></label>
              <div className="col-sm-8 p-0">
                <CustomDatePicker date={eventData.date} setDate={(date) => setEventData({ ...eventData, date })} width='100%' />
              </div>
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-time" className='col-sm-4'> Time <span>*</span></label>
              <div className="col-sm-8 p-0">
                <CustomTimePicker value={eventData.time} setValue={(time) => setEventData({ ...eventData, time })} />
              </div>
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
                placeholder='Enter event location'
              />
            </div>
            <div className="row m-0 p-0 mb-3 align-items-center">
              <label htmlFor="event-location" className='col-sm-4'> Category <span>*</span></label>
              <div className="col-sm-8 p-0">
                <CustomDropDown items={categories} value={eventData.category} setValue={(value) => setEventData({ ...eventData, category: value })} placeholder='Select Category' />
              </div>
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
                placeholder='Enter event description'
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