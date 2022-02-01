import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';

interface AppContextInterface {
  prosLogin: any;
  setProsLogin: Function;
  logOut: Function;
  showModal: boolean;
  setShowModal: Function;
  rdvToDisplay: Array<any>;
  setRdvToDisplay: Function;
}

const ProsContext = createContext<AppContextInterface | null>(null);

export default ProsContext;

export const ProsContextProvider = ({ children }: any) => {
  const [prosLogin, setProsLogin] = useState<Array<object>>([]);

  // set current user to nothing !
  const logOut = async function () {
    return await axios.post(
      'http://localhost:8000/api/logout',
      {},
      { withCredentials: true },
    );
  };

  // Display The modal Rdv

  const [showModal, setShowModal] = useState(false);
  const [rdvToDisplay, setRdvToDisplay] = useState([]);

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
    <ProsContext.Provider value={{ prosLogin, setProsLogin, logOut, showModal, setShowModal, rdvToDisplay, setRdvToDisplay }}>
      {children}
    </ProsContext.Provider>
  );
};
