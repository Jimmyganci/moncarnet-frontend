import React from 'react';
import { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';
import ProsContext from '../../../contexts/ProsContext';
import logo from '../../../assets/logo.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import customers from '../../../assets/minimalist_logos/customers.svg';
import home from '../../../assets/minimalist_logos/home.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import { glassMorphism } from '../../../variableTailwind';
import SideLink from './SideLink';

const SideBar = () => {

    // access userContext !
    const { logout } = useContext(ProsContext);

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
      label: 'Mes Clients',
      path: '/pros/customers',
      logo: customers,
      alt: 'customers logo',
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
        <nav className='h-5/6'>
          <ul className="h-full ">
            {linkArray.map((link, index) => (
              <SideLink key={index} label={link.label} path={link.path} logo={link.logo} alt={link.alt} />
            ))}
          </ul>
          <button
            className="mt-4 text-2xl font-medium tracking-widest"
            onClick={() => {
              logout()
            }}>
            Se déconnecter
          </button>
        </nav>
    </div>
  );
};

export default SideBar;
