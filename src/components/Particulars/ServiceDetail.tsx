import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { button, glassMorphism, glassMorphismWhiteShadow } from '../../variableTailwind';

const ServiceDetail = () => {
  const { vehiculeImmatToUpdate, id_service_book }: any = useParams();
  const [infosService, setInfosService] = useState<any>([]);
  const { infosUserVehicule }: any = useContext(UserContext);
  const [infosVehicule, setInfosVehicule] = useState<any>([]);
  const [infosPro, setInfosPro] = useState<any>('');

  useEffect(() => {
    async function getInfosVehicule() {
      setInfosVehicule(
        infosUserVehicule.filter((ele: any) => ele.immat === vehiculeImmatToUpdate),
      );
    }

    async function getservice() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/service_book/${id_service_book}`,
          { withCredentials: true },
        );
        setInfosService(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getInfosVehicule();
    getservice();
  }, [infosUserVehicule]);

  useEffect(() => {
    async function getInfosPro() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/pros/${infosService.id_pros}`,
          { withCredentials: true },
        );
        setInfosPro(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getInfosPro();
  }, [infosService]);

  infosService && console.log(infosService);
  infosPro && console.log(infosPro);

  return (
    <div className="flex items-center justify-center w-screen h-full">
      <div className={`${glassMorphism} w-11/12 h-5/6 my-4 rounded-lg py-4 px-2`}>
        <h3>
          <span className="pr-2 border-r-2 border-background">
            {infosVehicule.length &&
              infosVehicule[0].brand + ' ' + infosVehicule[0].model}
          </span>
          <span className="pl-2">{infosVehicule.length && infosVehicule[0].immat}</span>
        </h3>
        <form
          className={`flex flex-col w-11/12 h-fit mx-auto rounded-lg p-2 items-center justify-center`}>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Date</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService.date &&
                `${infosService.date.slice(8, 10)}/${infosService.date.slice(
                  5,
                  7,
                )}/${infosService.date.slice(0, 4)}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Kilométrage</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService.date && `${infosService.kilometrage}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Service</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService.date && `${infosService.service}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Observations</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosService.date && `${infosService.observations}`}
            </div>
          </label>
          <label className="flex flex-col w-full">
            <span className="text-lg font-semibold">Réalisé par</span>
            <div className={`${glassMorphismWhiteShadow} h-fit py-1 my-2`}>
              {infosPro.name && `${infosPro.name}`}
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
