import React from 'react';
import { Link } from 'react-router-dom';

import car from '../../../assets/car.png';
import IVehicule from '../../../Interfaces/IVehicule';
import { button, glassMorphism } from '../../../variableTailwind';

function VehiculeConfirm({
  vehiculeToValidate,
}: {
  vehiculeToValidate: IVehicule[];
}) {
  return (
    <div
      className={`${glassMorphism} justify-between flex-1 rounded-lg p-2 flex flex-col items-center`}>
      <div className="flex items-center justify-center w-full rounded-lg bg-background/50">
        <img className="w-9" src={car} alt="car" />
        <p className="ml-1">Véhicules</p>
      </div>

      <div>
        {vehiculeToValidate && vehiculeToValidate.length > 0 ? (
          <span className="flex flex-col items-center">
            Vous avez
            <p
              className={`${glassMorphism} mt-4 mb-4 p-4 w-12 rounded-lg text-primary text-2xl`}>
              {vehiculeToValidate.length}
            </p>
            véhicules à vérifier!
          </span>
        ) : (
          "Vous n'avez aucun véhicule à vérifier"
        )}
      </div>
      <button className={button}>
        <Link to="/admin/vehicules/toValidate">Consulter</Link>
      </button>
    </div>
  );
}

export default VehiculeConfirm;
