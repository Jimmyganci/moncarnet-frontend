import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import garage from '../../../assets/garage.png';
import UserContext from '../../../contexts/UserContext';
import { button, glassMorphism } from '../../../variableTailwind';

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
        `http://localhost:8000/api/users/${userLogin.id_user}/pros`,
        { idPros: infosPros.id_pros },
        { withCredentials: true },
      );
      setMessage(res.data);
      if (res.status === 200) {
        setMessage(`Le garage "${infosPros.name}" a été ajouté à vos favoris`);
      }
    } catch (err: any) {
      if (err.response.status === 409)
        setMessage("Ce garage est déjà l'un de vos favoris");
    }
  };

  return (
    <div className='flex justify-center w-full h-full py-5'>
      <div className={`w-11/12 h-full flex flex-col items-center rounded-lg p-4 ${glassMorphism}`}>
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
        <button className={button}>
          <Link to="/particular/garage">Retour</Link>
        </button>
        <p className={message.includes('déjà') ? 'text-error-500' : 'text-valid-500'}>
          {message}
        </p>
      </div>
    </div>
  );
}

export default GarageDetails;
