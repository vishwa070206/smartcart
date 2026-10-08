import { useEffect, useState } from 'react';
import { io } from 'socket.io-client';

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL || 'http://localhost:5000';

export function useSocket(eventHandlers = {}) {
  const [isConnected, setIsConnected] = useState(false);
  const [socketError, setSocketError] = useState(null);

  useEffect(() => {
    let socket;
    try {
      socket = io(SOCKET_URL, {
        autoConnect: false,
        reconnectionAttempts: 3,
        timeout: 5000
      });

      socket.connect();

      socket.on('connect', () => {
        setIsConnected(true);
        setSocketError(null);
      });

      socket.on('disconnect', () => {
        setIsConnected(false);
      });

      socket.on('connect_error', (err) => {
        setIsConnected(false);
        setSocketError(err.message);
      });

      // Bind provided event handlers
      Object.entries(eventHandlers).forEach(([event, handler]) => {
        socket.on(event, handler);
      });
    } catch (e) {
      setIsConnected(false);
    }

    return () => {
      if (socket) {
        socket.disconnect();
      }
    };
  }, []);

  return { isConnected, socketError };
}
