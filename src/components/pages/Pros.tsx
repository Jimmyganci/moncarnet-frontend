import { useContext } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import returnArrow from '../../assets/return.png';
import ProsContext from '../../contexts/ProsContext';
import { glassMorphism } from '../../variableTailwind';
import ModalAppointment from '../Pros/Appointments/ModalAppointment';
import SideBar from '../Pros/SideBar/SideBar';

function Pros() {
  // Return Home after logout !
  const navigate: NavigateFunction = useNavigate();

  // access userContext !
  const { logOut, showModal, rdvToDisplay }: any = useContext(ProsContext);

  return (
    <div className="flex items-center h-screen">
      <button
        onClick={() => {
          logOut().then(() => {
            return navigate('/login-pro');
          });
        }}
        className={`flex p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-primary-hovered h-10 ml-7 absolute top-2 text-white`}>
        <img src={returnArrow} alt="return" className="w-6 h-6 mr-2" />
        Se déconnecter
      </button>
      <div className="flex items-center justify-center w-1/5 h-full">
        <SideBar />
      </div>
      <div
        className={`w-4/5 flex justify-center items-center rounded-lg h-5/6 mr-6 ${glassMorphism}`}>
        <Outlet />
      </div>
      {showModal && rdvToDisplay && (
        <ModalAppointment
          date={rdvToDisplay[0]}
          user={rdvToDisplay[1]}
          comment={rdvToDisplay[2]}
          id_appointment={rdvToDisplay[3]}
          immat={rdvToDisplay}
        />
      )}
    </div>
  );
}

export default Pros;
