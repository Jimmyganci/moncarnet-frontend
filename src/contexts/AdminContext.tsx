import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { admin, isLoggedIn } from '../API/request';
import IAdmin from '../Interfaces/IAdmin';

type Props = { children: React.ReactNode };

const adminLoginEmpty = {
  id_admin: 0,
  firstname: '',
  lastname: '',
  email: '',
  hashedPassword: '',
};

type AdminContent = {
  adminLogin: IAdmin;
  setAdminLogin: React.Dispatch<React.SetStateAction<IAdmin>>;
  logout: () => void;
};

const AdminContext = createContext<AdminContent>({
  adminLogin: adminLoginEmpty,
  setAdminLogin: () => {},
  logout: () => {},
});

export default AdminContext;

export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const [adminLogin, setAdminLogin] = useState(adminLoginEmpty);
  const navigate: NavigateFunction = useNavigate();

  const removeCookie = useCookies(['user_token'])[2];

  // set current user to nothing !
  const logout = (): void => {
    setAdminLogin(adminLoginEmpty);
    removeCookie('user_token');
    navigate('/');
  };

  useEffect(() => {
    async function getAdminLogin() {
      try {
        const res = await isLoggedIn.get();

        const getInfosAdmin = await admin.getOne(res.id_user);
        setAdminLogin(getInfosAdmin);
      } catch (err) {
        console.log(err);
      }
    }
    getAdminLogin();
  }, []);

  return (
    <AdminContext.Provider value={{ adminLogin, setAdminLogin, logout }}>
      {children}
    </AdminContext.Provider>
  );
};
