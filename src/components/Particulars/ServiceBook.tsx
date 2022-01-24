import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import {
  button,
  glassMorphism,
  glassMorphismWhiteShadow,
  select,
  title,
} from '../../variableTailwind';

const ServiceBook = () => {
  const { vehiculeImmatToUpdate }: any = useParams();
  const { infosUserVehicule }: any = useContext(UserContext);
  const [infosVehicule, setInfosVehicule] = useState<any>([]);
  const [services, setServices] = useState<any>([]);
  const [vehiculeSelected, setVehiculeSelected] = useState<Array<any>>([]);

  const getVehiculeSelected = (immat: string) => {
    setVehiculeSelected(infosUserVehicule.filter((el: any) => el.immat.includes(immat)));
  };

  useEffect(() => {
    async function getInfosVehicule() {
      setInfosVehicule(
        infosUserVehicule.filter((ele: any) => ele.immat === vehiculeImmatToUpdate),
      );
    }
    getInfosVehicule();
  }, [infosUserVehicule]);

  useEffect(() => {
    async function getservices() {
      try {
        const res = await axios.get(
          `http://localhost:8000/api/service_book/vehicule/${
            vehiculeSelected.length ? vehiculeSelected[0].immat : infosVehicule[0].immat
          }`,
          { withCredentials: true },
        );
        setServices(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getservices();
  }, [infosVehicule, vehiculeSelected]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full">
      <div className="flex flex-col items-center justify-around w-full h-full max-w-xl">
        <h2 className={title}>Mon carnet d&apos;entretien</h2>
        <select
          className={select}
          defaultValue={
            infosVehicule.length &&
            `${infosVehicule[0].brand} ${infosVehicule[0].model} | ${infosVehicule[0].immat}`
          }
          name="listVehicule"
          id="listVehicule"
          onChange={(e) => getVehiculeSelected(e.target.value)}>
          {infosVehicule &&
            infosUserVehicule.map((el: any) => (
              <option
                className="text-black"
                key={el.immat}
                value={el.immat}
                selected={
                  infosVehicule.length && el.immat === infosVehicule[0].immat
                    ? true
                    : false
                }>
                {`${el.brand} ${el.model} | ${el.immat}`}
              </option>
            ))}
        </select>
        {services.length !== 0 && (
          <div
            className={`${glassMorphism} w-11/12 h-full m-4 flex flex-col justify-center items-center rounded-lg`}>
            <h3 className={`m-4 text-xl font-bold font-inter text-background`}>
              <span className="pr-2 border-r-2 border-background">
                {((vehiculeSelected.length && vehiculeSelected[0].brand) ||
                  (infosVehicule.length && infosVehicule[0].brand)) +
                  ' ' +
                  ((vehiculeSelected.length && vehiculeSelected[0].model) ||
                    (infosVehicule.length && infosVehicule[0].model))}
              </span>
              <span className="pl-2">
                {infosVehicule.length && infosVehicule[0].immat}
              </span>
            </h3>
            <div className="flex flex-col-reverse items-center justify-center w-full h-full">
              {services.length &&
                services.map((service: any, index: number) => (
                  <div
                    key={index}
                    className={`${glassMorphismWhiteShadow} h-1/4 w-11/12 max-w-lg flex flex-col justify-center items-center p-3 my-2 mb-4`}>
                    <div className="flex items-center justify-between w-full h-full">
                      <div className="flex flex-col items-center justify-center w-full h-full -ml-3 text-sm leading-7">
                        <p className="underline">{`Révision du ${service.date.slice(
                          8,
                          10,
                        )}/${service.date.slice(5, 7)}/${service.date.slice(0, 4)}`}</p>
                        <p className="-mt-1">{service.service}</p>
                        <p className="-mt-2">
                          Kilométrage :{' '}
                          <span className="font-medium">
                            {service.kilometrage
                              .toString()
                              .replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}
                          </span>{' '}
                          kms
                        </p>
                      </div>
                      <Link
                        className="w-1/4 mx-1 h-2/5"
                        to={`/particular/vehicules/${
                          vehiculeSelected.length
                            ? vehiculeSelected[0].immat
                            : infosVehicule[0].immat
                        }/serviceBook/${service.id_service_book}`}>
                        <div className="flex items-center justify-center w-full h-full p-2 text-sm leading-5 break-words rounded-lg bg-primary text-background">
                          Voir détails
                        </div>
                      </Link>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        )}
        {!services.length && (
          <div
            className={`${glassMorphism} w-11/12 h-full mx-4 mt-6 p-4 flex flex-col justify-center items-center rounded-lg`}>
            <p>Vous n'avez pas encore enregistré d'entretien sur ce véhicule</p>
          </div>
        )}
      </div>
      <Link className="mt-2 w-fit h-fit" to="/particular/vehicules">
        <button className={`w-fit h-fit p-2 px-4 ${button}`}>Retour aux véhicules</button>
      </Link>
    </div>
  );
};

export default ServiceBook;
