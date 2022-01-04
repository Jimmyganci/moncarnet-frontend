import React from 'react';
import { Link } from 'react-router-dom';

import { button, glassMorphism } from '../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
  console.log(vehiculeSelect);

  return (
    <div className={`h-full m-4 mb-0 rounded-lg ${glassMorphism}`}>
      {vehiculeSelect ? (
        <>
          <div className="flex justify-center">
            <img
              className="w-5/12"
              src={`../src/assets/brands/${vehiculeSelect.brand}.png`}
              alt="brand_vehicule"
            />
          </div>

          <p className="text-2xl">{vehiculeSelect.immat}</p>
          <div className="flex justify-around p-1 m-4 border rounded-lg shadow-second shadow-background border-background">
            <p className="font-bold uppercase">{vehiculeSelect.brand}</p>
            <p>{vehiculeSelect.model}</p>
          </div>
          <h3 className="m-1 text-xl text-background">Date de mise en circulation</h3>
          <p>{vehiculeSelect.registration_date.slice(0, 10)}</p>
          <div className="flex flex-col items-center justify-center mt-2">
            <p>Ma carte grise</p>
            <img
              className="w-2/12 m-4"
              src={vehiculeSelect.url_vehiculeRegistration}
              alt="greenCard"
            />
          </div>
          <Link to="/service_book">
            <p className="underline">Voir mon carnet d&apos;entretien</p>
          </Link>
          <div className="flex flex-col items-center">
            <button className={`w-1/2 uppercase ${button}`}>Modifier</button>
            <button className={`w-1/2 uppercase ${button}`}>Céder</button>
            <button className="m-4 underline">Supprimer</button>
          </div>
        </>
      ) : (
        'Pas de véhicules enregistré'
      )}
    </div>
  );
};

export default CardVehicule;
