import React, { useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';

import { model, type, users, vehicule } from '../../../API/request';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import ItemVehiculeToValidate from './ItemVehiculeToValidate';

function VehiculeToValidate() {
  const [vehiculeToValidate] = useOutletContext<Array<any>>();
  const [data, setData] = useState([]);

  async function getVehiculeDetails() {
    try {
      let requestId: Array<any> = [];

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
      ).then((res) => setData(res));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVehiculeDetails();
  }, [vehiculeToValidate]);

  return (
    <div className="w-full">
      <div>
        <h1>Vehicule à valider</h1>
      </div>
      {data?.map((el, index) => (
        <ItemVehiculeToValidate
          key={index}
          vehicule={el[0]}
          model={el[1]}
          type={el[2]}
          users={el[3]}
        />
      ))}
    </div>
  );
}

export default VehiculeToValidate;
