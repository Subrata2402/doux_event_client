import { io } from 'socket.io-client';

const socket = io('http://192.168.43.44:3250', {
// const socket = io('https://doux-event.debdevcs.org', {
  transports: ['websocket'],
});

export default socket;