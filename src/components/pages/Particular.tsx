import React from 'react';
import { Outlet } from 'react-router-dom';
import ModalInfos from '../Admin/Appointment/ModalInfos';
import Header from '../Header';
import ParticularSideBar from '../Particulars/SideBar/ParticularSideBar';

function Particular() {

  return (
    <div className="h-full lg:flex lg:items-center lg:h-screen">
      <div className='lg:hidden'><Header /></div>
      <div className="fixed items-center justify-center hidden w-1/5 h-screen lg:flex">
        <ParticularSideBar />
      </div>   
      <div className='w-full lg:w-full lg:flex lg:flex-col lg:justify-center lg:items-center lg:h-full lg:ml-40'>
        <Outlet />
      </div>
    </div>
  );
}

export default Particular;
