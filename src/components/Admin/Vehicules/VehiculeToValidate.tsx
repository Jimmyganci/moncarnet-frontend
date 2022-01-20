import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { model, type, users, vehicule } from '../../../API/request';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import { glassMorphism } from '../../../variableTailwind';
import ItemVehiculeToValidate from './ItemVehiculeToValidate';

function VehiculeToValidate() {
  interface RequestId {
    immat: string;
    model: number;
    user: number;
    type: number;
  }
  const [vehiculeToValidate] = useOutletContext<Array<any>>();
  const [data, setData] = useState([]);

  async function getVehiculeDetails() {
    try {
      let requestId: Array<RequestId> = [];

      vehiculeToValidate.map(async (el: VehiculeInfos) => {
        requestId.push({
          immat: el.immat,
          model: el.id_modelId,
          user: el.id_userId,
          type: el.id_typeId,
        });
      });

      Promise.all(
        requestId.map(async (el) => [
          await vehicule.getOne(el.immat),
          await model.getOne(el.model),
          await type.getOne(el.type),
          await users.getOne(el.user),
        ]),
      ).then((res: any) => setData(res));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVehiculeDetails();
  }, [vehiculeToValidate]);

  return (
    <div className="flex justify-end w-full">
      <div className="w-5/6">
        <div>
          <h1>Vehicule à valider</h1>
        </div>
        {vehiculeToValidate.length > 0 ? (
          <div className={`flex justify-around p-1 m-5 ${glassMorphism} rounded-lg`}>
            <p>Immatriculation</p>
            <p>Type</p>
            <p>Modèle</p>
            <p>Client</p>
            <p>Carte Grise</p>
            <p>Approuver</p>
          </div>
        ) : (
          <p className={`${glassMorphism}`}>{`Vous n'avez aucun véhicule à vérifier`}</p>
        )}
        {data?.map((el, index) => (
          <ItemVehiculeToValidate
            key={index}
            vehiculeInfos={el[0]}
            model={el[1]}
            type={el[2]}
            users={el[3]}
          />
        ))}
      </div>
    </div>
  );
}

export default VehiculeToValidate;
