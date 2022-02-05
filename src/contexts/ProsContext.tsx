import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import IPros from '../Interfaces/IPros';
import { useCookies } from 'react-cookie';
import IProsInfos from '../Interfaces/IProsInfos';

const PRO_LOGIN_EMPTY = {
  id_user: 0,
  name: '',
  address: '',
  email: '',
  city: '',
  postal_code: 0,
  siret: '',
  phone: ''
};

interface AppContextInterface {
  prosLogin: IPros;
  setProsLogin: React.Dispatch<React.SetStateAction<IPros>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  rdvToDisplay: IProsInfos[]; 
  setRdvToDisplay: React.Dispatch<React.SetStateAction<IProsInfos[]>>;
  logout: () => void;
}

const ProsContext = createContext<AppContextInterface>({
  prosLogin: PRO_LOGIN_EMPTY,  
  setProsLogin: () => {},
  showModal: false,
  setShowModal: () => {},
  rdvToDisplay: [], 
  setRdvToDisplay: () => {},
  logout: () => {}
});

export default ProsContext;

type Props = { children: React.ReactNode };
export const ProsContextProvider: React.FC<Props> = ({ children }) => {

  const [prosLogin, setProsLogin] = useState <IPros>(PRO_LOGIN_EMPTY);

  const removeCookie = useCookies(['user_token'])[2];


  // set current user to nothing !
  const logout = (): void => {
    setProsLogin(PRO_LOGIN_EMPTY);
    removeCookie('user_token');
  };

  // Display The modal Rdv

  const [showModal, setShowModal] = useState<boolean>(false);
  const [rdvToDisplay, setRdvToDisplay] = useState<IProsInfos[]>([]);

  // Login Pro

  useEffect(() => {
    async function getProsLogin() {
      try {
        const response = await axios.get('http://localhost:8000/api/connected', {
          withCredentials: true,
        });
        setProsLogin(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProsLogin();
  }, []);

  return (
    <ProsContext.Provider
      value={{
        prosLogin,
        setProsLogin,
        logout,
        showModal,
        setShowModal,
        rdvToDisplay,
        setRdvToDisplay,
      }}>
      {children}
    </ProsContext.Provider>
  );
};
