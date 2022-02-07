import React from 'react';
import { Link } from 'react-router-dom';

import car from '../../../assets/car.png';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { button, glassMorphism } from '../../../variableTailwind';
import HomeVehiculesDetails from './HomeVehiculesDetails';

function HomeVehicule({ vehiculesSlice }: { vehiculesSlice: IVehiculeAndUser[] }) {
  return (
    <div className={`flex flex-col items-center m-4 p-4 rounded-lg ${glassMorphism}`}>
      <img className="w-12" src={car} alt="car" />
      <h2 className="mb-4 text-2xl text-background">Mes véhicules</h2>
      {vehiculesSlice.map((vehicule, index: number) => (
        <HomeVehiculesDetails key={index} vehicule={vehicule} />
      ))}
      <Link to="/particular/vehicules">
        <button className={button}>Voir tout</button>
      </Link>
      <Link to="/particular/addVehicule">
        <button className="p-2 underline">Ajouter un véhicule</button>
      </Link>
    </div>
  );
}

export default HomeVehicule;
