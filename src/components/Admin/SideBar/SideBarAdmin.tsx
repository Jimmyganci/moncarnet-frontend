import React, { useContext } from 'react';

import car from '../../../assets/car.png';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import customers from '../../../assets/minimalist_logos/customers.svg';
import home from '../../../assets/minimalist_logos/home.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import AdminContext from '../../../contexts/AdminContext';
import { glassMorphism } from '../../../variableTailwind';
import Logo from '../../Logo';
import SideLink from './SideLinkAdmin';

const SideBarAdmin = () => {
  const { logout }: any = useContext(AdminContext);
  const linkArray = [
    {
      label: 'Accueil',
      path: '/admin/home',
      logo: home,
      alt: 'accueil logo',
    },
    {
      label: 'Utilisateurs',
      path: '/admin/customers',
      logo: customers,
      alt: 'clients logo',
    },
    {
      label: 'RDVs',
      path: '/admin/appointments',
      logo: calendar,
      alt: 'appointment logo',
    },
    {
      label: 'Vehicules',
      path: '/admin/vehicules',
      logo: car,
      alt: 'factures logo',
    },
    {
      label: 'Mon Profil',
      path: '/admin/profil',
      logo: profile,
      alt: 'profil logo',
    },
  ];

  return (
    <div className={`${glassMorphism} w-1/6 h-screen fixed`}>
      <div className="flex items-center justify-center w-full pb-4 pl-3 pr-3 h-1/6">
        <Logo />
      </div>
      <span className="w-5/6 border-b-2"></span>
      <div className="w-full h-5/6">
        <nav className="h-full">
          <ul className="h-full ">
            {linkArray.map((e, i) => (
              <SideLink key={i} label={e.label} path={e.path} logo={e.logo} alt={e.alt} />
            ))}
            <button
              className="mt-4 text-xl font-medium tracking-widest"
              onClick={() => {
                logout();
              }}>
              Se déconnecter
            </button>
          </ul>
        </nav>
      </div>
    </div>
  );
};

export default SideBarAdmin;
