import { useContext } from 'react';
import React from 'react';
import { Outlet } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ModalServiceBook from '../Pros/Customers/ModalServiceBook';
import ModalCustomer from '../Pros/Customers/ModalCustomer';
import ProsContext from '../../contexts/ProsContext';
import { glassMorphism } from '../../variableTailwind';
import ModalAppointment from '../Pros/Appointments/ModalAppointment';
import SideBar from '../Pros/SideBar/SideBar';
import ModalCreateServiceBook from '../Pros/Customers/ModalCreateServiceBook';

function Pros() {
  
  // Return Home after logout !
  const navigate: NavigateFunction = useNavigate();

  // access userContext !
  const { showModal, appointmentToDisplay, showModalServiceBook, showCustomer, modalCreateServiceBook } = useContext(ProsContext);

  return (
    <div className="flex items-center h-screen">
      <div className="flex items-center justify-center w-1/5 h-full">
        <SideBar />
      </div>
      <div
        className={`w-4/5 flex justify-center items-center rounded-lg h-5/6 mr-6 ${glassMorphism}`}>
        <Outlet />
      </div>
      {showModal && appointmentToDisplay && (
        <ModalAppointment/>
      )}
       {showModalServiceBook && (
        <ModalServiceBook/>
      )}
      {showCustomer && (
        <ModalCustomer/>
      )}
      {modalCreateServiceBook && (
        <ModalCreateServiceBook />
      )}
    </div>
  );
}

export default Pros;
