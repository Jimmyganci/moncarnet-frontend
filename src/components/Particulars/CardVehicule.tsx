import React from 'react';
import { Link } from 'react-router-dom';

import { button, glassMorphism } from '../../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
  return (
    <div className={`rounded-lg ${glassMorphism} m-4`}>
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
            <p className="font-bold text-green-50 uppercase">{vehiculeSelect.model}</p>
          </div>
          <h3 className="m-1 text-xl text-background">Date de mise en circulation</h3>
          <p>{vehiculeSelect.registration_date.slice(0, 10)}</p>
          <div className="h-20 flex items-center justify-center my-4">
            <p>Ma carte grise : </p>
            <a className="w-3/12 h-full ml-4" href={vehiculeSelect.url_vehiculeRegistration} target={"blank"}>
              <img
                className="h-full rounded-sm"
                src={vehiculeSelect.url_vehiculeRegistration}
                alt="greenCard"
              />
            </a>
          </div>
          <Link to={`/particular/vehicules/${vehiculeSelect.immat}/serviceBook`}>
            <p className="underline">Voir mon carnet d&apos;entretien</p>
          </Link>
          <div className="flex flex-col items-center">
            <Link className='w-1/2' to={`/particular/vehicules/${vehiculeSelect.immat}/update`}><button className={`w-full uppercase ${button}`}>Modifier</button></Link>
            <button className={`w-1/2 uppercase ${button} bg-background`}>Céder</button>
            <button className={`w-1/2 uppercase ${button} bg-red-700 text-background mb-4`}>Supprimer</button>
          </div>
        </>
      ) : (
        'Pas de véhicules enregistré'
      )}
    </div>
  );
  
};


export default CardVehicule;
