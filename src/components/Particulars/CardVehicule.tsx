import React from 'react';
import { Link } from 'react-router-dom';

import { select, deleteButton, glassMorphism, glassMorphismWhiteShadow, clearedGreenButton } from '../../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {

  const dateDisplay = (element:Array<any>) => {
    const wholeDate =element.slice(0,10);
    const day = wholeDate.slice(8,10);
    const month = wholeDate.slice(5,7);
    const year = wholeDate.slice(0,4);
    const orderedDate = `${day}/${month}/${year}`;
    return orderedDate;
 }

  return (
    <div className='h-full w-full pb-5'>
      <div className={`rounded-lg ${glassMorphism} mx-auto my-5 h-full w-11/12 max-w-xl`}>
        {vehiculeSelect ? (
          <div className='w-full flex flex-col items-center'>
            <div className="flex justify-center w-full">
              <img
                className="w-4/12 pt-2"
                src={`../src/assets/brands/${vehiculeSelect.brand}.png`}
                alt="brand_vehicule"
              />
            </div>
  
            <p className="text-2xl">{vehiculeSelect.immat}</p>
            <div className={`flex w-5/6 max-w-lg justify-around p-1 m-4 ${glassMorphismWhiteShadow}`}>
              <p className="font-bold uppercase">{vehiculeSelect.brand}</p>
              <p className="font-bold uppercase">{vehiculeSelect.model}</p>
            </div>
            <h3>Mise en circulation</h3>
            <p><span>{`le `}</span><span className='text-xl text-background'>{dateDisplay(vehiculeSelect.registration_date)}</span></p>
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
            <div className='w-11/12'>
              <button className={`${clearedGreenButton} w-full py-2`}>
              <Link to={`/particular/vehicules/${vehiculeSelect.immat}/serviceBook`}>
                Voir mon carnet d&apos;entretien
              </Link></button>
              <div className='w-full flex justify-between items-center my-2'>
                <button className={`w-full mr-1 py-2 uppercase ${clearedGreenButton}`}>
                    <Link className='w-full h-full m-0 p-0' to={`/particular/vehicules/${vehiculeSelect.immat}/update`}>Modifier</Link>
                  </button>
                  <button className={`w-full ml-1 py-2 uppercase ${clearedGreenButton}`}>Céder</button>
              </div>
                <button className={`w-full uppercase py-2 ${deleteButton} mb-4 bg-secondary hover:bg-secondary-hovered`}>Supprimer</button>
              </div>
            </div>
        ) : (
          'Pas de véhicules enregistré'
        )}
      </div>
    </div>
  );
  
};


export default CardVehicule;
