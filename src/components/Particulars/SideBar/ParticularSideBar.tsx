import React from 'react';
import SideLink from './ParticularSideLink';
import { glassMorphism } from '../../../variableTailwind';
import Logo from '../../Logo';
import home from '../../../assets/minimalist_logos/home.svg';
import car from '../../../assets/minimalist_logos/car.svg';
import garage from '../../../assets/minimalist_logos/garage.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import { useContext } from 'react';
import UserContext from '../../../contexts/UserContext';
import { NavigateFunction, useNavigate } from 'react-router-dom';

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
      path: '/particular/garage',
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
      <div className="w-full h-1/6 flex justify-center items-center pb-4 pr-3 pl-3">
        <Logo location="particularSideBar" />
      </div>
      <span className="w-5/6 border-b-2 my-8"></span>
      <div className="h-5/6 w-full">
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
            }}
          >
            Se déconnecter
          </button>
        </nav>
      </div>
    </div>
  );
};

export default ParticularSideBar;
