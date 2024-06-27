import React, { createContext, useEffect, useReducer } from 'react'

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState())

  useEffect(() => {
    localStorage.setItem("AUTH_KEY", JSON.stringify(authState))
  }, [authState])

  return(
    <AuthContext.Provider value = {{authState, authDispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

const authReducer = (state, action) => {
  switch (action.type) {
    case 'logIn':
      return { loggedIn: true, email: action.value.email, name: action.value.name };
    case 'logOut':
        return { loggedIn: false, email: null, name: null };
    case 'changeUser':
        return { ...state,  email: action.value.email, name: action.value.name };
  }
}

function getInitialAuthState(){
  return JSON.parse(localStorage.getItem("AUTH_KEY")) || { loggedIn: false, email: null, name: null };
}