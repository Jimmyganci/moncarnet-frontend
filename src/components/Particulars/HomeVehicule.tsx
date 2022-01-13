import React from 'react';
import { Link } from 'react-router-dom';

import car from '../../assets/car.png';
import { button, glassMorphism } from '../../variableTailwind';

interface VehiculeProps {
  vehiculesSlice: Array<any>;
}

function HomeVehicule({ vehiculesSlice }: VehiculeProps) {
  return (
    <div className={`flex flex-col items-center m-4 p-4 rounded-lg ${glassMorphism}`}>
      <img className="w-12" src={car} alt="car" />
      <h2 className="mb-4 text-2xl">Mes véhicules</h2>
      {vehiculesSlice.map((el) => (
        <p
          className="w-full p-2 mt-4 mb-4 text-lg rounded-lg opacity-90 backdrop-filter backdrop-blur-sm shadow-second text-background shadow-background"
          key={el.immat}>{`${el.brand} ${el.model} ${el.immat}`}</p>
      ))}
      <Link to="/particular/vehicules">
        <button className={button}>Voir tout</button>
      </Link>
      <Link to="/particular/addVehicule">
        <button className="underline p-2">Ajouter un véhicule</button>
      </Link>
    </div>
  );
}

export default HomeVehicule;
