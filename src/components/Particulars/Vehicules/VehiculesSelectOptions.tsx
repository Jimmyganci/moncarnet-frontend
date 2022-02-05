import React, { useEffect, useState } from 'react';

import { brands } from '../../../API/request';
import IVehiculeAllInfos from '../../../Interfaces/IVehiculeAllInfos';

function VehiculesSelectOptions({ vehicule }: { vehicule: IVehiculeAllInfos }) {
  const [brand, setBrand] = useState<string>();

  async function getBrand() {
    const res = await brands.getOne(vehicule.brandId);
    setBrand(res.name);
  }

  useEffect(() => {
    getBrand();
  }, [vehicule]);

  return (
    <option className="text-black" key={vehicule.immat} value={vehicule.immat}>
      {brand && `${brand} ${vehicule.model} | ${vehicule.immat}`}
    </option>
  );
}

export default VehiculesSelectOptions;
