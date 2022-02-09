import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { brands, service_book } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IAppointment from '../../../Interfaces/IAppointment';
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
  const [infosVehicule, setInfosVehicule] = useState<IVehiculeAndUser>();
  const [services, setServices] = useState<IServiceBook[]>();
  const [brand, setBrand] = useState<string>(''); 
  const [selectedImmat, setSelectedImmat]= useState<string>(vehiculeImmatToUpdate || '');

  function getInfosVehicule() {
    infosUserVehicule &&
      setInfosVehicule(
        infosUserVehicule.filter(
          (vehicule: IVehiculeAndUser) => vehicule.immat === vehiculeImmatToUpdate,
        )[0],
      );
  }

  async function getBrand() {
    const res = infosVehicule && await brands.getOne(infosVehicule.brandId);
    res && setBrand(res.name);
  }
  console.log(brand)

  useEffect(() => {
    getInfosVehicule();
  }, [infosUserVehicule, vehiculeImmatToUpdate]);

    useEffect(() => {
      getBrand();
  }, [infosVehicule]);

  useEffect(() => {
    async function getservices() {
      try {
        const res = infosVehicule && await service_book.getServiceBookVehicule(
          infosVehicule.immat,
        );
        setServices(res);
      } catch (err) {
        console.log(err);
      }
    }
    infosVehicule && infosVehicule && getservices();
  }, [infosVehicule]);
  
  const handleVehiculeSelected = (immat: string) => {
      setSelectedImmat(immat);
      infosUserVehicule &&
      setInfosVehicule(
        infosUserVehicule.filter((vehicule: IVehiculeAndUser) => vehicule.immat.includes(immat))[0],
      );
  };

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pb-8 lg:h-screen">
      <div className="flex flex-col items-center justify-around w-full h-full max-w-xl lg:h-5/6">
        <h2 className={title}>Mon carnet d&apos;entretien</h2>
        <select
          className={select}
          value={selectedImmat}
          name="listVehicule"
          id="listVehicule"
          onChange={(e) => infosUserVehicule && handleVehiculeSelected(e.target.value)}>
          {infosVehicule &&
            infosUserVehicule &&
            infosUserVehicule.map((vehicule, index: number) => (
              <VehiculesSelectOptions key={index} vehicule={vehicule} />
            ))}
        </select>
        {services && services.length && infosVehicule ? (
          <div
            className={`${glassMorphism} w-11/12 h-full m-4 py-6 flex flex-col justify-center items-center rounded-lg`}>
            <div className="flex flex-col-reverse items-center justify-center w-full h-full">
              {services &&
                services.sort((a: IServiceBook, b: IServiceBook) => {
                const dateA: Date = new Date(a.date);
                const dateB: Date = new Date(b.date);
                return dateB > dateA ? -1 : dateB < dateA ? 1 : 0;
              }).map((service, index: number) => (
                  <div
                    key={index}
                    className={`${glassMorphismWhiteShadow} h-1/4 w-11/12 max-w-lg flex flex-col justify-center items-center p-3 my-2 mb-4`}>
                    <div className="flex items-center justify-between w-full h-full">
                      <div className="flex flex-col items-center justify-center w-full h-full -ml-3 text-sm leading-7">
                        <p className="text-lg font-medium underline">{`Révision du ${new Date(
                          service.date,
                        ).toLocaleDateString()}`}</p>
                        <p className="mt-2 mb-3 leading-4">{service.service}</p>
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
                          infosVehicule && infosVehicule.immat
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
        ) : (
          <div
            className={`${glassMorphism} w-11/12 h-full mx-4 mt-6 p-4 flex flex-col justify-center items-center rounded-lg`}>
            <p>{`Aucun entretien effectué sur ce véhicule par un garagiste partenaire `}</p>
          </div>
        )}
         <p className={`m-4 font-inter text-background text-sm`}>
              * Le carnet d'entretien de votre véhicule est complété par votre garagiste après chaque intervention.
            </p>
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
