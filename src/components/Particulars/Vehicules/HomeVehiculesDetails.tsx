import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import IVehiculeAllInfos from '../../../Interfaces/IVehiculeAllInfos';

function HomeVehiculesDetails({ vehicule }: { vehicule: IVehiculeAllInfos }) {
  const [brand, setBrand] = useState<String>('');
  async function getBrand() {
    const res = await brands.getOne(vehicule.brandId);
    setBrand(res.name);
  }
  useEffect(() => {
    getBrand();
  }, []);

  return (
    <div className="w-full">
      <p
        className="w-full p-2 my-2 text-lg rounded-lg opacity-90 backdrop-filter backdrop-blur-sm shadow-second text-background shadow-background"
        key={vehicule.immat}>{`${brand} ${vehicule.model} ${vehicule.immat}`}</p>
    </div>
  );
}

export default HomeVehiculesDetails;
