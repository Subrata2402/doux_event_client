import { io } from 'socket.io-client';

const socket = io('https://doux-event.debdevcs.org', {
  transports: ['websocket'],
});

export default socket;