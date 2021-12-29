import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppContextInterface {
  userLogin: any;
  setUserLogin: Function;
}

const UserContext = createContext<AppContextInterface | null>(null);

export default UserContext;

export const UserContextProvider = ({ children }: any) => {
  const [userLogin, setUserLogin] = useState<any>([]);
  const navigate = useNavigate();

  useEffect(() => {
    async function getUserLogin() {
      try {
        const response = await axios.get('http://localhost:8000/api/users/login', {
          withCredentials: true,
        });
        setUserLogin([response.data][0]);
      } catch (err: any) {
        navigate('/');
      }
    }
    getUserLogin();
  }, []);

  return (
    <UserContext.Provider value={{ userLogin, setUserLogin }}>
      {children}
    </UserContext.Provider>
  );
};
