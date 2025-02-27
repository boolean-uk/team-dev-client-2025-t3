import { createContext, useState, useEffect, useContext } from 'react';
import { getUserDetails } from '../service/apiClient';
import { AuthContext } from './auth';
import jwtDecode from 'jwt-decode';

const UserContext = createContext();

const UserProvider = ({ children }) => {
  const { token } = useContext(AuthContext);
  const [user, setUser] = useState(null);

  useEffect(() => {
    if (token) {
      const { userId } = jwtDecode(token);
      getUserDetails(userId).then(setUser);
    }
  }, [token]);

  return <UserContext.Provider value={user}>{children}</UserContext.Provider>;
};

export { UserContext, UserProvider };
