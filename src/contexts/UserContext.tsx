import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import { isLoggedIn, users } from '../API/request';
import { getVehicules } from '../API/requestVehicule';
import IUserInfos from '../Interfaces/IUserInfos';
import IVehiculeAllInfos from '../Interfaces/IVehiculeAllInfos';

const USER_LOGIN_EMPTY = {
  id_user: 0,
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  postal_code: 0,
  city: '',
  active: false,
};

const VEHICULE_INFOS_EMPTY = {
  active: false,
  brandId: 0,
  immat: '',
  model: '',
  modelId: 0,
  registrationDate: new Date(),
  type: '',
  typeId: 0,
  urlGreenCard: '',
  userId: 0,
  userName: '',
  validate: false,
};

interface AppContextInterface {
  userLogin: IUserInfos;
  setUserLogin: React.Dispatch<React.SetStateAction<IUserInfos>>;
  infosUserVehicule?: IVehiculeAllInfos[];
  setInfosUserVehicule: React.Dispatch<React.SetStateAction<IVehiculeAllInfos[]>>;
  vehiculeDeleted: boolean;
  setVehiculeDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAccount: boolean;
  setDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
  posted: boolean;
  setPosted: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const UserContext = createContext<AppContextInterface>({
  userLogin: USER_LOGIN_EMPTY,
  setUserLogin: () => {},
  infosUserVehicule: [VEHICULE_INFOS_EMPTY],
  setInfosUserVehicule: () => {},
  vehiculeDeleted: false,
  setVehiculeDeleted: () => {},
  deleteAccount: false,
  setDeleteAccount: () => {},
  posted: false,
  setPosted: () => {},
  logout: () => {},
});

export default UserContext;

type Props = { children: React.ReactNode };
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userLogin, setUserLogin] = useState<IUserInfos>(USER_LOGIN_EMPTY);
  const [infosUserVehicule, setInfosUserVehicule] = useState<IVehiculeAllInfos[]>([
    VEHICULE_INFOS_EMPTY,
  ]);
  const [vehiculeDeleted, setVehiculeDeleted] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const removeCookie = useCookies(['user_token'])[2];

  // set current user to nothing !
  const logout = (): void => {
    setUserLogin(USER_LOGIN_EMPTY);
    removeCookie('user_token');
    navigate('/');
  };

  useEffect(() => {
    async function getUserLogin() {
      try {
        const res = await isLoggedIn.get();

        if (res) {
          try {
            const user = await users.getOne(res.id_user);

            setUserLogin(user);
            if (user) {
              const userVehicule = await users.getVehicules(res.id_user);
              if (userVehicule) {
                const results = await getVehicules(userVehicule);

                setInfosUserVehicule(results);
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err: any) {
        navigate('/');
      }
    }
    getUserLogin();
  }, [vehiculeDeleted, posted, deleteAccount]);

  return (
    <UserContext.Provider
      value={{
        userLogin,
        setUserLogin,
        infosUserVehicule,
        setInfosUserVehicule,
        deleteAccount,
        setDeleteAccount,
        vehiculeDeleted,
        setVehiculeDeleted,
        posted,
        setPosted,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
