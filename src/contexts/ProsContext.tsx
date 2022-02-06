import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import IPros from '../Interfaces/IPros';
import { useCookies } from 'react-cookie';
import IAppointment from '../Interfaces/IAppointment';

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
  prosLoggedIn: IPros;
  setProsLoggedIn: React.Dispatch<React.SetStateAction<IPros>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  AppointmentToDisplay: IAppointment[]; 
  setAppointmentToDisplay: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  logout: () => void;
}

const ProsContext = createContext<AppContextInterface>({
  prosLoggedIn: PRO_LOGIN_EMPTY,  
  setProsLoggedIn: () => {},
  showModal: false,
  setShowModal: () => {},
  AppointmentToDisplay: [], 
  setAppointmentToDisplay: () => {},
  logout: () => {}
});

export default ProsContext;

type Props = { children: React.ReactNode };
export const ProsContextProvider: React.FC<Props> = ({ children }) => {

  const [prosLoggedIn, setProsLoggedIn] = useState <IPros>(PRO_LOGIN_EMPTY);

  const removeCookie = useCookies(['user_token'])[2];


  // set current user to nothing !
  const logout = (): void => {
    setProsLoggedIn(PRO_LOGIN_EMPTY);
    removeCookie('user_token');
  };

  // Display The modal Appointment

  const [showModal, setShowModal] = useState<boolean>(false);
  const [AppointmentToDisplay, setAppointmentToDisplay] = useState<IAppointment[]>([]);

  // Login Pro

  useEffect(() => {
    async function getProsLogin() {
      try {
        const response = await axios.get('http://localhost:8000/api/connected', {
          withCredentials: true,
        });
        setProsLoggedIn(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getProsLogin();
  }, []);

  return (
    <ProsContext.Provider
      value={{
        prosLoggedIn,
        setProsLoggedIn,
        logout,
        showModal,
        setShowModal,
        AppointmentToDisplay,
        setAppointmentToDisplay,
      }}>
      {children}
    </ProsContext.Provider>
  );
};
