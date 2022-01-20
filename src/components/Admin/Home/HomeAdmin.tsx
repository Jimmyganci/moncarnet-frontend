import React, { useContext } from 'react';
import { Link, useOutletContext } from 'react-router-dom';

import AdminContext from '../../../contexts/AdminContext';

function HomeAdmin() {
  const { adminLogin }: any = useContext(AdminContext);
  const [vehiculeToValidate] = useOutletContext<Array<any>>();

  return (
    <div className="w-full">
      <div>
        <h1>Bienvenue {adminLogin.firstname}</h1>
      </div>
      <div>
        <h2>Voiture en attente de confirmation</h2>
        <p>
          {vehiculeToValidate.length > 0
            ? vehiculeToValidate.length
            : "Vous n'avez aucun véhicule à vérifier"}
        </p>
        <button>
          <Link to="/admin/vehicules/toValidate">Consulter</Link>
        </button>
      </div>
    </div>
  );
}

export default HomeAdmin;
