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
    
      // Define a timeout function
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
    
      // Use Promise.race to implement the timeout for the connection start
      startConnectionWithTimeout(30000) // 30 seconds timeout
        .then(() => {
          console.log('Connection established, connection ID:', connection.connectionId);
          setConnectionEstablished(true);
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
