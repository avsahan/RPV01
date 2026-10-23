import { io } from 'socket.io-client';

export function openBookingSocket() {
  const socketUrl = (import.meta.env.VITE_SOCKET_URL || import.meta.env.VITE_API_URL ||
    (import.meta.env.DEV ? 'http://localhost:5000' : 'https://rpv01-backend-1.onrender.com')).replace(/\/+$/, '');
  return io(socketUrl, {
    withCredentials: true,
  });
}
