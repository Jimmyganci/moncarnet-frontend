import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import carLogo from '../../../assets/minimalist_logos/car.svg';
import IVehiculeAllInfos from '../../../Interfaces/IVehiculeAllInfos';
import { button, glassMorphism } from '../../../variableTailwind';

interface IProps {
  vehicule: IVehiculeAllInfos[];
  setShowVehicule: Function;
}

function VehiculeModal({ vehicule, setShowVehicule }: IProps) {
  const [brand, setBrand] = useState<string>();
  async function getBrand() {
    const response = await brands.getOne(vehicule[0].brandId);
    setBrand(response.name);
  }

  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div
      className={`backdrop-filter backdrop-blur-lg fixed flex justify-center items-center top-0 left-0 w-full h-full p-4`}>
      <div
        className={`w-2/3 rounded-lg flex flex-col items-center justify-around bg-background/30`}>
        <div className="flex flex-col items-center justify-center w-full">
          <div className="mb-4">
            <img className="w-32" src={carLogo} alt="car_logo" />
          </div>
          <p className={`p-2 w-1/3 mb-4 rounded-lg ${glassMorphism}`}>
            {vehicule[0].immat}
          </p>
          <p className="mb-4 text-2xl text-background">{brand}</p>
          <p className="mb-4">{vehicule[0].model}</p>
          <p className="mb-4">
            {new Date(vehicule[0].registrationDate).toLocaleDateString()}
          </p>
          <div className="w-24 mb-4 ">
            <img className="w-full" src={vehicule[0].urlGreenCard} alt="green-card" />
          </div>
        </div>
        <button className={`${button} mb-4`} onClick={() => setShowVehicule(false)}>
          Fermer
        </button>
      </div>
    </div>
  );
}

export default VehiculeModal;
