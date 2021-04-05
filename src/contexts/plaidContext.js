import React, { useState, useContext } from 'react'
import { AuthAxiosContext } from './authAxios';
const PlaidContext = React.createContext()

const PlaidProvider = ({ children }) => {
  const { authAxios } = useContext(AuthAxiosContext);

  const setPlaid = ({ linkToken, expiration, requestId }) => {
    localStorage.setItem('plaidLinkToken', linkToken);
    localStorage.setItem('plaidExpiration', expiration);
    localStorage.setItem('plaidRequestId', requestId);
    setPlaidState({
      linkToken,
      expiration,
      requestId
    });
  }

  return (
    <PlaidContext.Provider value={{
      plaidState,
      setPlaid,
      generateLinkToken
    }}>
      {children}
    </PlaidContext.Provider>
  )
}

export { PlaidProvider, PlaidContext }