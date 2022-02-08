import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { brands, service_book, vehicule } from '../../../API/request';
import AdminContext from '../../../contexts/AdminContext';
import ServiceBook from '../../../Interfaces/IServiceBook';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import { button } from '../../../variableTailwind';

interface VehiculeProps {
  oneVehicule: IVehiculeAndUser;
  setUserId?: React.Dispatch<React.SetStateAction<number>>;
  setShowUser?: React.Dispatch<React.SetStateAction<boolean>>;
}

function VehiculeCard({ oneVehicule, setUserId, setShowUser }: VehiculeProps) {
  const [brand, setBrand] = useState('');
  const [serviceBookList, setServiceBookList] = useState<ServiceBook[]>();
  const { renderState, setRenderState } = useContext(AdminContext);

  async function getBrand() {
    const getBrand = await brands.getOne(oneVehicule.brandId);
    setBrand(getBrand.name);
  }
  async function getServiceBook() {
    const serviceBooks = await service_book.getServiceBookVehicule(oneVehicule.immat);
    setServiceBookList(serviceBooks);
  }

  const handleDeletedVehicule = async (immat: string, data: IVehiculeAndUser) => {
    try {
      const deletedVehicule = await vehicule.putOne(immat, {
        immat: data.immat,
        registration_date: data.registrationDate,
        url_vehiculeRegistration: data.urlGreenCard,
        id_modelId: data.modelId,
        id_typeId: data.typeId,
        id_userId: data.userId,
        active: !data.active,
        validate: data.validate,
      });
      if (deletedVehicule === 204) {
        setRenderState(!renderState);
        toast.success('Véhicule supprimé avec succées');
      }
    } catch (err) {
      if (err) toast.error("Une erreur s'est produite!");
    }
  };

  useEffect(() => {
    getBrand();
    getServiceBook();
  }, [renderState, oneVehicule]);
  return (
    <div className="grid grid-cols-7 pt-2 pb-2 hover:bg-background/30">
      <p>{oneVehicule.type}</p>
      <p>{oneVehicule.immat}</p>
      <p>{new Date(oneVehicule.registrationDate).toLocaleDateString()}</p>
      <p>{brand}</p>
      <p>{oneVehicule.model}</p>
      <button
        onClick={() => {
          setUserId && setUserId(oneVehicule.userId);
          setShowUser && setShowUser(true);
        }}
        className="underline hover:text-background">
        {oneVehicule.userName}
      </button>

      {oneVehicule.validate === true ? (
        <p className="text-green-700 ">Vérifié</p>
      ) : (
        <p className="text-red-600 ">Non vérifié</p>
      )}

      <div className="flex justify-center col-span-3 col-start-3">
        {serviceBookList && serviceBookList.length !== 0 && (
          <button className={`${button} `}>
            <Link to={`/admin/vehicule/${oneVehicule.immat}/serviceBook`}>
              Voir le carnet
            </Link>
          </button>
        )}
        <button
          onClick={() => handleDeletedVehicule(oneVehicule.immat, oneVehicule)}
          className={`${button} ${oneVehicule.active ? 'bg-red-500 ' : ''}`}>
          {oneVehicule.active ? 'Désactiver' : 'Activer'}
        </button>
      </div>
    </div>
  );
}

export default VehiculeCard;
