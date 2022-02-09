import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { isLoggedIn, users } from '../API/request';
import { getVehicules } from '../API/requestVehicule';
import IUser from '../Interfaces/IUser';
import IVehiculeAndUser from '../Interfaces/IVehiculeAndUser';

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
  userLoggedIn: IUser;
  setUserLoggedIn: React.Dispatch<React.SetStateAction<IUser>>;
  infosUserVehicule?: IVehiculeAndUser[];
  setInfosUserVehicule: React.Dispatch<React.SetStateAction<IVehiculeAndUser[]>>;
  vehiculeDeleted: boolean;
  setVehiculeDeleted: React.Dispatch<React.SetStateAction<boolean>>;
  vehiculeGiven: boolean;
  setVehiculeGiven: React.Dispatch<React.SetStateAction<boolean>>;
  deleteAccount: boolean;
  setDeleteAccount: React.Dispatch<React.SetStateAction<boolean>>;
  posted: boolean;
  setPosted: React.Dispatch<React.SetStateAction<boolean>>;
  logout: () => void;
}

const UserContext = createContext<AppContextInterface>({
  userLoggedIn: USER_LOGIN_EMPTY,
  setUserLoggedIn: () => {},
  infosUserVehicule: [VEHICULE_INFOS_EMPTY],
  setInfosUserVehicule: () => {},
  vehiculeDeleted: false,
  setVehiculeDeleted: () => {},
  vehiculeGiven: false,
  setVehiculeGiven: () => {},
  deleteAccount: false,
  setDeleteAccount: () => {},
  posted: false,
  setPosted: () => {},
  logout: () => {},
});

export default UserContext;

type Props = { children: React.ReactNode };
export const UserContextProvider: React.FC<Props> = ({ children }) => {
  const [userLoggedIn, setUserLoggedIn] = useState<IUser>(USER_LOGIN_EMPTY);
  const [infosUserVehicule, setInfosUserVehicule] = useState<IVehiculeAndUser[]>([]);
  const [vehiculeDeleted, setVehiculeDeleted] = useState<boolean>(false);
  const [vehiculeGiven, setVehiculeGiven] = useState<boolean>(false);
  const [posted, setPosted] = useState<boolean>(false);
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);
  const navigate: NavigateFunction = useNavigate();

  const removeCookie = useCookies(['user_token'])[2];

  // set current user to nothing !
  const logout = (): void => {
    setUserLoggedIn(USER_LOGIN_EMPTY);
    removeCookie('user_token', { path: '/' });
    navigate('/');
  };

  useEffect(() => {
    async function getUserLogin() {
      try {
        const res = await isLoggedIn.get();

        if (res) {
          try {
            const user = await users.getOne(res.id_user);

            setUserLoggedIn(user);
            if (user) {
              const userVehicule = await users.getVehicules(res.id_user);
              if (userVehicule) {
                const results = await getVehicules(userVehicule);

                setInfosUserVehicule(
                  results.filter((vehicule) => vehicule.active === true),
                );
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err: any) {
        if (err.response.status === 500) {
          toast.error('Merci de vous connecter!');
          navigate('/');
        }

        navigate('/');
      }
    }
    getUserLogin();
  }, [vehiculeDeleted, vehiculeGiven, posted, deleteAccount]);

  return (
    <UserContext.Provider
      value={{
        userLoggedIn,
        setUserLoggedIn,
        infosUserVehicule,
        setInfosUserVehicule,
        deleteAccount,
        setDeleteAccount,
        vehiculeDeleted,
        setVehiculeDeleted,
        vehiculeGiven,
        setVehiculeGiven,
        posted,
        setPosted,
        logout,
      }}>
      {children}
    </UserContext.Provider>
  );
};
