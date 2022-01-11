import React from 'react';
import SideLink from './SideLink';
import { glassMorphism } from '../../../variableTailwind';
import Logo from '../../Logo';
import home from '../../../assets/minimalist_logos/home.svg';
import customers from '../../../assets/minimalist_logos/customers.svg';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import invoice from '../../../assets/minimalist_logos/invoice.svg';
import quote from '../../../assets/minimalist_logos/quote.svg';
import profile from '../../../assets/minimalist_logos/profile.svg';


const SideBar = () => {

  const linkArray = [
    {
      label : "Accueil",
      path : "/pros/home",
      logo : home,
      alt : "accueil logo"
    },
    {
      label : "Mes Clients",
      path : "/pros/customers",
      logo : customers,
      alt : "clients logo"
    },
    {
      label : "Mes RDVs",
      path : "/pros/appointments",
      logo : calendar,
      alt : "rdv logo"
    },
    {
      label : "Mes Factures",
      path : "/pros/invoices",
      logo : invoice,
      alt : "factures logo"
    },
    {
      label : "Mes Devis",
      path : "/pros/quotes",
      logo : quote,
      alt : "devis logo"
    },
    {
      label : "Mon Profil",
      path : "/pros/profile",
      logo : profile,
      alt : "profil logo"
    },
];

  return (
    <div className={`${glassMorphism} w-5/6 mt-2 mb-2 h-5/6 rounded-lg flex flex-col items-center`}>
      <div className='w-full h-1/6 flex justify-center items-center pb-4'>
        <Logo />
      </div>
      <span className='w-5/6 border-b-2'></span>
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

export default SideBar;
