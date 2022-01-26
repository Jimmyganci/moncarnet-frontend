import React from 'react';
import SideLink from './ParticularSideLink';
import { glassMorphism } from '../../../variableTailwind';
import Logo from '../../Logo';
import home from '../../../assets/minimalist_logos/home.svg';
import car from '../../../assets/minimalist_logos/car.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';


const ParticularSideBar = () => {

  const linkArray = [
    {
      label : "Accueil",
      path : "/particular/home",
      logo : home,
      alt : "accueil logo"
    },
    {
      label : "Mon Profil",
      path : "/particular/infos",
      logo : profile,
      alt : "profil logo"
    },
    {
      label : "Mes Véhicules",
      path : "/particular/vehicules",
      logo : car,
      alt : "cars logo"
    },
    {
      label : "Mes RDVs",
      path : "/particular/appointments",
      logo : calendar,
      alt : "rdv logo"
    },
];

  return (
    <div className={`${glassMorphism} w-5/6 h-5/6 rounded-lg flex flex-col items-center`}>
      <div className='w-full h-1/6 flex justify-center items-center pb-4 pr-3 pl-3'>
        <Logo location="particularSideBar"/>
      </div>
      <span className='w-5/6 border-b-2 my-8'></span>
      <div className='h-5/6 w-full'>
        <nav className='h-full'>
          <ul className='h-full '>
            {linkArray.map((e, i) =>
                <SideLink
                key = {i}
                label = {e.label}
                path = {e.path}
                logo = {e.logo}
                alt = {e.alt}
                />
            )}
          </ul>
        </nav>
      </div>        
    </div>
  );
};

export default ParticularSideBar;
