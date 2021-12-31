import React from 'react';

import { button, glassMorphism, input } from '../variableTailwind';

function HomeGarage() {
  return (
    <div className={`m-4 p-4 rounded-lg ${glassMorphism}`}>
      <label className="flex flex-col">
        <p className="mb-4 text-2xl">Trouver un garage</p>
        <input className={`${input}`} type="search" placeholder="Garage du centre" />
      </label>
      <button className={button} type="submit">
        Chercher
      </button>
    </div>
  );
}

export default HomeGarage;
