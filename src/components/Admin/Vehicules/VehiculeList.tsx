import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { vehicule } from '../../../API/request';
import { getVehicules } from '../../../API/requestVehicule';
import AdminContext from '../../../contexts/AdminContext';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { glassMorphism } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';
import VehiculeCard from './VehiculeCard';

function VehiculeList() {
  const [dataVehicules, setDataVehicules] = useState<IVehiculeAndUser[]>([]);
  const [userId, setUserId] = useState<number>(0);
  const [showUser, setShowUser] = useState(false);
  const [filterVehiculesDeleted, setFilterVehiculesDeleted] = useState<boolean>(false);
  const { renderState } = useContext(AdminContext);

  async function getAllVehicules() {
    const vehiculeWithoutSB = await vehicule.getAll();
    try {
      const vehiculeData = await getVehicules(vehiculeWithoutSB);
      setDataVehicules(vehiculeData);
    } catch (err) {
      if (err) toast.error("Une erreur s'est produite!");
    }
  }

  useEffect(() => {
    getAllVehicules();
  }, [renderState]);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">
            {filterVehiculesDeleted ? 'Véhicules Supprimés' : 'Véhicules Actifs'}
          </h1>
        </div>
        <div>
          <button
            onClick={() => setFilterVehiculesDeleted(!filterVehiculesDeleted)}
            className={`${button}`}>
            {!filterVehiculesDeleted
              ? 'Voir les véhicules supprimés'
              : 'Voir les véhicules actifs'}
          </button>
        </div>
        <div className={`${glassMorphism} rounded-lg mt-4`}>
          <div
            className={`grid grid-cols-7 ${glassMorphism} pt-2 pb-2 rounded-lg items-center `}>
            <p>Type</p>
            <p>Immatriculation</p>
            <p>Mise en circulation</p>
            <p>Marque</p>
            <p>Modèle</p>
            <p>Utilisateur</p>
            <p>Status</p>
          </div>
          {dataVehicules
            .filter((vehicule) =>
              filterVehiculesDeleted
                ? !vehicule.active && vehicule.validate
                : vehicule.active && vehicule.validate,
            )
            .map((vehicule, index) => (
              <VehiculeCard
                key={index}
                oneVehicule={vehicule}
                setUserId={setUserId}
                setShowUser={setShowUser}
              />
            ))}
        </div>
      </div>
      <ModalInfos showUser={showUser} setShowUser={setShowUser} userId={userId} />
    </div>
  );
}

export default VehiculeList;
