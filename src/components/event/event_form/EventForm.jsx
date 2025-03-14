import React from 'react';
import './EventForm.scss';
import { categories } from '../../../utils/data';
import CustomDatePicker from '../../../custom/date_picker/CustomDatePicker';
import CustomTimePicker from '../../../custom/time_picker/CustomTimePicker';
import CustomDropDown from '../../../custom/drop_down/CustomDropDown';
import { Button } from '@mui/material';
import Spinner from 'react-bootstrap/esm/Spinner';

/**
 * EventForm component renders a form for creating or editing an event.
 *
 * @param {Object} props - The properties object.
 * @param {Object} props.eventData - The current event data.
 * @param {Function} props.setEventData - Function to update the event data.
 * @param {Function} props.handleFileChange - Function to handle file input change.
 * @param {string} [props.fileName] - The name of the selected file.
 * @param {boolean} props.loading - Indicates if the form submission is in progress.
 * @param {Function} props.handleSubmit - Function to handle form submission.
 * @param {string} props.buttonName - The name to display on the submit button.
 *
 * @returns {JSX.Element} The EventForm component.
 */
function EventForm(props) {
  const { eventData, setEventData } = props;

  return (
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
            <CustomDatePicker
              date={eventData.date}
              setDate={(date) => setEventData({ ...eventData, date })}
              width='100%'
            />
          </div>
        </div>
        <div className="row m-0 p-0 mb-3 align-items-center">
          <label htmlFor="event-time" className='col-sm-4'> Time <span>*</span></label>
          <div className="col-sm-8 p-0">
            <CustomTimePicker
              value={eventData.time}
              setValue={(time) => setEventData({ ...eventData, time })}
            />
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
            <CustomDropDown
              items={categories.map((category) => category.text)}
              value={eventData.category}
              setValue={(value) => setEventData({ ...eventData, category: value })}
              placeholder='Select Category'
            />
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
              onChange={props.handleFileChange}
              accept='image/*'
            />
            <span className="file-name">{props.fileName || 'No file chosen'}</span>
          </div>
        </div>
        <div className="create-button">
          <Button
            variant='contained'
            color='primary'
            className='w-100'
            disabled={props.loading}
            onClick={props.handleSubmit}
          >
            {props.loading ? <Spinner animation="border" size='md' className='me-2' /> : ""}{props.buttonName}
          </Button>
        </div>
      </div>
    </div>
  )
}

export default EventForm;