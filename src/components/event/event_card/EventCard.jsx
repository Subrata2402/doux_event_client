import React, { useState } from 'react';
import './EventCard.scss';
import { useEvent } from '../../../store/EventContext';
import ApiConnection from '../../../connections/api_connection';
import { Button, Tooltip } from '@mui/material';
import { useAuth } from '../../../store/AuthContext';
import Confirmation from '../../Confirmation';
import Spinner from 'react-bootstrap/Spinner';
import { Link } from 'react-router-dom';

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
  const { joinEvent, leaveEvent } = useEvent();
  const { profileDetails } = useAuth();
  const apiConnection = new ApiConnection();
  const [cnfModalShow, setCnfModalShow] = useState(false);
  const [loadingj, setLoadingj] = useState(false);
  const [loadingl, setLoadingl] = useState(false);

  return (
    <div className="event-card">
      <div className="card-image">
        <img src={`${apiConnection.baseUrl}/images/${props.event?.image}`} alt={props.event?.name} className='img-fluid' />
      </div>
      <div className="card-title">
        {props.event?.name}
      </div>
      <div className="card-body">
        {/* <div className="description">
          {props.event?.description}
        </div> */}
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
            <strong>Attendees: </strong>{props.event?.attendees?.length < 10 ? `0${props.event?.attendees?.length}` : props.event?.attendees?.length}
          </span>
        </div>
      </div>
      <div className="card-footer">
        {
          props.event?.attendees?.includes(profileDetails?._id) ?
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
                onConfirm={() => leaveEvent(props.event, setLoadingl)}
                show={cnfModalShow}
                handleClose={() => setCnfModalShow(false)}
              />
            </>
            : <Tooltip title='Join the event' placement='top'>
              <Button
                onClick={() => joinEvent(props.event, setLoadingj)}
                disabled={loadingj}
                style={{ backgroundColor: 'var(--primary-bt-color)' }}
                className={loadingj ? 'disabled' : ''}
              >
                {loadingj ? <Spinner animation="border" size='sm' className='me-2' /> : ''} Join
              </Button>
            </Tooltip>
        }
        <Link to={`/events/${props.event?._id}`}>
          <Tooltip title='View event details' placement='top'>
            <Button style={{ backgroundColor: 'var(--green-color)' }}>
              View
            </Button>
          </Tooltip>
        </Link>

      </div>
    </div>
  )
}

export default EventCard;