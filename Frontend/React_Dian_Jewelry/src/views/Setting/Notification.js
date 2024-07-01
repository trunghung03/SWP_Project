import React, { useEffect, useState } from 'react';
import * as signalR from '@microsoft/signalr';

const Notification = () => {
  const [notifications, setNotifications] = useState([]);
  
  useEffect(() => {
    // const connection = new signalR.HubConnectionBuilder()
    //   .withUrl("/notifications?customerId=" + customerId, {
    //     skipNegotiation: true,
    //     transport: signalR.HttpTransportType.WebSockets
    //   })
    //   .configureLogging(signalR.LogLevel.Information)
    //   .configureLogging(signalR.LogLevel.Debug)
    //   .build();
    const connection = new signalR.HubConnectionBuilder()
    .withUrl("https://localhost:7184/notification", {
      // skipNegotiation: true,
      transport: signalR.HttpTransportType.WebSockets
    })
    .withAutomaticReconnect()
    .build();


    // connection.start().then(() => {
    //   console.log("Connected!");
    //   console.log("Connection ID: ", connection.connectionId); // Log the connectionId here
    // }).catch(err => console.error('SignalR Connection Error: ', err));
  
    connection.start()
    .then(() => {
      console.log('Connection established, connection ID:', connection.connectionId);
      // Send connectionId to your server if needed
    })
    .catch(err => console.log('Error connecting:', err));

    // connection.on("ReceiveNotification", message => {
    //   setNotifications(notifications => [...notifications, message]);
    //   console.log("Received notification: ", message);
    // });
  
    return () => {
      connection.stop();
    };
  }, []);

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
