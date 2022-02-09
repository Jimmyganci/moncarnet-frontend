import React, { useContext } from 'react';

import UserContext from '../../contexts/UserContext';
import { title } from '../../variableTailwind';
import HomeGarage from './Garage/HomeGarage';
import HomeVehicule from './Vehicules/HomeVehicule';

function HomeCard() {
  const { userLoggedIn, infosUserVehicule } = useContext(UserContext);

  return (
    <div className="w-full lg:h-screen lg:flex lg:flex-col lg:justify-center lg:items-center">
      {userLoggedIn && infosUserVehicule && (
        <div className="flex flex-col items-center justify-center w-full h-full pb-5 lg:h-5/6">
          <h1 className={`${title}`}>Bienvenue {userLoggedIn.firstname}</h1>
          <div className="w-full h-full lg:max-w-lg">
            <HomeGarage />
            <HomeVehicule vehiculesSlice={infosUserVehicule.slice(0, 2)} />
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeCard;
