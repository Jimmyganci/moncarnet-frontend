import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';

import { vehicule } from '../../API/request';
import AdminContext from '../../contexts/AdminContext';
import IVehicule from '../../Interfaces/IVehicule';
import SideBarAdmin from '../Admin/SideBar/SideBarAdmin';

function Admin() {
  const [vehiculeToValidate, setVehiculeToValidate] = useState<IVehicule[]>();
  const { renderState } = useContext(AdminContext);

  async function getVoitureToValidate() {
    try {
      const res = await vehicule.getVehiculeNoValidate();
      setVehiculeToValidate(res);      
    } catch (err: any) {
      console.log(err);
    }
  }

  useEffect(() => {
    getVoitureToValidate();
  }, [renderState]);

  return (
    <div className="flex min-h-screen">
      <SideBarAdmin />
      <Outlet context={vehiculeToValidate} />
    </div>
  );
}

export default Admin;
