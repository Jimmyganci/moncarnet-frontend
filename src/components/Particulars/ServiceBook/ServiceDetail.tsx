import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { brands, pros, service_book } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IPros from '../../../Interfaces/IPros';
import IServiceBook from '../../../Interfaces/IServiceBook';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import {
  button,
  glassMorphism,
  glassMorphismWhiteShadow,
} from '../../../variableTailwind';
import Plate from '../../Plate';

const ServiceDetail = () => {
  const { vehiculeImmatToUpdate, id_service_book } = useParams();
  const [infosService, setInfosService] = useState<IServiceBook>();
  const { infosUserVehicule, userLoggedIn } = useContext(UserContext);
  const [infosVehicule, setInfosVehicule] = useState<IVehiculeAndUser>();
  const [infosPro, setInfosPro] = useState<IPros>();
  const [brand, setBrand] = useState<string>('');

  async function getInfosVehicule() {
    setInfosVehicule(
      infosUserVehicule &&
        infosUserVehicule.filter(
          (vehicule) => vehicule.immat === vehiculeImmatToUpdate,
        )[0],
    );
  }

  async function getservice() {
    if (id_service_book !== undefined) {
      try {
        const res = await service_book.getOne(Number(id_service_book));
        setInfosService(res);
      } catch (err) {
        console.log(err);
      }
    }
  }

  async function getBrand() {
    if (infosVehicule) {
      const brand = await brands.getOne(infosVehicule?.brandId);
      if (brand) setBrand(brand.name);
    }
  }

  useEffect(() => {
    getInfosVehicule();
    getservice();
    getBrand();
  }, [infosUserVehicule, infosVehicule]);

  useEffect(() => {
    async function getInfosPro() {
      if (infosService) {
        try {
          const res = await pros.getOne(infosService.id_pros);
          setInfosPro(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getInfosPro();
  }, [infosService]);

  return (
    <div className="flex items-center justify-center w-screen h-full lg:h-screen">
      <div
        className={`${glassMorphism} w-11/12 h-5/6 max-w-lg my-10 rounded-lg py-4 px-2 flex flex-col justify-center items-center`}>
        <div className='flex flex-col items-center justify-center lg:-mb-6'>
          <p className="px-2 py-1 text-xl underline font-medium">
            {infosVehicule && brand + ' ' + infosVehicule.model}
          </p>
          <div className='w-56 h-10 max-h-12 max-w-sm mb-2 lg:mt-2'>
            {infosVehicule && <Plate immat={infosVehicule.immat} postalCode={userLoggedIn && userLoggedIn.postal_code} />}
          </div>
        </div>
        <form
          className={`flex flex-col w-11/12 h-fit mx-auto rounded-lg p-2 mt-4 items-center justify-center`}>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Date</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService && `${new Date(infosService.date).toLocaleDateString()}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Kilométrage</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService && `${infosService.kilometrage}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Service</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService && `${infosService.service}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Observations</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService && `${infosService.observations}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Réalisé par</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosPro && `${infosPro.name}`}
            </div>
          </label>
        </form>
        <Link
          className="mt-2 w-fit h-fit"
          to={`/particular/vehicules/${vehiculeImmatToUpdate}/serviceBook`}>
          <button className={`w-fit h-fit p-2 px-4 ${button}`}>Retour au carnet</button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceDetail;
