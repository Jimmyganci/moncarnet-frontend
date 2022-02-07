// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import IVehiculeAndUser from '../../Interfaces/IVehiculeAndUser';
import { select, title } from '../../variableTailwind';
import CardVehicule from '../Particulars/Vehicules/CardVehicule';
import VehiculesSelectOptions from '../Particulars/Vehicules/VehiculesSelectOptions';

function Vehicules() {
  const { infosUserVehicule } = useContext(UserContext);
  const [vehiculeSelected, setVehiculeSelected] = useState<IVehiculeAndUser[]>([]);

  const handleChangeVehicule = (immat: string) => {
    infosUserVehicule &&
      setVehiculeSelected(
        infosUserVehicule.filter((el: IVehiculeAndUser) => el.immat.includes(immat)),
      );
  };

  useEffect(() => {
    infosUserVehicule && setVehiculeSelected(infosUserVehicule);
  }, [infosUserVehicule]);

  return (
    <div className="h-full lg:h-fit">
      <div className="flex items-center justify-center h-full lg:h-fit">
        <h1 className={`${title}`}>Mes Véhicules</h1>
        <Link to="/particular/addVehicule">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 ml-4 text-background"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
      <select
        className={select}
        name="listVehicule"
        id="listVehicule"
        onChange={(e) => handleChangeVehicule(e.target.value)}>
        {infosUserVehicule &&
          infosUserVehicule.map((vehicule, index: number) => (
            <VehiculesSelectOptions key={index} vehicule={vehicule} />
          ))}
      </select>
      <div>
        <CardVehicule vehiculeSelect={vehiculeSelected[0]} />
      </div>
    </div>
  );
}

export default Vehicules;
