import { useContext } from "react";
import { Redirect, Route } from "react-router"
import { AuthContext } from "./contexts/authContext";

const AuthRoute = ({ children, ...rest }) => {
  const authContext = useContext(AuthContext);
  console.log(authContext.authState);
  return (
    <Route
      {...rest}
      render={() => authContext.isAuthenticated() 
        ? children
        : <Redirect to='/login' />
      }
    />
  );
}

export default AuthRoute;