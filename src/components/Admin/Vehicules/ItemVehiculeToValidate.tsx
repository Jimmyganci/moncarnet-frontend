import React from 'react';
import { toast } from 'react-toastify';

import { vehicule } from '../../../API/request';
import ModelInfos from '../../../Interfaces/IModelInfos';
import TypeInfos from '../../../Interfaces/ITypeInfos';
import UserInfos from '../../../Interfaces/IuserInfos';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import { button, glassMorphism } from '../../../variableTailwind';

interface InterfaceInfos {
  vehiculeInfos: VehiculeInfos;
  model: ModelInfos;
  type: TypeInfos;
  users: UserInfos;
}

function ItemVehiculeToValidate({ vehiculeInfos, model, type, users }: InterfaceInfos) {
  const handleValidate = async () => {
    const validateVehicule = await toast.promise(
      vehicule.putOne(vehiculeInfos.immat, {
        ...vehiculeInfos,
        validate: true,
      }),
      {
        pending: 'Promise is pending',
        success: 'Promise resolved 👌',
        error: 'Promise rejected 🤯',
      },
      {
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
    console.log(validateVehicule);
  };

  return (
    <div
      className={`flex justify-around items-center ${glassMorphism} m-5 rounded-lg p-1`}>
      <p>{vehiculeInfos.immat}</p>
      <p>{type.name_type}</p>
      <p>{model.name}</p>
      <p>{users.lastname}</p>
      <div className="w-10 ">
        <img className="" src={vehiculeInfos.url_vehiculeRegistration} alt="green-card" />
      </div>
      <button onClick={() => handleValidate()} className={`${button}`}>
        Valider
      </button>
    </div>
  );
}

export default ItemVehiculeToValidate;
