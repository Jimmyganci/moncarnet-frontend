import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { brands } from '../../../API/request';
import ModelInfos from '../../../Interfaces/IModelInfos';
import ServiceBookInfos from '../../../Interfaces/IServiceBook';
import TypeInfos from '../../../Interfaces/ITypeInfos';
import UserInfos from '../../../Interfaces/IuserInfos';
import VehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import { button } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';

interface VehiculeProps {
  vehicule: VehiculeInfos;
  model: ModelInfos;
  type: TypeInfos;
  user: UserInfos;
  serviceBook: ServiceBookInfos;
}

function VehiculeCard({ vehicule, model, type, user, serviceBook }: VehiculeProps) {
  const [brand, setBrand] = useState('');
  const [showUser, setShowUser] = useState(false);
  console.log(serviceBook);

  async function getBrand() {
    const getBrand = await brands.getOne(model.id_brand);
    setBrand(getBrand.name);
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
      {serviceBook.length && (
        <button className={`${button} col-start-4`}>
          <Link to={`/admin/vehicule/serviceBook/${serviceBook.id_service_book}`}>
            Voir le carnet{' '}
          </Link>
        </button>
      )}
      <ModalInfos showUser={showUser} setShowUser={setShowUser} user={user} />
    </div>
  );
}

export default VehiculeCard;
