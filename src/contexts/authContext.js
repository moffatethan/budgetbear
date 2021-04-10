import React, { useState } from 'react'
import { useHistory } from 'react-router';
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  const history = useHistory();
  const token = localStorage.getItem('token');
  const expires = localStorage.getItem('expires');
  const user = localStorage.getItem('user');

  const setUser = () => {
    try {
      return JSON.parse(user);
    } catch (err) {
      return {};
    }
  }
  
  const [authState, setAuthState] = useState({
    token,
    user: setUser(),
    expires
  });

  const addGoal = (goal) => {
    setAuthState({
      ...authState,
      user: {
        ...authState.user,
        goals: [...authState.user.goals, goal]
      }
    });
    localStorage.setItem('user', JSON.stringify(authState.user));
  }

  const setPlaidLinked = (status) => {
    const user = {
      ...authState.user,
      plaidLinked: status
    };
    localStorage.setItem('user', JSON.stringify(user));
    setAuthState({
      ...authState,
      user
    });
  }

  const setAuth = ({ token, user, expires }) => {
    localStorage.setItem('token', token);
    localStorage.setItem('user', JSON.stringify(user));
    localStorage.setItem('expires', expires);
    setAuthState({
      token,
      user,
      expires
    });
  }

  const isAuthenticated = () => {
    if (!authState.token || !authState.expires) {
      return false;
    }
    return (
      new Date().getTime() / 1000 < authState.expires
    );
  }

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('expires');
    localStorage.removeItem('user');
    setAuthState({});
    history.push('/login');
  }

  return (
    <AuthContext.Provider value={{
      authState,
      setAuth,
      isAuthenticated,
      logout,
      setPlaidLinked,
      addGoal
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

export { AuthProvider, AuthConsumer, AuthContext }