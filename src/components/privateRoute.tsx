import React, { ReactNode, useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthContext } from './authProvider';

export const PrivateRoute: React.FC<{children: ReactNode;}> = ({ children }) => {
  const auth = useContext(AuthContext)

  const isLoggedIn = auth.authState.loggedIn;

  return isLoggedIn ? children : <Navigate to="/login" />;
}