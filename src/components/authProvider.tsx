import React, { createContext, ReactNode, useEffect, useReducer } from 'react'

interface AuthData{
  loggedIn: boolean, 
  email: string, 
  name: string 
}

const defaultAuth:AuthData = {
  loggedIn: false, 
  email: "", 
  name: "" 
}

type AuthAction = 
  | { type: 'logIn'; payload: { email: string; name: string } }
  | { type: 'logOut' }
  | { type: 'changeUser'; payload: { email: string; name: string }};

interface AuthContextProps {
  authState: AuthData;
  authDispatch: React.Dispatch<AuthAction>;
}

export const AuthContext = createContext<AuthContextProps>({
  authState: defaultAuth,
  authDispatch: () => {}
});

export const AuthProvider: React.FC<{children: ReactNode;}> = ({ children }) => {
  const [authState, authDispatch] = useReducer(authReducer, getInitialAuthState());

  useEffect(() => {
    localStorage.setItem("AUTH_KEY", JSON.stringify(authState))
  }, [authState])

  return(
    <AuthContext.Provider value = {{authState, authDispatch}}>
      {children}
    </AuthContext.Provider>
  )
}

const authReducer = (state:AuthData, action:AuthAction) => {
  switch (action.type) {
    case 'logIn':
      return { loggedIn: true, email: action.payload.email, name: action.payload.name };
    case 'logOut':
        return defaultAuth;
    case 'changeUser':
        return { ...state,  email: action.payload.email, name: action.payload.name };
  }
}

function getInitialAuthState(){
  const authState = JSON.parse(localStorage.getItem("AUTH_KEY") || "{}");

  return isAuthData(authState) ? authState : defaultAuth;
}

function isAuthData(obj: any): obj is AuthData {
  return typeof obj === 'object' &&
         typeof obj.loggedIn === 'boolean' &&
         typeof obj.email === 'string' &&
         typeof obj.name === 'string';
}