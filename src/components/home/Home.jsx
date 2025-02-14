import React, { use, useEffect, useRef, useState } from 'react';
import Header from '../header/Header';
import EventCard from '../event/event_card/EventCard';
import './Home.scss';
import { useEvent } from '../../store/EventContext';
import socket from '../../services/socketService';

function Home() {
  const { events, getEvents } = useEvent();
  const [searchText, setSearchText] = useState('');
  const [filterData, setFilterData] = useState(events);
  const [category, setCategory] = useState('None');
  const [date, setDate] = useState(null);

  useEffect(() => {
    // Listen for events
    socket.on('update-event', (_) => {
      getEvents();
    });
    // Cleanup on component unmount
    return () => {
      socket.off('update-event');
    };
  }, []);

  useEffect(() => {
    let filtered = events;
    if (searchText.trim()) {
      filtered = events.filter(event =>
        event.name.toLowerCase().includes(searchText.toLowerCase().trim()) ||
        event.description.toLowerCase().includes(searchText.toLowerCase().trim())
      );
    }
    if (date) {
      filtered = filtered.filter(event => {
        const eventDate = new Date(event.date);
        return eventDate.toDateString() === date.$d.toDateString();
      });
    }
    if (category !== 'None') {
      filtered = filtered.filter(event => event.category === category);
    }
    setFilterData(filtered);
  }, [searchText, date, category, events]);

  return (
    <div className="home-wrapper">
      <Header setSearchText={setSearchText} searchText={searchText} setCategory={setCategory} category={category} date={date} setDate={setDate} />
      {
        filterData.length === 0
          ? <div className="no-events">There are no events found...</div>
          :
          <div className="cards-container">
            <div className="event-cards">
              {
                filterData.map((event, index) => <EventCard key={index} event={event} />)
              }
            </div>
          </div>
      }
    </div>
  )
}

export default Home;