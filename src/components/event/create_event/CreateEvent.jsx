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
import { categories } from '../../../utils/data';
import EventForm from '../event_form/EventForm';

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
        <EventForm
          eventData={eventData}
          setEventData={setEventData}
          fileName={fileName}
          handleFileChange={handleFileChange}
          loading={loading}
          handleSubmit={createEvent}
          buttonName='Create Event'
        />
      </div>

    </div>
  )
}

export default CreateEvent;