import React from 'react';
import { Link } from 'react-router-dom';

import { button, glassMorphism } from '../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
  console.log(vehiculeSelect);

  return (
    <div className={`h-full m-4 rounded-lg ${glassMorphism}`}>
      {vehiculeSelect.length > 0 ? (
        <>
          <div className="flex justify-center">
            <img
              className="w-5/12"
              src={`../src/assets/brands/${vehiculeSelect[0].brand}.png`}
              alt="brand_vehicule"
            />
          </div>

          <p className="text-2xl">{vehiculeSelect[0].vehicule.immat}</p>
          <div className="flex justify-around m-4">
            <p className="font-bold uppercase">{vehiculeSelect[0].brand}</p>
            <p>{vehiculeSelect[0].model}</p>
          </div>
          <h3 className="m-2 text-xl text-background">Date de mise en circulation</h3>
          <p>{vehiculeSelect[0].vehicule.registration_date.slice(0, 10)}</p>
          <div className="flex flex-col items-center justify-center">
            <p>Ma carte grise</p>
            <img
              className="w-2/12 m-4"
              src={vehiculeSelect[0].vehicule.url_vehiculeRegistration}
              alt="greenCard"
            />
          </div>
          <Link to="/service_book">
            <p className="underline">Voir mon carnet d&apos;entretien</p>
          </Link>
          <div className="flex flex-col items-center">
            <button className={`w-1/2 ${button}`}>Modifier</button>
            <button className={`w-1/2 ${button}`}>Céder</button>
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
