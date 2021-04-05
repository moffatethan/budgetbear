import axios from 'axios';
import React, { useContext } from 'react';
import { AuthContext } from './authContext';

const AuthAxiosContext = React.createContext();

const AuthAxiosProvider = ({ children }) => {
  const authContext = useContext(AuthContext);

  const authAxios = axios.create({
    baseURL: 'http://localhost:3000/api/'
  });

  authAxios.interceptors.request.use(
    config => {
      config.headers.Authorization = `Bearer ${authContext.authState.token}`
      return config;
    },
    error => {
      return Promise.reject(error);
    }
  );

  return (
    <AuthAxiosContext.Provider value={{ authAxios }}>
      {children}
    </AuthAxiosContext.Provider>
  );

}

export { AuthAxiosContext, AuthAxiosProvider }
