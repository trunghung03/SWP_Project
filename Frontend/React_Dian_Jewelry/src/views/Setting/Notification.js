import React from 'react';

const Notification = ({ notifications }) => {
  return (
    <div className="notification-popup">
      <div className="notification-header">Notifications</div>
      {notifications.length > 0 ? (
        notifications.map((notification, index) => (
          <div key={index} className="notification-item">
            {notification.message}
          </div>
        ))
      ) : (
        <div className="notification-item">No new notifications</div>
      )}
    </div>
  );
};

export default Notification;
