import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import { title } from '../../variableTailwind';
import HomeGarage from './HomeGarage';
import HomeVehicule from './HomeVehicule';

function HomeCard() {
  const { userLogin, infosUserVehicule }: any = useContext(UserContext);

  return (
    <div className='h-full w-full pb-5'>
      <h1 className={`${title}`}>
        Bienvenue {userLogin.firstname}
      </h1>
      <HomeGarage />
      <HomeVehicule vehiculesSlice={infosUserVehicule.slice(0, 2)} />
    </div>
  );
}

export default HomeCard;
