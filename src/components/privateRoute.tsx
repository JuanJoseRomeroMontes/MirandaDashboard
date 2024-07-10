import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AuthProviderProps } from '../utils';
import { AuthContext } from './authProvider';

export const PrivateRoute: React.FC<AuthProviderProps> = ({ children }) => {
  const auth = useContext(AuthContext)

  const isLoggedIn = auth.authState.loggedIn;

  return isLoggedIn ? children : <Navigate to="/login" />;
}