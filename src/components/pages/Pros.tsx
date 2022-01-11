import React from 'react';
import { Outlet, Link } from 'react-router-dom';
import SideBar from '../Pros/SideBar/SideBar';
import { glassMorphism } from '../../variableTailwind';
import returnArrow from '../../assets/return.png';


function Pros() {
  return (
    <div className="h-screen flex items-center">
      <Link to="/login-pro" className="absolute top-2">
        <button
          className={`p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-primary-hovered h-7 w-7 ml-2`}>
          <img src={returnArrow} alt="return" className="w-full h-full" />
        </button>
      </Link>
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
