import React from 'react';

import ModelInfos from '../../../Interfaces/IModelInfos';
import TypeInfos from '../../../Interfaces/ITypeInfos';
import UserInfos from '../../../Interfaces/IuserInfos';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';

interface InterfaceInfos {
  vehicule: VehiculeInfos;
  model: ModelInfos;
  type: TypeInfos;
  users: UserInfos;
}

function ItemVehiculeToValidate({ vehicule, model, type, users }: InterfaceInfos) {
  console.log(vehicule);

  return (
    <div className="flex">
      <p>{vehicule.immat}</p>
      <p>{model.name}</p>
      <p>{type.name_type}</p>
      <p>{users.lastname}</p>
    </div>
  );
}

export default ItemVehiculeToValidate;
