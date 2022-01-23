import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import ModelInfos from '../../../Interfaces/IModelInfos';
import TypeInfos from '../../../Interfaces/ITypeInfos';
import UserInfos from '../../../Interfaces/IuserInfos';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import ModalInfos from '../Appointment/ModalInfos';

interface VehiculeProps {
  vehicule: VehiculeInfos;
  model: ModelInfos;
  type: TypeInfos;
  user: UserInfos;
}

function VehiculeCard({ vehicule, model, type, user }: VehiculeProps) {
  const [brand, setBrand] = useState('');
  const [showUser, setShowUser] = useState(false);

  async function getBrand() {
    const res = await brands.getOne(model.id_brand);
    setBrand(res.name);
  }

  useEffect(() => {
    getBrand();
  }, []);
  return (
    <div className="grid grid-cols-7 pt-2 pb-2 hover:bg-background/30">
      <p>{type.name_type}</p>
      <p>{vehicule.immat}</p>
      <p>{new Date(vehicule.registration_date).toLocaleDateString()}</p>
      <p>{brand}</p>
      <p>{model.name}</p>
      <button
        onClick={() => setShowUser(true)}
        className="underline hover:text-background">
        {user.lastname}
      </button>
      {vehicule.validate === true ? (
        <p className="text-green-700 ">Vérifié</p>
      ) : (
        <p className="text-red-600 ">Non vérifié</p>
      )}
      <ModalInfos showUser={showUser} setShowUser={setShowUser} user={user} />
    </div>
  );
}

export default VehiculeCard;
