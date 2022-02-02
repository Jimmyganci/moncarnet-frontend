import React from 'react';

import logo from '../../../assets/logo.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
<<<<<<< Updated upstream
import home from '../../../assets/minimalist_logos/home.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
=======
import customers from '../../../assets/minimalist_logos/customers.svg';
import home from '../../../assets/minimalist_logos/home.svg';
import invoice from '../../../assets/minimalist_logos/invoice.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';
import quote from '../../../assets/minimalist_logos/quote.svg';
>>>>>>> Stashed changes
import { glassMorphism, h3 } from '../../../variableTailwind';
import SideLink from './SideLink';

const SideBar = () => {
  const linkArray = [
    {
      label: 'Accueil',
      path: '/pros/home',
      logo: home,
      alt: 'accueil logo',
<<<<<<< Updated upstream
    },
    {
      label: 'Mes RDVs',
      path: '/pros/appointments',
      logo: calendar,
      alt: 'rdv logo',
=======
    },
    {
      label: 'Mes Clients',
      path: '/pros/customers',
      logo: customers,
      alt: 'clients logo',
    },
    {
      label: 'Mes RDVs',
      path: '/pros/appointments',
      logo: calendar,
      alt: 'rdv logo',
    },
    {
      label: 'Mes Factures',
      path: '/pros/invoices',
      logo: invoice,
      alt: 'factures logo',
    },
    {
      label: 'Mes Devis',
      path: '/pros/quotes',
      logo: quote,
      alt: 'devis logo',
>>>>>>> Stashed changes
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
