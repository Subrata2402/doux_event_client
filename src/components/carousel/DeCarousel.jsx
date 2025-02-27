import React from 'react';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from 'react-responsive-carousel';
import './DeCarousel.scss';
import { Button, Tooltip } from '@mui/material';
import { Link } from 'react-router-dom';
import ApiConnection from '../../connections/api_connection';


function DeCarousel(props) {
  const apiConnection = new ApiConnection();

  return (
    <div className="de-carousel">
      <Carousel
        autoPlay={true}
        infiniteLoop={true}
        useKeyboardArrows={true}
        showThumbs={false}
        showStatus={false}
        
      >
        {
          props.events?.map((event, index) => (
            <div className='slide-item' key={index}>
              <img src={`${apiConnection.baseUrl}/images/${event?.image}`} alt={event?.name} />
              <div className="slide-content">
                <h3 className='slide-title'>{event.name}</h3>
                <div className="date-time">
                  <span>
                    {new Date(event?.date).toDateString().slice(4)}
                  </span>
                  <div className='dot'></div>
                  <span>
                    {event?.time}
                  </span>
                </div>
                <Link to={`/events/${event._id}`}>
                  <Tooltip title='View event details' placement='top'>
                    <Button variant='contained' className='btn'>View Event</Button>
                  </Tooltip>
                </Link>
              </div>
            </div>
          ))
        }
      </Carousel>
    </div>
  )
}

export default DeCarousel;