import React from 'react';
import { useContext } from 'react';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import calendar from '../../../assets/minimalist_logos/calendar.svg';
import car from '../../../assets/minimalist_logos/car.svg';
import garage from '../../../assets/minimalist_logos/garage.svg';
import home from '../../../assets/minimalist_logos/home.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import UserContext from '../../../contexts/UserContext';
import { glassMorphism } from '../../../variableTailwind';
import Logo from '../../Logo';
import SideLink from './ParticularSideLink';

const ParticularSideBar = () => {
  // Return Home after logout !
  const navigate: NavigateFunction = useNavigate();

  // access userContext !
  const { logOut }: any = useContext(UserContext);

  const linkArray = [
    {
      label: 'Accueil',
      path: '/particular/home',
      logo: home,
      alt: 'accueil logo',
    },
    {
      label: 'Mon Profil',
      path: '/particular/infos',
      logo: profile,
      alt: 'profil logo',
    },
    {
      label: 'Mes Véhicules',
      path: '/particular/vehicules',
      logo: car,
      alt: 'cars logo',
    },
    {
      label: 'Mes Garages',
      path: '/particular/mygarages',
      logo: garage,
      alt: 'garage logo',
    },
    {
      label: 'Mes RDVs',
      path: '/particular/appointments',
      logo: calendar,
      alt: 'rdv logo',
    },
  ];

  return (
    <div className={`${glassMorphism} w-5/6 h-5/6 rounded-lg flex flex-col items-center`}>
      <div className="flex items-center justify-center w-full pb-4 pl-3 pr-3 h-1/6">
        <Logo location="particularSideBar" />
      </div>
      <span className="w-5/6 my-8 border-b-2"></span>
      <div className="w-full h-5/6">
        <nav className="h-full">
          <ul className="h-full ">
            {linkArray.map((e, i) => (
              <SideLink key={i} label={e.label} path={e.path} logo={e.logo} alt={e.alt} />
            ))}
          </ul>
          <button
            className="mt-4 text-2xl font-medium tracking-widest"
            onClick={() => {
              logOut().then(() => {
                return navigate('/');
              });
            }}>
            Se déconnecter
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ParticularSideBar;
