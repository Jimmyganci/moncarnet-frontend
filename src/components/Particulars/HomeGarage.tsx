import axios from 'axios';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { button, glassMorphism, input } from '../../variableTailwind';

function HomeGarage() {
  const [searchGarage, setSearchGarage] = useState<string>('');
  const [resultsSearchGarage, setResultsSearchGarage] = useState<any>([]);
  const [message, setMessage] = useState<string>('');

  const handleSearchGarage = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');
    try {
      const res = await axios.get(
        `http://localhost:8000/api/pros?namePros=${searchGarage}`,
        {
          withCredentials: true,
        },
      );
      if (res.data.length === 0)
        setMessage('Aucun garage ne correspond à votre recherche!');
      setResultsSearchGarage(res.data);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={`m-4 p-4 rounded-lg ${glassMorphism}`}>
      <form onSubmit={(e) => handleSearchGarage(e)}>
        <label className="flex flex-col">
          <p className="mb-4 text-2xl">Trouver un garage</p>
          <input
            className={`p-2.5 ${input}`}
            type="search"
            placeholder="Garage du centre"
            onChange={(e) => setSearchGarage(e.target.value)}
          />
          <p>{message}</p>
        </label>
        <div className="flex flex-col items-center">
          {resultsSearchGarage.length === 1 && (
            <>
              <p>1 garage trouvé</p>
              <Link to={`/particular/garage-details/${resultsSearchGarage[0].id_pros}`}>
                <button className="underline">{resultsSearchGarage[0].name}</button>
              </Link>
            </>
          )}
          {searchGarage && (
            <>
              <button className={`w-1/2 ${button}`} type="submit">
                Chercher
              </button>
              <Link to="/particular/garage">
                <button type="button" className="mt-1 underline">
                  Ajouter des filtres
                </button>
              </Link>
            </>
          )}
        </div>
      </form>
    </div>
  );
}

export default HomeGarage;
