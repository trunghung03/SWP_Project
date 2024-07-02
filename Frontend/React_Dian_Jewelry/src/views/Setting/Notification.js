import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notification = ({customerId}) => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    const connection = new signalR.HubConnectionBuilder()
      .withUrl("/notification?customerId=" + customerId, {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      })
      .configureLogging(signalR.LogLevel.Information)
      .configureLogging(signalR.LogLevel.Debug)
      .build();
    connection.start()
    .then(() => {
      console.log('Connection established, connection ID:', connection.connectionId);
    })
    .catch(err => console.log('Error connecting:', err));

    connection.on("ReceiveNotification", message => {
      setNotifications(notifications => [...notifications, message]);
      console.log("Received notification: ", message);
    });
  
    return () => {
      connection.stop();
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
