import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

import { admin, isLoggin } from '../API/request';
import AppContextInterface from '../Interfaces/IAdminContext';

const AdminContext = createContext<AppContextInterface | null>(null);

export default AdminContext;

export const AdminContextProvider = ({ children }: any) => {
  const [adminLogin, setAdminLogin] = useState([]);

  // set current user to nothing !
  const logOut = async function () {
    return await axios.post(
      'http://localhost:8000/api/auth/logout',
      {},
      { withCredentials: true },
    );
  };

  useEffect(() => {
    async function getAdminLogin() {
      try {
        const response = await isLoggin.get();
        if (response) {
          const getInfosAdmin = await admin.getOne(response.id_user);
          setAdminLogin(getInfosAdmin);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAdminLogin();
  }, []);

  return (
    <AdminContext.Provider value={{ adminLogin, setAdminLogin, logOut }}>
      {children}
    </AdminContext.Provider>
  );
};
