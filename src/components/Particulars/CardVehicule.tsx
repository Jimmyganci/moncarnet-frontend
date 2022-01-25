import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import ModalDeleteVehicule from './ModalDeleteVehicule';

import { select, deleteButton, glassMorphism, glassMorphismWhiteShadow, clearedGreenButton } from '../../variableTailwind';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
vehiculeSelect && console.log(vehiculeSelect);

  const dateDisplay = (element:Array<any>) => {
    const wholeDate =element.slice(0,10);
    const day = wholeDate.slice(8,10);
    const month = wholeDate.slice(5,7);
    const year = wholeDate.slice(0,4);
    const orderedDate = `${day}/${month}/${year}`;
    return orderedDate;
  }

  return (
    <div className='w-full h-full pb-5'>
      <div className={`rounded-lg ${glassMorphism} mx-auto my-5 h-full w-11/12 max-w-xl`}>
        {vehiculeSelect ? (
          <div className='flex flex-col items-center w-full'>
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
            {!deleteConfirmation ? <div>
              <h3>Mise en circulation</h3>
              <p><span>{`le `}</span><span className='text-xl text-background'>{dateDisplay(vehiculeSelect.registration_date)}</span></p>
              <div className="flex items-center justify-center h-20 my-4">
                <p>Ma carte grise : </p>
                <a className="w-3/12 h-full ml-4" href={vehiculeSelect.url_vehiculeRegistration} target={"blank"}>
                  <img
                    className="h-full rounded-sm"
                    src={vehiculeSelect.url_vehiculeRegistration}
                    alt="greenCard"
                  />
                </a>
              </div>
            </div> : <ModalDeleteVehicule
                immat={vehiculeSelect.immat}
                registration_date={vehiculeSelect.registration_date}
                url_vehiculeRegistration={vehiculeSelect.url_vehiculeRegistration}
                model_id={vehiculeSelect.id_modelId}
                type_id={vehiculeSelect.id_typeId}
                user_id={vehiculeSelect.id_userId}
                deleteConfirmation={deleteConfirmation}
                setDeleteConfirmation={setDeleteConfirmation} />}
            {!deleteConfirmation && <div className='w-11/12'>
              <button className={`${clearedGreenButton} w-full py-2`}>
              <Link to={`/particular/vehicules/${vehiculeSelect.immat}/serviceBook`}>
                Voir mon carnet d&apos;entretien
              </Link></button>
              <div className='flex items-center justify-between w-full my-2'>
                <button className={`w-full mr-1 py-2 uppercase ${clearedGreenButton}`}>
                    <Link className='w-full h-full p-0 m-0' to={`/particular/vehicules/${vehiculeSelect.immat}/update`}>Modifier</Link>
                  </button>
                  <button className={`w-full ml-1 py-2 uppercase ${clearedGreenButton}`}>Céder</button>
              </div>
                <button
                className={`w-full uppercase py-2 ${deleteButton} mb-4 bg-secondary hover:bg-secondary-hovered`}
                onClick={() => vehiculeSelect && setDeleteConfirmation(true)}
                >Supprimer</button>
              </div>}
            </div>
        ) : (
          'Pas de véhicules enregistré'
        )}
      </div>
    </div>
  );
  
};


export default CardVehicule;
