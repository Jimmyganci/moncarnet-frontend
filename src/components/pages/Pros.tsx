import React from 'react';
import { Outlet } from 'react-router-dom';
import SideBar from '../SideBar';

function Pros() {
  return (
    <div className="min-h-screen h-full flex">
      <div className='w-1/5 flex justify-center items-center'>
        <SideBar />
      </div>
      <div className='w-4/5 right-0'>
        <Outlet />
      </div>

    </div>
  );
}

export default Pros;
