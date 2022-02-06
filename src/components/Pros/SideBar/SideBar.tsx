import React from 'react';

import logo from '../../../assets/logo.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import home from '../../../assets/minimalist_logos/home.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import { glassMorphism, h3 } from '../../../variableTailwind';
import SideLink from './SideLink';

const SideBar = () => {
  const linkArray = [
    {
      label: 'Accueil',
      path: '/pros/home',
      logo: home,
      alt: 'accueil logo',
    },
    {
      label: 'Mes RDVs',
      path: '/pros/appointments',
      logo: calendar,
      alt: 'appointment logo',
    },
    {
      label: 'Mon Profil',
      path: '/pros/profile',
      logo: profile,
      alt: 'profil logo',
    },
  ];

  return (
    <div className={`${glassMorphism} w-5/6 h-5/6 rounded-lg flex flex-col items-center`}>
      <div className="flex items-center justify-center w-full pl-3 pr-3 h-1/6">
        <img src={logo} alt="logo mon carnet" className="h-10" />
        <p className="ml-4 text-lg text-white">Mon Carnet</p>
      </div>
      <span className="w-5/6 border-b-2"></span>
      <div className="w-full h-5/6">
        <nav className="h-full">
          <ul className="h-full ">
            {linkArray.map((e, i) => (
              <SideLink key={i} label={e.label} path={e.path} logo={e.logo} alt={e.alt} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBar;
