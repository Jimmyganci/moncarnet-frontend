import React, { useContext, useEffect, useState } from 'react';

import { vehicule } from '../../../API/request';
import { getVehicules } from '../../../API/requestVehicule';
import AdminContext from '../../../contexts/AdminContext';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { glassMorphism } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';
import VehiculeCard from './VehiculeCard';

const VehiculesWithoutServiceBook = () => {
  const [dataVehicules, setDataVehicules] = useState<IVehiculeAndUser[]>([]);
  const { renderState } = useContext(AdminContext);

  const [showUser, setShowUser] = useState(false);
  const [userId, setUserId] = useState(0);

  async function getServiceBook() {
    const vehiculeWithoutSB = await vehicule.getVehiculeWithoutServiceBook();
    try {
      const vehiculeData = await getVehicules(vehiculeWithoutSB);
      setDataVehicules(vehiculeData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getServiceBook();
  }, [userId, showUser, renderState]);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">
            {`Vehicules sans Carnet d'entretien`}
          </h1>
        </div>
        <div className={`${glassMorphism} rounded-lg`}>
          <div className={`grid grid-cols-7 ${glassMorphism} pt-2 pb-2 rounded-lg`}>
            <p>Type</p>
            <p>Immatriculation</p>
            <p>Mise en Circulation</p>
            <p>Marque</p>
            <p>Modèle</p>
            <p>Client</p>
            <p>Status</p>
          </div>
          <div>
            {dataVehicules.length > 0 &&
              dataVehicules
                ?.filter((vehicule) => vehicule.active)
                .map((vehicule, index: number) => (
                  <VehiculeCard
                    key={index}
                    oneVehicule={vehicule}
                    setShowUser={setShowUser}
                    setUserId={setUserId}
                  />
                ))}
          </div>
        </div>
      </div>
      {showUser && (
        <ModalInfos showUser={showUser} userId={userId} setShowUser={setShowUser} />
      )}
    </div>
  );
};

export default VehiculesWithoutServiceBook;
