import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

const API_BASE_URL = 'https://dian.southeastasia.cloudapp.azure.com';

const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const startConnection = useCallback((recipientId, recipientRole) => {
    const newConnection = new signalR.HubConnectionBuilder()
    .withUrl(`${API_BASE_URL}/notification?recipientId=${recipientId}&recipientRole=${recipientRole}`, {
      skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets,
  })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    

    newConnection
      .start()
      .then(() => {
        console.log('Connection established, connection ID:', newConnection.connectionId);
        return getNotifications(recipientId, recipientRole);
      })
      .then((fetchedNotifications) => {
        console.log("fetched notification", fetchedNotifications);
        setNotifications(fetchedNotifications.map(n=>{ return n.message}));
      })
      .catch((err) => console.log('Error connecting or fetching notifications:', err));

    setConnection(newConnection);

    return () => {
      newConnection.stop().then(() => console.log('Connection stopped'));
    };
  }, []);

  useEffect(()=>{
    connection?.on("ReceiveNotification", (message) => {
      setNotifications(prev => [...prev,message]);
      console.log("Received notification: ", message);
    });
  },[connection])
  return (
    <SignalRContext.Provider value={{ connection, notifications, startConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  return useContext(SignalRContext);
};

const getNotifications = async (recipientId, role) => {
  return axios.get(`${API_BASE_URL}/api/notifications/all`, { params: { recipientId, role } })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching notifications:', error);
      return [];
    });
};
