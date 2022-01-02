import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import garage from '../assets/garage.png';
import UserContext from '../contexts/UserContext';
import { button, glassMorphism } from '../variableTailwind';

function GarageDetails() {
  const { userLogin }: any = useContext(UserContext);
  const [infosPros, setInfosPros] = useState<any>([]);
  let { prosId } = useParams();
  const [message, setMessage] = useState<string>('');

  useEffect(() => {
    async function getInfosGarage() {
      try {
        const res = await axios.get(`http://localhost:8000/api/pros/${prosId}`, {
          withCredentials: true,
        });
        setInfosPros(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getInfosGarage();
  }, []);

  const handleChoiceGarage = async () => {
    try {
      const res = await axios.put(
        `http://localhost:8000/api/users/pros/${userLogin.id_user}`,
        { idPros: infosPros.id_pros },
        { withCredentials: true },
      );
      setMessage(res.data);
    } catch (err: any) {
      if (err.response.status === 409)
        setMessage("Ce garage est déjà l'un de vos favoris");
    }
  };

  return (
    <div className={`flex flex-col items-center m-4 rounded-lg p-4 ${glassMorphism}`}>
      <img className="w-2/6 m-4" src={garage} alt="garage" />
      <h1 className="text-3xl">{infosPros.name}</h1>

      <div className="mt-4 mb-4">
        <p className="underline">Adresse</p>
        <p>{infosPros.address}</p>
        <p>{infosPros.postal_code}</p>
        <p>{infosPros.city}</p>
      </div>
      <p>{infosPros.email}</p>
      <p>{infosPros.phone}</p>
      <p className="mt-4 mb-2 underline">Prestations/Services</p>
      <div className={`rounded-lg p-4 w-full mb-4 ${glassMorphism}`}>
        <p>Changement pneu</p>
        <p>Révisions</p>
        <p>Courroie distribution</p>
      </div>
      <p className="underline">SIRET</p>
      <p>{infosPros.siret}</p>
      <button onClick={handleChoiceGarage} className={button}>
        Ajouter aux favoris
      </button>
      <p className="text-error-500">{message}</p>
    </div>
  );
}

export default GarageDetails;
