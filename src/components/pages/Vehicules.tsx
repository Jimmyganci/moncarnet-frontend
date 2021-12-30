import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { title } from '../../variableTailwind';
import CardVehicule from '../CardVehicule';

function Vehicules() {
  const [vehiculesList, setVehiculesList] = useState<any>([]);
  const [vehiculeSelected, setVehiculeSelected] = useState<any>([]);
  const { userLogin }: any = useContext(UserContext);

  useEffect(() => {
    async function getVehicule() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/vehicules/${userLogin.id_user}`,
          {
            withCredentials: true,
          },
        );
        setVehiculesList(response.data);
        handleVehicule(response.data[0].immat);
      } catch (err) {
        console.log(err);
      }
    }
    getVehicule();
  }, [userLogin]);

  const handleVehicule = async (immat: any) => {
    try {
      const getOneVehicule = await axios.get(
        `http://localhost:8000/api/vehicules/${immat}`,
        { withCredentials: true },
      );
      if (getOneVehicule) {
        const promise1 = axios.get(
          `http://localhost:8000/api/models/${getOneVehicule.data.id_modelId}`,
          {
            withCredentials: true,
          },
        );
        const promise2 = axios.get(
          `http://localhost:8000/api/types/${getOneVehicule.data.id_typeId}`,
          {
            withCredentials: true,
          },
        );
        const getInfosVehicule = await Promise.all([promise1, promise2]);
        const infosVehicule = getInfosVehicule.map((el) => el.data);

        if (getInfosVehicule) {
          const getBrand = await axios.get(
            `http://localhost:8000/api/brands/${infosVehicule[0].id_brand}`,
            { withCredentials: true },
          );
          setVehiculeSelected([
            {
              vehicule: getOneVehicule.data,
              model: infosVehicule[0].name,
              brand: getBrand.data.name,
              type: infosVehicule[1].name_type,
            },
          ]);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-around">
        <h1 className={title}>Mes Vehicules</h1>
        <Link to="/particular/addVehicule">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>
      <select
        className="w-10/12 p-1 text-center border rounded-lg p1 border-primary-focus bg-background/0 outline-primary-focus"
        name="listVehicule"
        id="listVehicule"
        onChange={(e) => handleVehicule(e.target.value)}>
        {vehiculesList.map((el: any) => (
          <option key={el.immat} value={el.immat}>
            {el.immat}
          </option>
        ))}
      </select>
      <div>
        <CardVehicule vehiculeSelect={vehiculeSelected} />
      </div>
    </div>
  );
}

export default Vehicules;
