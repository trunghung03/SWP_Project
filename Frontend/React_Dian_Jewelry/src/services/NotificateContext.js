import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();
export const NotificationProvider = ({ children }) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <NotificationContext.Provider value={{ showNotifications, setShowNotifications }}>
      {children}
    </NotificationContext.Provider>
  );
};

export const useNotification = () => useContext(NotificationContext);
