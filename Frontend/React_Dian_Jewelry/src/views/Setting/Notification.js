import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notification = ({ customerId }) => {
  const [notifications, setNotifications] = useState([]);
  const [connectionEstablished, setConnectionEstablished] = useState(false);

  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl(`https://localhost:7184/notification?customerId=${customerId}`, {
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

    connection.start()
      .then(() => {
        // Adding a slight delay to ensure the connectionId is available
        setTimeout(() => {
          console.log('Connection established, connection ID:', connection.connectionId);
          setConnectionEstablished(true);
        }, 100);
      })
      .catch(err => console.log('Error connecting:', err));

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
          <li key={index}>{notification}</li>
        ))}
      </ul>
    </div>
  );
};

export default Notification;
