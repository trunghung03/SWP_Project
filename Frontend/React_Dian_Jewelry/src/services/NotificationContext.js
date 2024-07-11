import React, { createContext, useState, useContext } from 'react';

const NotificationContext = createContext();

export const useNotification = () => {
    return useContext(NotificationContext);
};

export const NotificationProvider = ({ children }) => {
    const [showNotifications, setShowNotifications] = useState(false);

    return (
        <NotificationContext.Provider value={{ showNotifications, setShowNotifications }}>
            {children}
        </NotificationContext.Provider>
    );
};
