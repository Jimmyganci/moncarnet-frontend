import { useContext } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { appointment } from '../../API/request';
import returnArrow from '../../assets/return.png';
import ProsContext from '../../contexts/ProsContext';
import { glassMorphism } from '../../variableTailwind';
import ModalAppointment from '../Pros/Appointments/ModalAppointment';
import SideBar from '../Pros/SideBar/SideBar';

function Pros() {
  // Return Home after logout !
  const navigate: NavigateFunction = useNavigate();

  // access userContext !
  const { logout, showModal, appointmentToDisplay } = useContext(ProsContext);

  async function deleteAppointment(appointmentId: number) {
    try {
      const res = await appointment.delete(appointmentId);
      setTimeout(() => location.reload(), 1500);
      if (res) toast.success('Votre rendez-vous a bien été supprimé');
    } catch (err) {
      if (err) toast.error('Impossible de supprimer ce rendez-vous');
    }
  }

  return (
    <div className="flex items-center h-screen">
      <button
        onClick={() => {
          logout();
          navigate('/login-pro');
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
      {showModal && appointmentToDisplay && (
        <ModalAppointment deleteAppointment={deleteAppointment} />
      )}
    </div>
  );
}

export default Pros;
