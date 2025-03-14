import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import EventForm from '../event_form/EventForm';
import apiServices from '../../../services/apiServices';

function EditEvent(props) {
  const [event, setEvent] = useState(props.event);
  const [fileName, setFileName] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setEvent({ ...event, 'event-image': file });
    if (file) {
      setFileName(file.name);
    } else {
      setFileName('');
    }
  }

  const handleSubmit = async () => {
    setLoading(true);
    const response = await apiServices.updateEvent(event);
    if (response.success) {
      props.onHide();
      customSnackBar(response.message);
    } else {
      customSnackBar(response.message);
    }
    setLoading(false);
  }

  return (
    <Modal
      show={props.show}
      onHide={props.onHide}
      size='xl'
    >
      <div className="d-flex flex-column gap-2 p-4">
        <div className="text-center fw-bold fs-3">
          Edit Event
        </div>
        <hr />
        <EventForm
          eventData={event}
          setEventData={setEvent}
          handleFileChange={handleFileChange}
          fileName={fileName}
          loading={loading}
          handleSubmit={handleSubmit}
          buttonName='Update Event'
        />
      </div>
    </Modal>
  )
}

export default EditEvent;