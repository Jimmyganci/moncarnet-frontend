import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { brands, service_book } from '../../../API/request';
import ServiceBookInfos from '../../../Interfaces/IServiceBook';
import { button } from '../../../variableTailwind';

interface VehiculeProps {
  vehicule: any;
  setUserId?: Function;
  setShowUser?: Function;
}

function VehiculeCard({ vehicule, setUserId, setShowUser }: VehiculeProps) {
  const [brand, setBrand] = useState('');
  const [serviceBookList, setServiceBookList] = useState<ServiceBookInfos[]>();

  async function getBrand() {
    const getBrand = await brands.getOne(vehicule.brandId);
    setBrand(getBrand.name);
  }
  async function getServiceBook() {
    const res = await service_book.getServiceBookVehicule(vehicule.immat);
    setServiceBookList(res);
  }

  useEffect(() => {
    getBrand();
    getServiceBook();
  }, []);
  return (
    <div className="grid grid-cols-7 pt-2 pb-2 hover:bg-background/30">
      <p>{vehicule.type}</p>
      <p>{vehicule.immat}</p>
      <p>{new Date(vehicule.registrationDate).toLocaleDateString()}</p>
      <p>{brand}</p>
      <p>{vehicule.model}</p>
      <button
        onClick={() => {
          setUserId && setUserId(vehicule.userId);
          setShowUser && setShowUser(true);
        }}
        className="underline hover:text-background">
        {vehicule.userName}
      </button>

      {vehicule.validate === true ? (
        <p className="text-green-700 ">Vérifié</p>
      ) : (
        <p className="text-red-600 ">Non vérifié</p>
      )}
      {serviceBookList && serviceBookList.length !== 0 && (
        <button className={`${button} col-start-4`}>
          <Link to={`/admin/vehicule/serviceBook/${vehicule.immat}`}>Voir le carnet</Link>
        </button>
      )}
    </div>
  );
}

export default VehiculeCard;
