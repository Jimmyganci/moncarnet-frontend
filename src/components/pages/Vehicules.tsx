// import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { title } from '../../variableTailwind';
import CardVehicule from '../CardVehicule';

function Vehicules() {
  const { infosUserVehicule }: any = useContext(UserContext);
  const [vehiculeSelected, setVehiculeSelected] = useState<any>([]);

  useEffect(() => {
    setVehiculeSelected(infosUserVehicule);
  }, [infosUserVehicule]);

  const getVehiculeSelected = (immat: string) => {
    setVehiculeSelected(infosUserVehicule.filter((el: any) => el.immat.includes(immat)));
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
        onChange={(e) => getVehiculeSelected(e.target.value)}>
        {infosUserVehicule.map((el: any) => (
          <option key={el.immat} value={el.immat}>
            {`${el.brand} ${el.model} | ${el.immat}`}
          </option>
        ))}
      </select>
      <div>
        <CardVehicule vehiculeSelect={vehiculeSelected[0]} />
      </div>
    </div>
  );
}

export default Vehicules;
