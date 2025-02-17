import React, { useEffect, useState } from 'react';
import Header from '../header/Header';
import EventCard from '../event/event_card/EventCard';
import './Home.scss';
import { useEvent } from '../../store/EventContext';
import socket from '../../services/socketService';
import DeCarousel from '../carousel/DeCarousel';

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
  

  return (
    <DeCarousel />
  )
}

export default Home;