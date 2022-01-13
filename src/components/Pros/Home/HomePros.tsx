import React, { useContext } from 'react';

import ProsContext from '../../../contexts/prosContext';
import { h1 } from '../../../variableTailwind';
import NextRdvs from './NextRdvs';

function HomePros() {
  const { prosLogin }: any = useContext(ProsContext);
  console.log(prosLogin);

  return (
    <div className="w-full h-full">
      <h1 className={`${h1} m-6`}>Bienvenue {prosLogin.name}</h1>
      <main className="h-5/6">
        <NextRdvs />
      </main>
    </div>
  );
}

export default HomePros;
