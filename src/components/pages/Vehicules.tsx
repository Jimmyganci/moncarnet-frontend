import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';

import UserContext from '../../contexts/UserContext';
import CardVehicule from '../CardVehicule';

function Vehicules() {
  const [vehiculesList, setVehiculesList] = useState<any>([]);
  const [vehiculeSelected, setVehiculeSelected] = useState<any>([]);
  const { userLogin }: any = useContext(UserContext);
  console.log(vehiculesList);

  useEffect(() => {
    async function getVehicule() {
      try {
        const response = await axios.get(
          `http://localhost:8000/api/users/vehicules/${'1'}`,
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
      <h1>Mes vehiCules</h1>
      <select
        className="w-10/12 p-1 border rounded-lg p1 border-primary-focus bg-background/0"
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
