import React from 'react'
import { Navigate } from 'react-router-dom'

export const PrivateRoute = ({ children }) => {

  const isLoggedIn = JSON.parse(localStorage.getItem("mirandaDashboardLogin") ) || false;

  return isLoggedIn ? children : <Navigate to="/login" />;
}