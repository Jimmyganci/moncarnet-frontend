import React, { useContext } from 'react';

import UserContext from '../contexts/UserContext';
import HomeGarage from './HomeGarage';
import HomeVehicule from './HomeVehicule';

function HomeCard() {
  const { infosUserVehicule }: any = useContext(UserContext);
  return (
    <div>
      <HomeGarage />
      <HomeVehicule vehiculesSlice={infosUserVehicule.slice(0, 2)} />
    </div>
  );
}

export default HomeCard;
