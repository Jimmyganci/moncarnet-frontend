import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import ModalDeleteVehicule from './../ModalDeleteVehicule';
import {
  glassMorphism,
  glassMorphismWhiteShadow,
  clearedGreenButton,
} from '../../../variableTailwind';
import Plate from '../../Plate';
import UserContext from '../../../contexts/UserContext';

interface InfosVehicules {
  vehiculeSelect: any;
}

const CardVehicule = ({ vehiculeSelect }: InfosVehicules) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const { userLogin, vehiculeDeleted }: any = useContext(UserContext);

  const dateDisplay = (element: Array<any>) => {
    const wholeDate = element.slice(0, 10);
    const day = wholeDate.slice(8, 10);
    const month = wholeDate.slice(5, 7);
    const year = wholeDate.slice(0, 4);
    const orderedDate = `${day}/${month}/${year}`;
    return orderedDate;
  };

  return (
    <div className="w-full h-full pb-5 lg:h-fit">
      <div
        className={`rounded-lg ${glassMorphism} mx-auto my-5 h-full w-11/12 max-w-xl lg:min-w-[500px] flex flex-col justify-center items-center`}
      >
        {vehiculeSelect ? (
          <div className="flex flex-col items-center w-11/12">
            {!vehiculeDeleted && (
              <div className="flex flex-col items-center">
                <div className="flex justify-center w-full">
                  <img
                    className="w-4/12 pt-2 lg:max-h-40"
                    src={`../src/assets/brands/${vehiculeSelect.brand}.png`}
                    alt="brand_vehicule"
                  />
                </div>
                <div
                  className={`flex w-5/6 max-w-lg justify-around p-1 m-4 ${glassMorphismWhiteShadow}`}
                >
                  <p className="font-bold uppercase">{vehiculeSelect.brand}</p>
                  <p className="font-bold uppercase">{vehiculeSelect.model}</p>
                </div>
                <div
                  className={`w-64 h-12 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg overflow-hidden mt-2 mb-4 border-black border-[1px]`}
                >
                  <Plate
                    immat={vehiculeSelect.immat}
                    postalCode={userLogin && userLogin.postal_code}
                  />
                </div>
              </div>
            )}
            {!deleteConfirmation ? (
              <div>
                <p>
                  <span>{`Mise en circulation le `}</span>
                  <span className="text-xl text-background">
                    {dateDisplay(vehiculeSelect.registration_date)}
                  </span>
                </p>
                <div className="flex items-center justify-center my-4">
                  <a
                    className="w-full h-full hover:underline"
                    href={vehiculeSelect.url_vehiculeRegistration}
                    target={'blank'}
                  >
                    <p>Voir ma carte grise</p>
                  </a>
                </div>
              </div>
            ) : (
              <ModalDeleteVehicule
                immat={vehiculeSelect.immat}
                registration_date={vehiculeSelect.registration_date}
                url_vehiculeRegistration={vehiculeSelect.url_vehiculeRegistration}
                model_id={vehiculeSelect.id_modelId}
                type_id={vehiculeSelect.id_typeId}
                user_id={vehiculeSelect.id_userId}
                deleteConfirmation={deleteConfirmation}
                setDeleteConfirmation={setDeleteConfirmation}
              />
            )}
            {!deleteConfirmation && (
              <div className="w-11/12">
                <button className={`${clearedGreenButton} w-full py-2`}>
                  <Link to={`/particular/vehicules/${vehiculeSelect.immat}/serviceBook`}>
                    Voir mon carnet d&apos;entretien
                  </Link>
                </button>
                <div className="flex items-center justify-between w-full my-2">
                  <button className={`w-full mr-1 py-2 uppercase ${clearedGreenButton}`}>
                    <Link
                      className="w-full h-full p-0 m-0"
                      to={`/particular/vehicules/${vehiculeSelect.immat}/update`}
                    >
                      Modifier
                    </Link>
                  </button>
                  <button className={`w-full ml-1 py-2 uppercase ${clearedGreenButton}`}>
                    Céder
                  </button>
                </div>
                <button
                  className={`w-full py-2 mb-4 bg-secondary hover:bg-secondary-hovered uppercase duration-300 ease-in-out rounded-lg shadow-lg text-background`}
                  onClick={() => vehiculeSelect && setDeleteConfirmation(true)}
                >
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ) : (
          'Pas de véhicules enregistré'
        )}
      </div>
    </div>
  );
};

export default CardVehicule;
