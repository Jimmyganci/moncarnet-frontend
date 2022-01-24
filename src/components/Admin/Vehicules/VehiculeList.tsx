import React, { useEffect, useState } from 'react';

import { model, service_book, type, users, vehicule } from '../../../API/request';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import { glassMorphism } from '../../../variableTailwind';
import VehiculeCard from './VehiculeCard';

interface RequestId {
  immat: string;
  id_modelId: number;
  id_typeId: number;
  id_userId: number;
}

function VehiculeList() {
  const [dataVehicule, setDataVehicule] = useState([]);

  async function getAllVehicules() {
    const getAllVehicules = await vehicule.getAll();

    let requestId: Array<RequestId> = [];

    getAllVehicules.map(async (vehicule: VehiculeInfos) => {
      requestId.push({
        immat: vehicule.immat,
        id_modelId: vehicule.id_modelId,
        id_typeId: vehicule.id_typeId,
        id_userId: vehicule.id_userId,
      });
    });

    Promise.all(
      requestId.map(async (id) => [
        await vehicule.getOne(id.immat),
        await model.getOne(id.id_modelId),
        await type.getOne(id.id_typeId),
        await users.getOne(id.id_userId),
        await service_book.getServiceBookVehicule(id.immat),
      ]),
    ).then((res: any) => setDataVehicule(res));
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
        <div className={` bg-background/50 rounded-lg mt-4`}>
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
          {dataVehicule.map((vehicule, index) => (
            <VehiculeCard
              key={index}
              vehicule={vehicule[0]}
              model={vehicule[1]}
              type={vehicule[2]}
              user={vehicule[3]}
              serviceBookList={vehicule[4]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default VehiculeList;
