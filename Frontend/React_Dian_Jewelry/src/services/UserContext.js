import React, { createContext, useState, useEffect } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState({
    // firstName: localStorage.getItem('firstName') || '',
    // lastName: localStorage.getItem('lastName') || '',
    // email: localStorage.getItem('email') || '',
    // points: localStorage.getItem('points') || 0,
  });

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setUser({
        firstName: localStorage.getItem("firstName"),
        lastName: localStorage.getItem("lastName"),
        email: localStorage.getItem("email"),
        points: localStorage.getItem("points"),
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem('firstName', user.firstName);
    localStorage.setItem('lastName', user.lastName);
    localStorage.setItem('email', user.email);
    localStorage.setItem('points', user.points);
  }, [user]);

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
};
