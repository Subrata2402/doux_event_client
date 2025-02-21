import React, { useEffect, useState } from 'react';
import './Home.scss';
import { useEvent } from '../../store/EventContext';
import socket from '../../services/socketService';
import DeCarousel from '../carousel/DeCarousel';
import Contact from '../contact/Contact';

/**
 * Home component that displays a list of events with filtering options.
 * 
 * This component fetches events and allows users to filter them by search text, category, and date.
 * It listens for real-time updates to events via a socket connection.
 * 
 * @component
 * @example
 * return (
 *   <Home />
 * )
 * 
 * @returns {JSX.Element} The rendered Home component.
 */
function Home() {
  const { events, getEvents } = useEvent();
  const [filteredEvents, setFilteredEvents] = useState([]);

  useEffect(() => {
    socket.on('update-event', (_) => {
      getEvents();
    });
    return () => {
      socket.off('update-event');
    }
  }, []);

  useEffect(() => {
    let filtered = events;
    filtered = [...filtered].sort((a, b) => new Date(a.date) - new Date(b.date));
    setFilteredEvents(filtered.slice(0, 5));
  }, [events]);

  return (
    <div className="home-wrapper">
      <DeCarousel events={filteredEvents} />
      <div className="body-container">
        <div className="about">
          <h2>About Us</h2>
          <div className="divider"></div>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet turpis in nunc ultrices efficitur. Sed nec nunc id nunc ultrices efficitur. Curabitur sit amet purus ac ligula facilisis congue. Aliquam erat volutpat. Sed nec nunc id nunc ultrices efficitur. Curabitur sit amet purus ac ligula facilisis congue. Aliquam erat volutpat.
          </p>
          <p>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Magni quae totam suscipit dicta? Quae nulla inventore temporibus ea nostrum voluptatum sequi porro, ipsam ex. Amet ab, natus eius nemo nisi sequi suscipit vero adipisci, harum dignissimos recusandae non reprehenderit a beatae exercitationem sint! Nemo nostrum deserunt aliquam molestiae obcaecati aspernatur, omnis culpa minima necessitatibus totam ipsa in accusantium, provident at, magni velit eius ea quis vero. Corrupti omnis cupiditate, assumenda doloremque voluptas hic nemo distinctio accusantium eum voluptate dicta labore laboriosam accusamus mollitia recusandae praesentium quasi at dolorem ipsum placeat eius illum sint? Praesentium hic inventore rerum voluptas, consequatur soluta.
          </p>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam sit amet turpis in nunc ultrices efficitur. Sed nec nunc id nunc ultrices efficitur. Curabitur sit amet purus ac ligula facilisis congue. Aliquam erat volutpat. Sed nec nunc id nunc ultrices efficitur. Curabitur sit amet purus ac ligula facilisis congue. Aliquam erat volutpat.
          </p>
        </div>
        <Contact />
      </div>
    </div>
  )
}

export default Home;