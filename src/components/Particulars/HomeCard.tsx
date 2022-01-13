import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import HomeGarage from './HomeGarage';
import HomeVehicule from './HomeVehicule';

function HomeCard() {
  const { userLogin, infosUserVehicule }: any = useContext(UserContext);
  console.log(userLogin);

  return (
    <div>
      <h1 className="mt-8 mb-8 text-2xl text-background">
        Bienvenue {userLogin.firstname}
      </h1>
      <HomeGarage />
      <HomeVehicule vehiculesSlice={infosUserVehicule.slice(0, 2)} />
    </div>
  );
}

export default HomeCard;
