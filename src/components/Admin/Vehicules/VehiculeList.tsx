import React, { useEffect, useState } from 'react';

import { vehicule } from '../../../API/request';
import { getVehicules } from '../../../API/requestVehicule';
import { glassMorphism } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';
import VehiculeCard from './VehiculeCard';

function VehiculeList() {
  const [dataVehicules, setDataVehicules] = useState<Array<any>>([]);
  const [userId, setUserId] = useState<number>();
  const [showUser, setShowUser] = useState(false);

  async function getAllVehicules() {
    const vehiculeWithoutSB = await vehicule.getAll();
    try {
      const vehiculeData = await getVehicules(vehiculeWithoutSB);
      setDataVehicules(vehiculeData);
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAllVehicules();
  }, []);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">Vehicules</h1>
        </div>
        <div className={`${glassMorphism} rounded-lg mt-4`}>
          <div
            className={`grid grid-cols-7 ${glassMorphism} pt-2 pb-2 rounded-lg items-center `}
          >
            <p>Type</p>
            <p>Immatriculation</p>
            <p>Mise en circulation</p>
            <p>Marque</p>
            <p>Modèle</p>
            <p>Utilisateur</p>
            <p>Status</p>
          </div>
          {dataVehicules.map((vehicule, index) => (
            <VehiculeCard
              key={index}
              vehicule={vehicule}
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
