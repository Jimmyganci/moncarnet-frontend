import React, { useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { vehicule } from '../../API/request';
import IVehicule from '../../Interfaces/IVehicule';
import SideBarAdmin from '../Admin/SideBar/SideBarAdmin';

function Admin() {
  const [vehiculeToValidate, setVehiculeToValidate] = useState<IVehicule[]>();

  useEffect(() => {
    async function getVoitureToValidate() {
      try {
        const res = await vehicule.getVehiculeNoValidate();
        setVehiculeToValidate(res);
      } catch (err) {
        console.log(err);
      }
    }
    getVoitureToValidate();
  }, []);
  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <Outlet context={[vehiculeToValidate, setVehiculeToValidate]} />
    </div>
  );
}

export default Admin;
