import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';
import axios from 'axios';

const API_BASE_URL = 'https://localhost:7184';

const getNotifications = async (customerId) => {
  return axios.get(`${API_BASE_URL}/api/notifications/all`, { params: { customerId } })
    .then((response) => {
      return response.data;
    })
    .catch((error) => {
      console.error('Error fetching notifications:', error);
      return [];
    });
};

const Notification = ({ customerId }) => {
  const [notifications, setNotifications] = useState([]);
  const [connectionEstablished, setConnectionEstablished] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`${API_BASE_URL}/notification?customerId=${customerId}`, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .withAutomaticReconnect()
      .configureLogging(signalR.LogLevel.Information)
      .configureLogging(signalR.LogLevel.Debug)
      .build();
    
    connection.on("ReceiveNotification", message => {
      setNotifications(notifications => [...notifications, message]);
      console.log("Received notification: ", message);
    });

    const startConnectionWithTimeout = (timeout) => {
      return new Promise((resolve, reject) => {
        const timeoutId = setTimeout(() => {
          reject(new Error('Connection timeout'));
        }, timeout);

        connection.start()
          .then(() => {
            clearTimeout(timeoutId);
            resolve();
          })
          .catch(err => {
            clearTimeout(timeoutId);
            reject(err);
          });
      });
    };

    startConnectionWithTimeout(30000) // 30 seconds timeout
      .then(() => {
        console.log('Connection established, connection ID:', connection.connectionId);
        setConnectionEstablished(true);
        return getNotifications(customerId);
      })
      .then(fetchedNotifications => {
        setNotifications(fetchedNotifications);
      })
      .catch(err => console.log('Error connecting or fetching notifications:', err));

    return () => {
      if (connectionEstablished) {
        connection.stop().then(() => console.log('Connection stopped'));
      }
    };
  }, [customerId]);

  return (
    <div>
      <h2>Notifications</h2>
      <ul>
      {notifications.map((notification, index) => (
  <li key={index}>{notification.message}</li> // Accessing the message property of the notification object
))}
      </ul>
    </div>
  );
};

export default Notification;
