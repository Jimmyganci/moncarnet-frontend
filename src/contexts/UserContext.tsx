import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface AppContextInterface {
  userLogin: any;
  setUserLogin: Function;
}

const UserContext = createContext<AppContextInterface | null>(null);

export default UserContext;

export const UserContextProvider = ({ children }: any) => {
  const [userLogin, setUserLogin] = useState<any>([]);
  console.log(userLogin);

  useEffect(() => {
    async function getUserLogin() {
      try {
        const response = await axios.get('http://localhost:8000/api/users/login', {
          withCredentials: true,
        });
        setUserLogin([response.data]);
      } catch (err) {
        console.log(err);
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
