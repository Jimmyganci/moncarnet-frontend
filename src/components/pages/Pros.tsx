import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../Pros/SideBar/SideBar';
import { glassMorphism } from '../../variableTailwind';


function Pros() {
  return (
    <div className="h-screen flex items-center">
      <div className='w-1/5 h-full flex justify-center items-center'>
        <SideBar />
      </div>
      <div className={`w-4/5 flex justify-center items-center rounded-lg h-5/6 mr-6 ${glassMorphism}`}>
        <Outlet />
      </div>
    </div>
  );
}

export default Pros;
