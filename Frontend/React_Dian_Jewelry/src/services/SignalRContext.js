import React, { createContext, useContext, useState, useCallback } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const SignalRContext = createContext();

export const SignalRProvider = ({ children }) => {
  const [connection, setConnection] = useState(null);
  const [notifications, setNotifications] = useState([]);

  const startConnection = useCallback((customerId) => {
    const newConnection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notification?customerId=${customerId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets,
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .build();

    newConnection.on("ReceiveNotification", (message) => {
      setNotifications((prevNotifications) => [...prevNotifications, message]);
      console.log("Received notification: ", message);
    });

    newConnection
      .start()
      .then(() => {
        console.log('Connection established, connection ID:', newConnection.connectionId);
        return getNotifications(customerId);
      })
      .then((fetchedNotifications) => {
        setNotifications(fetchedNotifications);
      })
      .catch((err) => console.log('Error connecting or fetching notifications:', err));

    setConnection(newConnection);

    return () => {
      newConnection.stop().then(() => console.log('Connection stopped'));
    };
  }, []);

  return (
    <SignalRContext.Provider value={{ connection, notifications, startConnection }}>
      {children}
    </SignalRContext.Provider>
  );
};

export const useSignalR = () => {
  return useContext(SignalRContext);
};

const getNotifications = async (customerId) => {
  return axios.get(`${API_BASE_URL}/api/notifications/all`, { params: { customerId } })
    .then((response) => response.data)
    .catch((error) => {
      console.error('Error fetching notifications:', error);
      return [];
    });
};
