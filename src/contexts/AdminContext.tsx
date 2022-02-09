import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

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
  renderState: boolean;
  setRenderState: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
};

const AdminContext = createContext<AdminContent>({
  adminLogin: adminLoginEmpty,
  setAdminLogin: () => {},
  renderState: false,
  setRenderState: () => {},
  logout: () => {},
});

export default AdminContext;

export const AdminContextProvider: React.FC<Props> = ({ children }) => {
  const [adminLogin, setAdminLogin] = useState(adminLoginEmpty);
  const [renderState, setRenderState] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const removeCookie = useCookies(['user_token'])[2];

  // set current user to nothing !
  const logout = () => {
    setAdminLogin(adminLoginEmpty);
    removeCookie('user_token', { path: '/' });
    navigate('/');
  };

  useEffect(() => {
    async function getAdminLogin() {
      try {
        const res = await isLoggedIn.get();

        const getInfosAdmin = await admin.getOne(res.id_user);
        setAdminLogin(getInfosAdmin);
      } catch (err: any) {
        if (err.response.status === 500) {
          toast.error('Merci de vous connecter!');
          navigate('/');
        }
      }
    }
    getAdminLogin();
  }, [removeCookie]);

  return (
    <AdminContext.Provider
      value={{
        adminLogin,
        setAdminLogin,
        logout,
        setRenderState,
        renderState,
      }}>
      {children}
    </AdminContext.Provider>
  );
};
