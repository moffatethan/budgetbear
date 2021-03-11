import * as React from 'react'
const AuthContext = React.createContext()

const AuthProvider = ({ children }) => {
  return (
    <AuthContext.Provider value={{hello: "p"}}>
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
