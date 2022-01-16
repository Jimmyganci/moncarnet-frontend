import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { glassMorphismWhiteShadow, glassMorphism, title, select } from '../../variableTailwind';

const ServiceBook = () => {
    const {vehiculeImmatToUpdate}:any = useParams();
    const { infosUserVehicule }: any = useContext(UserContext);
    const [infosVehicule, setInfosVehicule] = useState<any>([]);
    const [services, setServices] = useState<any>([]);
    const [vehiculeSelected, setVehiculeSelected] = useState<Array<any>>([]);

    const getVehiculeSelected = (immat: string) => {
        setVehiculeSelected(infosUserVehicule.filter((el: any) => el.immat.includes(immat)));
    }

    vehiculeSelected.length && console.log(vehiculeSelected);
    

    useEffect(() => {
        async function getInfosVehicule () {
            setInfosVehicule(infosUserVehicule.filter((ele: any)=> ele.immat === vehiculeImmatToUpdate));
          }
          getInfosVehicule();
      }, [infosUserVehicule]);

    useEffect(() => {
        async function getservices() {
            try {
                const res = await axios.get(
                `http://localhost:8000/api/service_book/vehicule/${vehiculeSelected.length ? vehiculeSelected[0].immat : infosVehicule[0].immat}`,
                { withCredentials: true },
                );
                setServices(res.data);
            }
            catch (err) {
                console.log(err);
            }
        }
        getservices();
    }, [infosVehicule, vehiculeSelected])

    return (
        <div className="w-full h-full min-h-screen flex flex-col items-center justify-start">
            <h2 className={title}>Mes derniers entretiens</h2>
            <select
        className={select}
        defaultValue={infosVehicule.length &&  `${infosVehicule[0].brand} ${infosVehicule[0].model} | ${infosVehicule[0].immat}`}
        name="listVehicule"
        id="listVehicule"
        onChange={(e) => getVehiculeSelected(e.target.value)}>
        {infosVehicule && infosUserVehicule.map((el: any) => (
          <option className="text-black" key={el.immat} value={el.immat} selected={infosVehicule.length &&  el.immat === infosVehicule[0].immat ? true : false }>
            {`${el.brand} ${el.model} | ${el.immat}`}
          </option>
        ))}
      </select>
           <div className={`${glassMorphism} w-11/12 h-full mx-4 mt-5 mb-8 flex flex-col justify-center items-center rounded-lg`}>
                <h3 className={`m-4 text-xl font-bold font-inter text-background`}>
                <span className='border-r-2 border-background pr-2'>{((vehiculeSelected.length &&vehiculeSelected[0].brand) || (infosVehicule.length && infosVehicule[0].brand)) + " " + ((vehiculeSelected.length &&vehiculeSelected[0].model) || (infosVehicule.length && infosVehicule[0].model))}</span>
                <span className='pl-2'>{infosVehicule.length && infosVehicule[0].immat}</span>
                </h3><div className='h-full w-full flex flex-col-reverse justify-center items-center'>
                    {services.length && services.map((service:any, index:number) => (
                        <div key={index} className={`${glassMorphismWhiteShadow} h-1/4 w-11/12 max-w-lg flex flex-col justify-center items-center p-3 my-2 mb-8`}>
                            <div className='w-full h-full flex justify-between items-center'>
                                <div className='w-full h-full flex flex-col justify-center items-center text-sm leading-7 -ml-3'>
                                    <p>{`Révision du ${service.date.slice(8, 10)}/${service.date.slice(5, 7)}/${service.date.slice(0, 4)}`}</p>
                                    <p>Kilométrage : <span className='font-medium'>{service.kilometrage.toString().replace(/(\d)(?=(\d{3})+$)/g, '$1 ')}</span> kms</p>
                                </div>
                                <div className='flex justify-center items-center rounded-lg h-2/5 w-1/4 mx-1 p-2 bg-primary text-background text-sm break-words leading-5'>Voir détails</div>
                            </div>
                        </div>
                    )
                )}
                </div>
           </div>
        </div>
    );
};

export default ServiceBook;