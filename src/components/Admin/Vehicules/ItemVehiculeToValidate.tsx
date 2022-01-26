import React, { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { brands, vehicule } from '../../../API/request';
import IVehiculeAllInfos from '../../../Interfaces/IVehiculeAllInfos';
import { button } from '../../../variableTailwind';

interface VehiculeToValidateProps {
  vehiculeData: IVehiculeAllInfos;
  setUserId: Function;
  setShowUser: Function;
}

function ItemVehiculeToValidate({
  vehiculeData,
  setUserId,
  setShowUser,
}: VehiculeToValidateProps) {
  console.log(vehiculeData);

  const [brand, setBrand] = useState<string>();
  async function getBrand() {
    const res = await brands.getOne(vehiculeData.brandId);
    setBrand(res.name);
  }
  const handleValidate = async () => {
    const validateVehicule = await toast.promise(
      vehicule.putOne(vehiculeData.immat, {
        immat: vehiculeData.immat,
        registration_date: vehiculeData.registration_Date,
        url_vehiculeRegistration: vehiculeData.urlGreenCard,
        id_modelId: vehiculeData.modelId,
        id_typeId: vehiculeData.typeId,
        id_userId: vehiculeData.userId,
        active: vehiculeData.active,
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

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className={`grid grid-cols-7 items-center hover:bg-background/30`}>
      <p>{vehiculeData.immat}</p>
      <p>{vehiculeData.type}</p>
      <p>{brand}</p>
      <p>{vehiculeData.model}</p>
      <button
        onClick={() => {
          setUserId(vehiculeData.userId);
          setShowUser(true);
        }}
        className="underline hover:text-background">
        {vehiculeData.userName}
      </button>
      <div className="flex justify-center">
        <div className="w-10 p-1 cursor-pointer hover:bg-background">
          <img className="" src={vehiculeData.urlGreenCard} alt="green-card" />
        </div>
      </div>
      <button onClick={() => handleValidate()} className={`${button} m-1`}>
        Valider
      </button>
    </div>
  );
}

export default ItemVehiculeToValidate;
