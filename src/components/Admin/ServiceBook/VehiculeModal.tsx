import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import carLogo from '../../../assets/minimalist_logos/car.svg';
import IVehiculeAllInfos from '../../../Interfaces/IVehiculeInfos';
import { button } from '../../../variableTailwind';

interface IProps {
  vehicule: IVehiculeAllInfos[];
  setShowVehicule: Function;
}

function VehiculeModal({ vehicule, setShowVehicule }: IProps) {
  console.log(vehicule);

  const [brand, setBrand] = useState<string>();
  async function getBrand() {
    const response = await brands.getOne(vehicule[0].brandId);
    setBrand(response.name);
  }

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className={`fixed top-0 left-0 w-full h-full p-4`}>
      <div
        className={` backdrop-filter backdrop-blur-3xl bg-background/30 w-full h-full rounded-lg flex flex-col items-center justify-around`}>
        <div className="flex flex-col items-center justify-center">
          <div>
            <img src={carLogo} alt="car_logo" />
          </div>
          <p>{vehicule[0].immat}</p>
          <p>{brand}</p>
          <p>{vehicule[0].model}</p>
          <p>{new Date(vehicule[0].registrationDate).toLocaleDateString()}</p>
          <p>{vehicule[0].urlGreenCard}</p>
          <p>{vehicule[0].userName}</p>
        </div>
        <button className={`${button}`} onClick={() => setShowVehicule(false)}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default VehiculeModal;
