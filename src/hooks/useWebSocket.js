import { useState, useEffect } from 'react';
import { socketClient } from '../websocket/socket';

export const useWebSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const [liveIncidents, setLiveIncidents] = useState([]);
  const [latestNotification, setLatestNotification] = useState(null);

  useEffect(() => {
    socketClient.connect();

    const handleConnection = (status) => {
      setIsConnected(status.connected);
    };

    const handleIncident = (incident) => {
      setLiveIncidents((prev) => [incident, ...prev.slice(0, 19)]);
      setLatestNotification(incident);
    };

    socketClient.on('connection_status', handleConnection);
    socketClient.on('incident_received', handleIncident);

    return () => {
      socketClient.off('connection_status', handleConnection);
      socketClient.off('incident_received', handleIncident);
    };
  }, []);

  const clearNotification = () => setLatestNotification(null);

  return {
    isConnected,
    liveIncidents,
    latestNotification,
    clearNotification
  };
};
