import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import './Home.scss';
import { useEvent } from '../../store/EventContext';
import EventCard from '../event/event_card/EventCard';

function Home() {
  const { events, getEvents } = useEvent();
  const [searchText, setSearchText] = useState('');
  const [filteredEvents, setFilteredEvents] = useState([]);
  const [filteredType, setFilteredType] = useState('Date');

  useEffect(() => {
    let filtered = events.filter(event =>
      event.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
      event.description.toLowerCase().includes(searchText.toLowerCase().trim())
    );
    setFilteredEvents(filtered);
  }, [searchText, events]);

  return (
    <div className="home-wrapper">
      <Header setSearchText={setSearchText} searchText={searchText} setFilteredType={setFilteredType} />
      {
        filteredEvents?.length === 0
          ? <div className="no-events">There are no events found...</div>
          :
          <div className="cards-container">
            <div className="event-cards">
              {
                filteredEvents.map((event, index) => <EventCard key={index} event={event} />)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Home;