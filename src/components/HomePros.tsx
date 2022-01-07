import React, { useContext } from 'react';
import NextRdvs from './NextRdvs';

import UserContext from '../contexts/UserContext';

function HomePros() {
  const { userLogin, infosUserVehicule }: any = useContext(UserContext);
  return (
    <div className="min-h-screen">
      <h1 className="mt-8 mb-8 text-2xl text-background">
        Bienvenue {userLogin.firstname}
      </h1>
      <NextRdvs/>
    </div>
  );
}

export default HomePros;
