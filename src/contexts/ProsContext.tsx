import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useCookies } from 'react-cookie';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { pros } from '../API/request';
import IAppointment from '../Interfaces/IAppointment';
import IPros from '../Interfaces/IPros';
import IUser from '../Interfaces/IUser';

const PRO_LOGIN_EMPTY = {
  id_user: 0,
  name: '',
  address: '',
  email: '',
  city: '',
  postal_code: 0,
  siret: '',
  phone: '',
};

interface AppContextInterface {
  prosLoggedIn: IPros;
  setProsLoggedIn: React.Dispatch<React.SetStateAction<IPros>>;
  showModal: boolean;
  setShowModal: React.Dispatch<React.SetStateAction<boolean>>;
  appointmentToDisplay: IAppointment[];
  setAppointmentToDisplay: React.Dispatch<React.SetStateAction<IAppointment[]>>;
  appointmentId: number;
  setAppointmentId: React.Dispatch<React.SetStateAction<number>>;
  logout: () => void;
  showModalServiceBook: boolean;
  setShowModalServiceBook: React.Dispatch<React.SetStateAction<boolean>>;
  showServiceBook: boolean;
  setShowServiceBook: React.Dispatch<React.SetStateAction<boolean>>;
  showCustomer: boolean;
  setShowCustomer: React.Dispatch<React.SetStateAction<boolean>>;
  userArray: IUser[];
  setUserArray: React.Dispatch<React.SetStateAction<IUser[]>>;
  searchCustomer: string;
  setSearchCustomer: React.Dispatch<React.SetStateAction<string>>;
  immatServiceBook: string;
  setImmatServiceBook: React.Dispatch<React.SetStateAction<string>>;
  modalCreateServiceBook: boolean;
  setModalCreateServiceBook: React.Dispatch<React.SetStateAction<boolean>>;
}

const ProsContext = createContext<AppContextInterface>({
  prosLoggedIn: PRO_LOGIN_EMPTY,
  setProsLoggedIn: () => {},
  showModal: false,
  setShowModal: () => {},
  appointmentToDisplay: [],
  setAppointmentToDisplay: () => {},
  appointmentId: 0,
  setAppointmentId: () => {},
  logout: () => {},
  showModalServiceBook: false,
  setShowModalServiceBook: () => {},
  showServiceBook: false,
  setShowServiceBook: () => {},
  showCustomer: false,
  setShowCustomer: () => {},
  userArray: [],
  setUserArray: () => {},
  searchCustomer: '',
  setSearchCustomer: () => {},
  immatServiceBook: '',
  setImmatServiceBook: () => {},
  modalCreateServiceBook: false,
  setModalCreateServiceBook: () => {},
});

export default ProsContext;

type Props = { children: React.ReactNode };
export const ProsContextProvider: React.FC<Props> = ({ children }) => {
  const [prosLoggedIn, setProsLoggedIn] = useState<IPros>(PRO_LOGIN_EMPTY);
  const navigate: NavigateFunction = useNavigate();

  const removeCookie = useCookies(['user_token'])[2];

  // set current user to nothing !
  const logout = (): void => {
    setProsLoggedIn(PRO_LOGIN_EMPTY);
    removeCookie('user_token', { path: '/' });
    navigate('/');
  };

  // Display The modal Appointment

  const [showModal, setShowModal] = useState<boolean>(false);
  const [appointmentToDisplay, setAppointmentToDisplay] = useState<IAppointment[]>([]);
  const [userArray, setUserArray] = useState<IUser[]>([]);
  const [appointmentId, setAppointmentId] = useState<number>(0);
  const [showModalServiceBook, setShowModalServiceBook] = useState(false);
  const [showServiceBook, setShowServiceBook] = useState<boolean>(false);
  const [showCustomer, setShowCustomer] = useState<boolean>(false);
  const [searchCustomer, setSearchCustomer] = useState<string>('');
  const [immatServiceBook, setImmatServiceBook] = useState<string>('');
  const [modalCreateServiceBook, setModalCreateServiceBook] = useState<boolean>(false);

  // Login Pro

  async function getProsLogin() {
    try {
      const prosLoggedIn = await axios.get('http://localhost:8000/api/connected', {
        withCredentials: true,
      });
      setProsLoggedIn(prosLoggedIn.data);
      if (prosLoggedIn.status === 200) {
        const appointments = await pros.getAppointments(prosLoggedIn.data.id_user);
        setAppointmentToDisplay(appointments);
      }
    } catch (err: any) {
      if (err.response.status === 500) {
        toast.error('Merci de vous connecter!');
        navigate('/');
      }
    }
  }

  useEffect(() => {
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
        appointmentToDisplay,
        setAppointmentToDisplay,
        setAppointmentId,
        appointmentId,
        showModalServiceBook,
        setShowModalServiceBook,
        showServiceBook,
        setShowServiceBook,
        showCustomer,
        setShowCustomer,
        userArray,
        setUserArray,
        searchCustomer,
        setSearchCustomer,
        immatServiceBook,
        setImmatServiceBook,
        modalCreateServiceBook,
        setModalCreateServiceBook,
      }}>
      {children}
    </ProsContext.Provider>
  );
};
