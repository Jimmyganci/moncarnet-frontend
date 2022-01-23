import React, { useContext } from 'react';

import profil from '../../../assets/minimalist_logos/profile.svg';
import AdminContext from '../../../contexts/AdminContext';
import AdminInfos from '../../../Interfaces/IAdminContext';
import { glassMorphism } from '../../../variableTailwind';

function ProfilAdmin() {
  const { adminLogin }: Array<AdminInfos> = useContext(AdminContext);
  console.log(adminLogin);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">Profil</h1>
        </div>
        <div className={`flex flex-col items-center ${glassMorphism} p-4 rounded-lg`}>
          <div>
            <img src={profil} alt="profil_logo" />
          </div>
          <div className="flex justify-around w-1/4">
            <p className="text-4xl">{adminLogin.firstname}</p>
            <p className="text-4xl">{adminLogin.lastname}</p>
          </div>
          <div>
            <p className="text-2xl">{adminLogin.email}</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfilAdmin;
