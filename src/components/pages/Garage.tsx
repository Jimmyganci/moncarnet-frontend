import axios from 'axios';
import React, { useEffect, useState } from 'react';

import { button, glassMorphism, input } from '../../variableTailwind';

function Garage() {
  const [garageList, setGarageList] = useState<any>([]);
  const [filtreActive, setFiltreActive] = useState<boolean>(false);
  const [codePostal, setCodePostal] = useState<number>(0);
  const [city, setCity] = useState<string>('');
  const [rangeValue, setRangeValue] = useState<number>(50);

  useEffect(() => {
    async function getGarage() {
      try {
        let url = 'http://localhost:8000/api/pros';
        const garages = await axios.get(url, {
          withCredentials: true,
        });
        setGarageList(garages.data);
      } catch (err) {
        console.log(err);
      }
    }
    getGarage();
  }, []);
  return (
    <div>
      <h1>Choisir un garage</h1>
      <div className={`m-4 rounded-lg ${glassMorphism}`}>
        <form
          className={`flex flex-col items-center w-full p-4 rounded-t-lg ${glassMorphism}`}>
          <label className="w-full">
            <input
              className={`w-full ${input}`}
              type="text"
              name="searchGarage"
              id="searchGarage"
              placeholder={`Entrez le nom d'un garage`}
            />
          </label>
          <button type="submit" className={`w-1/2 ${button}`}>
            Chercher
          </button>
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={() => setFiltreActive(!filtreActive)}
              className="mt-4 underline">
              Plus de filtres
            </button>
            {filtreActive === false ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                  clipRule="evenodd"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="w-5 h-5"
                viewBox="0 0 20 20"
                fill="currentColor">
                <path
                  fillRule="evenodd"
                  d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z"
                  clipRule="evenodd"
                />
              </svg>
            )}
            {filtreActive && (
              <div className="w-full">
                <label>
                  <input
                    className={`w-2/3 ${input}`}
                    type="number"
                    name="postalCode"
                    id="postalCode"
                    onChange={(e) => setCodePostal(parseInt(e.target.value))}
                  />
                </label>
                {codePostal && (
                  <label>
                    <select
                      onChange={(e) => setCity(e.target.value)}
                      className={`w-2/3 ${input}`}
                      name="city"
                      id="city">
                      <option value="">Selectionnez une ville </option>
                      <option value="Capbreton">Capbreton</option>
                    </select>
                  </label>
                )}
                {city && (
                  <label>
                    <p>{rangeValue}KM</p>
                    <input
                      onChange={(e) => setRangeValue(parseInt(e.target.value))}
                      type="range"
                      name="ray"
                      id="ray"
                      min="0"
                      max="100"
                      value={rangeValue}
                    />
                  </label>
                )}
              </div>
            )}
          </div>
        </form>
        {garageList.map((el: any) => (
          <div key={el.id_pros}>
            <p>{el.name}</p>
            <p>{el.city}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Garage;
