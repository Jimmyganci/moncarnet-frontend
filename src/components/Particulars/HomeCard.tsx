import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import { title } from '../../variableTailwind';
import HomeGarage from './Garage/HomeGarage';
import HomeVehicule from './Vehicules/HomeVehicule';

function HomeCard() {
  const { userLogin, infosUserVehicule }: any = useContext(UserContext);

  return (
    <div className="lg:h-screen w-full lg:flex lg:flex-col lg:justify-center lg:items-center">
      <div className="h-full lg:h-5/6 w-full pb-5 flex flex-col justify-center items-center">
        <h1 className={`${title}`}>Bienvenue {userLogin.firstname}</h1>
        <div className="lg:max-w-lg h-full w-full">
          <HomeGarage />
          <HomeVehicule vehiculesSlice={infosUserVehicule.slice(0, 2)} />
        </div>
      </div>
    </div>
  );
}

export default HomeCard;
