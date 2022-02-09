import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { getVehicules } from '../../../API/requestVehicule';
import AdminContext from '../../../contexts/AdminContext';
import IVehicule from '../../../Interfaces/IVehicule';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { glassMorphism } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';
import ItemVehiculeToValidate from './ItemVehiculeToValidate';
import ModalImage from './ModalImage';

function VehiculeToValidate() {
  const vehiculeToValidate = useOutletContext<IVehicule[]>();
  const [dataVehicules, setDataVehicules] = useState<IVehiculeAndUser[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [showUser, setShowUser] = useState(false);
  const [urlImage, setUrlImage] = useState<string>('');
  const [showModalImage, setShowModalImage] = useState<boolean>(false);
  const { renderState } = useContext(AdminContext);

  async function getVehiculeDetails() {
    if (vehiculeToValidate) {
      try {
        const res = await getVehicules(vehiculeToValidate);
        setDataVehicules(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  useEffect(() => {
    getVehiculeDetails();
  }, [vehiculeToValidate, renderState]);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">Vehicules</h1>
        </div>
        <div className={`${glassMorphism} rounded-lg mt-4`}>
          {vehiculeToValidate && vehiculeToValidate.length > 0 ? (
            <div className={`grid grid-cols-7 pt-2 pb-2 ${glassMorphism} rounded-lg`}>
              <p>Immatriculation</p>
              <p>Type</p>
              <p>Marque</p>
              <p>Modèle</p>
              <p>Client</p>
              <p>Carte Grise</p>
              <p>Approuver</p>
            </div>
          ) : (
            <p
              className={`${glassMorphism}`}>{`Vous n'avez aucun véhicule à vérifier`}</p>
          )}
          <div>
            {dataVehicules?.map((vehicule, index) => (
              <ItemVehiculeToValidate
                key={index}
                vehiculeData={vehicule}
                setUserId={setUserId}
                setShowUser={setShowUser}
                setUrlImage={setUrlImage}
                setShowModalImage={setShowModalImage}
              />
            ))}
          </div>
        </div>
      </div>
      <ModalInfos showUser={showUser} setShowUser={setShowUser} userId={userId} />
      <ModalImage
        url={urlImage}
        showModalImage={showModalImage}
        setShowModalImage={setShowModalImage}
      />
    </div>
  );
}

export default VehiculeToValidate;
