import React, { useState } from 'react'
import api from '../api/axios.api';
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState();
  const [authToken, setAuthToken] = useState();

  // register function
  const register = async (formValues) => {
    try {
      const response = await api.post('user/new', formValues);
      setUser(response.data.user);
      setAuthToken(response.data.accessToken);
    } catch (error) {
      console.log(error);
    }
  };

  const logout = () => {
    setUser(null);
    setAuthToken(null);
  }

  return (
    <AuthContext.Provider value={{
      user,
      authToken,
      register,
      logout
    }}>
      {children}
    </AuthContext.Provider>
  )
}

const AuthConsumer = ({ children }) => {
  return (
    <AuthContext.Consumer>
      {context => {
        if (context === undefined) {
          throw new Error('AuthConsumer must be used within AuthProvider')
        }
        return children(context)
      }}
    </AuthContext.Consumer>
  )
}

const useAuthState = () => {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuthState must be used within AuthProvider')
  }
  return context
}

export { AuthProvider, AuthConsumer, useAuthState }
