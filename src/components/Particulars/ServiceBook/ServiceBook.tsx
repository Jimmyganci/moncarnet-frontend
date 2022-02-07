import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { brands, service_book } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IServiceBook from '../../../Interfaces/IServiceBook';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';
import {
  button,
  glassMorphism,
  glassMorphismWhiteShadow,
  select,
  title,
} from '../../../variableTailwind';
import VehiculesSelectOptions from '../Vehicules/VehiculesSelectOptions';

const ServiceBook = () => {
  const { vehiculeImmatToUpdate } = useParams<string>();
  const { infosUserVehicule } = useContext(UserContext);
  const [infosVehicule, setInfosVehicule] = useState<IVehiculeAndUser[]>();
  const [services, setServices] = useState<IServiceBook[]>();
  const [vehiculeSelected, setVehiculeSelected] = useState<IVehiculeAndUser>();
  const [brand, setBrand] = useState<string>('');

  const getVehiculeSelected = (immat: string) => {
    infosUserVehicule &&
      setVehiculeSelected(
        infosUserVehicule.filter((vehicule: IVehiculeAndUser) => vehicule.immat.includes(immat)),
      );
  };

  async function getInfosVehicule() {
    infosUserVehicule &&
      setInfosVehicule(
         infosUserVehicule.filter(
          (vehicule: IVehiculeAndUser) => vehicule.immat === vehiculeImmatToUpdate,
        ),
      );
  }

  async function getBrand() {
    const res = await brands.getOne(vehiculeSelected[0].brandId);
    setBrand(res.name);
  }

  useEffect(() => {
    getInfosVehicule();
    vehiculeSelected && getBrand();
  }, [infosUserVehicule, vehiculeSelected, vehiculeImmatToUpdate]);

  useEffect(() => {
    async function getservices() {
      try {
        const res = infosVehicule && await service_book.getServiceBookVehicule(
          vehiculeSelected ? vehiculeSelected[0].immat : infosVehicule[0].immat,
        );
        setServices(res);
      } catch (err) {
        console.log(err);
      }
    }
    vehiculeSelected && infosVehicule && getservices();
  }, [infosVehicule, vehiculeSelected]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pb-5 lg:h-screen">
      <div className="flex flex-col items-center justify-around w-full h-full max-w-xl lg:h-5/6">
        <h2 className={title}>Mon carnet d&apos;entretien</h2>
        <select
          className={select}
          defaultValue={
            infosVehicule &&
            `${infosVehicule[0].brand} ${infosVehicule[0].model} | ${infosVehicule[0].immat}`
          }
          name="listVehicule"
          id="listVehicule"
          onChange={(e) => infosUserVehicule && getVehiculeSelected(e.target.value)}>
          {infosVehicule &&
            infosUserVehicule &&
            infosUserVehicule.map((el: any, index: number) => (
              <VehiculesSelectOptions key={index} vehicule={el} />
            ))}
        </select>
        {services && infosVehicule && (
          <div
            className={`${glassMorphism} w-11/12 h-full m-4 flex flex-col justify-center items-center rounded-lg`}>
            <h3 className={`m-4 text-xl font-bold font-inter text-background`}>
              <span className="pr-2 border-r-2 border-background">
                {((vehiculeSelected.length && brand) ||
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
              {services &&
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
        {!services && (
          <div
            className={`${glassMorphism} w-11/12 h-full mx-4 mt-6 p-4 flex flex-col justify-center items-center rounded-lg`}>
            <p>{`Vous n'avez pas encore enregistré d'entretien sur ce véhicule`}</p>
          </div>
        )}
        <Link className="mt-2 w-fit h-fit" to="/particular/vehicules">
          <button className={`w-fit h-fit p-2 px-4 ${button}`}>
            Retour aux véhicules
          </button>
        </Link>
      </div>
    </div>
  );
};

export default ServiceBook;
