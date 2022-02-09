import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { brands } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import {
  clearedGreenButton,
  glassMorphism,
  glassMorphismWhiteShadow,
} from '../../../variableTailwind';
import Plate from '../../Plate';
import ModalDeleteVehicule from './ModalDeleteVehicule';
import ModalGiveVehicule from './ModalGiveVehicule';

interface Props {
  vehiculeSelect: IVehiculeAndUser;
}

const CardVehicule = ({ vehiculeSelect }: Props) => {
  const [deleteConfirmation, setDeleteConfirmation] = useState<boolean>(false);
  const [giveConfirmation, setGiveConfirmation] = useState<boolean>(false);
  const { userLoggedIn, vehiculeDeleted, setPosted } = useContext(UserContext);
  const [brand, setBrand] = useState<string>('');

  async function getBrand() {
    const res = await brands.getOne(vehiculeSelect.brandId);
    if (res) setBrand(res.name);
  }

  useEffect(() => {
    vehiculeSelect && getBrand();
  }, [vehiculeSelect]);

  return (
    <div className="w-full h-full pb-5 lg:h-fit">
      <div
        className={`rounded-lg ${glassMorphism} mx-auto my-5 h-full w-11/12 max-w-3xl lg:min-w-[500px] flex flex-col justify-center items-center`}>
        {vehiculeSelect ? (
          <div className="flex flex-col items-center w-11/12">
            {!vehiculeDeleted && (
              <div className="flex flex-col items-center">
                <div className="flex justify-center w-full">
                  <img
                    className="w-4/12 pt-2 lg:max-h-40"
                    src={`../src/assets/brands/${brand}.png`}
                    alt="brand_vehicule"
                  />
                </div>
                <div
                  className={`flex w-5/6 lg:w-full justify-around p-1 m-4 ${glassMorphismWhiteShadow}`}>
                  <p className="font-bold uppercase">{brand}</p>
                  <p className="font-bold uppercase">{vehiculeSelect.model}</p>
                </div>
                <div
                  className={`w-56 h-11 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg overflow-hidden mt-2 mb-4`}>
                  <Plate
                    immat={vehiculeSelect.immat}
                    postalCode={userLoggedIn && userLoggedIn.postal_code}
                  />
                </div>
              </div>
            )}
            {!deleteConfirmation && !giveConfirmation ? (
              <div>
                <p>
                  <span>{`Mise en circulation le `}</span>
                  <span className="text-xl text-background">
                    {new Date(vehiculeSelect.registrationDate).toLocaleDateString()}
                  </span>
                </p>
                <div className="flex items-center justify-center my-4">
                  <a
                    className="w-full h-full hover:underline"
                    href={vehiculeSelect.urlGreenCard}
                    target={'blank'}>
                    <p>Voir ma carte grise</p>
                  </a>
                </div>
              </div>
            ) : (
              <>
                <ModalDeleteVehicule
                  immat={vehiculeSelect.immat}
                  registration_date={vehiculeSelect.registrationDate}
                  url_vehiculeRegistration={vehiculeSelect.urlGreenCard}
                  model_id={vehiculeSelect.modelId}
                  type_id={vehiculeSelect.typeId}
                  user_id={vehiculeSelect.userId}
                  deleteConfirmation={deleteConfirmation}
                  setDeleteConfirmation={setDeleteConfirmation}
                />
                <ModalGiveVehicule
                  immat={vehiculeSelect.immat}
                  registration_date={vehiculeSelect.registrationDate}
                  url_vehiculeRegistration={vehiculeSelect.urlGreenCard}
                  model_id={vehiculeSelect.modelId}
                  type_id={vehiculeSelect.typeId}
                  giveConfirmation={giveConfirmation}
                  setGiveConfirmation={setGiveConfirmation}
                />
              </>
            )}
            {!deleteConfirmation && !giveConfirmation && (
              <div className="w-11/12">
                <button className={`${clearedGreenButton} w-full py-2`}>
                  <Link to={`/particular/vehicules/${vehiculeSelect.immat}/serviceBook`}>
                    Voir mon carnet d&apos;entretien
                  </Link>
                </button>
                <div className="flex items-center justify-between w-full my-2">
                  <button
                    onClick={() => setPosted(false)}
                    className={`w-full mr-1 py-2 uppercase ${clearedGreenButton}`}>
                    <Link
                      className="w-full h-full p-0 m-0"
                      to={`/particular/vehicules/${vehiculeSelect.immat}/update`}>
                      Modifier
                    </Link>
                  </button>
                  <button
                    className={`w-full ml-1 py-2 uppercase ${clearedGreenButton}`}
                    onClick={() => vehiculeSelect && setGiveConfirmation(true)}>
                    Céder
                  </button>
                </div>
                <button
                  className={`w-full py-2 mb-4 bg-secondary hover:bg-secondary-hovered uppercase duration-300 ease-in-out rounded-lg shadow-lg text-background`}
                  onClick={() => vehiculeSelect && setDeleteConfirmation(true)}>
                  Supprimer
                </button>
              </div>
            )}
          </div>
        ) : (
          'Pas de véhicule enregistré'
        )}
      </div>
    </div>
  );
};

export default CardVehicule;
