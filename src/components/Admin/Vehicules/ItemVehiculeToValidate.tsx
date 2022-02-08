import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { brands, vehicule } from '../../../API/request';
import AdminContext from '../../../contexts/AdminContext';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { button } from '../../../variableTailwind';

interface VehiculeToValidateProps {
  vehiculeData: IVehiculeAndUser;
  setUserId: React.Dispatch<React.SetStateAction<number>>;
  setShowUser: React.Dispatch<React.SetStateAction<boolean>>;
  setUrlImage: React.Dispatch<React.SetStateAction<string>>;
  setShowModalImage: React.Dispatch<React.SetStateAction<boolean>>;
}

function ItemVehiculeToValidate({
  vehiculeData,
  setUserId,
  setShowUser,
  setUrlImage,
  setShowModalImage,
}: VehiculeToValidateProps) {
  const [brand, setBrand] = useState<string>();
  const { setRenderState, renderState } = useContext(AdminContext);
  async function getBrand() {
    const res = await brands.getOne(vehiculeData.brandId);
    setBrand(res.name);
  }

  const handleValidate = async () => {
    const confirmVehicule = await toast.promise(
      vehicule.putOne(vehiculeData.immat, {
        immat: vehiculeData.immat,
        registration_date: vehiculeData.registrationDate,
        url_vehiculeRegistration: vehiculeData.urlGreenCard,
        id_modelId: vehiculeData.modelId,
        id_typeId: vehiculeData.typeId,
        id_userId: vehiculeData.userId,
        active: vehiculeData.active,
        validate: true,
      }),
      {
        pending: 'En cours',
        success: 'Véhicule modifié avec succés!',
        error: `Une erreur s'est produite!`,
      },
      {
        position: toast.POSITION.BOTTOM_CENTER,
      },
    );
    if (confirmVehicule) setRenderState(!renderState);
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
        <button
          onClick={() => {
            setShowModalImage(true);
            setUrlImage(vehiculeData.urlGreenCard);
          }}
          className="w-10 p-1 cursor-pointer hover:bg-background">
          <img className="" src={vehiculeData.urlGreenCard} alt="green-card" />
        </button>
      </div>
      <button onClick={() => handleValidate()} className={`${button} m-1`}>
        Valider
      </button>
    </div>
  );
}

export default ItemVehiculeToValidate;
