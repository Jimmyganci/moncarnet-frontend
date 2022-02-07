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

const ServiceDetail = () => {
  const { vehiculeImmatToUpdate, id_service_book } = useParams();
  const [infosService, setInfosService] = useState<IServiceBook>();
  const { infosUserVehicule } = useContext(UserContext);
  const [infosVehicule, setInfosVehicule] = useState<IVehiculeAndUser>();
  const [infosPro, setInfosPro] = useState<IPros>();
  const [brand, setBrand] = useState<string>('');

  async function getInfosVehicule() {
    setInfosVehicule(
      infosUserVehicule &&
        infosUserVehicule.filter(
          (vehicule: any) => vehicule.immat === vehiculeImmatToUpdate,
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
        <h3>
          <span className="pr-2 text-2xl border-r-2 border-background">
            {infosVehicule && brand + ' ' + infosVehicule.model}
          </span>
          <span className="pl-2 text-2xl">{infosVehicule && infosVehicule.immat}</span>
        </h3>
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
