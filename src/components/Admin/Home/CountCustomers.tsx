import React from 'react';
import { Link } from 'react-router-dom';

import usersLogo from '../../../assets/minimalist_logos/customers.svg';
import { button, glassMorphism } from '../../../variableTailwind';

interface DataLength {
  particular: number;
  pros: number;
}

function CountCustomers({ particular, pros }: DataLength) {
  return (
    <div
      className={`${glassMorphism} justify-between flex-1 rounded-lg p-2 flex flex-col items-center`}>
      <div className="flex items-center justify-center w-full rounded-lg bg-background/50">
        <img className="w-10" src={usersLogo} alt="customers" />
        <p className="ml-1">{`Utilisateur(s)`}</p>
      </div>
      <div className="flex justify-around w-full">
        <div className="flex flex-col items-center">
          <p className="mb-2 text-background">{`Particulier(s)`}</p>
          <p className={`${glassMorphism} p-4 w-12 rounded-lg text-primary text-2xl`}>
            {particular}
          </p>
        </div>
        <div className="flex flex-col items-center">
          <p className="mb-2 text-background">{`Professionnel(s)`}</p>
          <p className={`${glassMorphism} p-4 w-12 rounded-lg text-primary text-2xl`}>
            {pros}
          </p>
        </div>
      </div>
      <p className="mt-4">
        Félicitations, toutes ces personnes ne peuvent plus se passer de vous pour gérer
        leurs véhicules!
      </p>

      <div className="flex flex-col">
        <Link to="/admin/customers">
          <button className={`${button}`}>Consulter la liste</button>
        </Link>
        <Link to="/admin/addPros">
          <button className={`${button}`}>Ajouter un professionnel</button>
        </Link>
      </div>
    </div>
  );
}

export default CountCustomers;
