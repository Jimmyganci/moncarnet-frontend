import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { brands } from '../../../API/request';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';

function HomeVehiculesDetails({ vehicule }: { vehicule: IVehiculeAndUser }) {
  const [brand, setBrand] = useState<String>('');
  let navigate = useNavigate();
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
        onClick={() => navigate(`/particular/vehicules/${vehicule.immat}/serviceBook`)}
        className="w-full p-2 my-2 text-lg rounded-lg opacity-90 backdrop-filter backdrop-blur-sm shadow-second text-background shadow-background"
        key={vehicule.immat}>{`${brand} ${vehicule.model} ${vehicule.immat}`}</p>
    </div>
  );
}

export default HomeVehiculesDetails;
