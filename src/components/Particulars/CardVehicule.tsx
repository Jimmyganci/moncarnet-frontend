import React from 'react';
import { Link } from 'react-router-dom';

import { button, deleteButton, glassMorphism, glassMorphismWhiteShadow } from '../../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
  return (
    <div className={`rounded-lg ${glassMorphism} mx-auto mt-5 w-5/6`}>
      {vehiculeSelect ? (
        <div className='w-full flex flex-col items-center'>
          <div className="flex justify-center w-full">
            <img
              className="w-5/12"
              src={`../src/assets/brands/${vehiculeSelect.brand}.png`}
              alt="brand_vehicule"
            />
          </div>

          <p className="text-2xl">{vehiculeSelect.immat}</p>
          <div className={`flex w-5/6 max-w-lg justify-around p-1 m-4 ${glassMorphismWhiteShadow}`}>
            <p className="font-bold uppercase">{vehiculeSelect.brand}</p>
            <p className="font-bold uppercase">{vehiculeSelect.model}</p>
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
          <div className="flex flex-col items-center w-5/6">
            <Link className='w-1/2' to={`/particular/vehicules/${vehiculeSelect.immat}/update`}>
              <button className={`w-full uppercase ${button} max-w-xs`}>Modifier</button>
            </Link>
            <button className={`w-1/2 uppercase ${button} max-w-xs`}>Céder</button>
            <button className={`w-1/2 uppercase ${deleteButton} bg-error-500 max-w-xs mb-4`}>Supprimer</button>
          </div>
        </div>
      ) : (
        'Pas de véhicules enregistré'
      )}
    </div>
  );
  
};


export default CardVehicule;
