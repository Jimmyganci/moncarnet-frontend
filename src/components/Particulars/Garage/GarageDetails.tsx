import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

import { pros, users } from '../../../API/request';
import garage from '../../../assets/garage.png';
import UserContext from '../../../contexts/UserContext';
import IPros from '../../../Interfaces/IPros';
import { button, glassMorphism } from '../../../variableTailwind';
import ReturnButton from '../../ReturnButton';

function GarageDetails() {
  const { userLoggedIn } = useContext(UserContext);
  const [infosPros, setInfosPros] = useState<IPros>();
  const [userGarage, setUserGarage] = useState<IPros>();
  const [reRender, setReRender] = useState<boolean>(false);
  let { prosId } = useParams();

  async function getInfosGarage() {
    try {
      if (prosId) {
        const res = await pros.getOne(Number(prosId));
        setInfosPros(res);
      }
    } catch (err) {
      console.log(err);
    }
  }

  async function getOneGarageFavorite() {
    try {
      if (userLoggedIn.id_user) {
        const garage = await users.getOneFavoriteGarage(
          userLoggedIn.id_user,
          Number(prosId),
        );
        setUserGarage(garage);
      }
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getInfosGarage();
    getOneGarageFavorite();
  }, [prosId, reRender]);

  const handleChoiceGarage = async () => {
    if (userLoggedIn.id_user && infosPros && infosPros.id_pros) {
      try {
        const res = await users.addFavorite(userLoggedIn.id_user, infosPros.id_pros);
        if (res.status === 204) {
          toast.success(`Le garage "${infosPros.name}" a été ajouté à vos favoris`);
          setReRender(!reRender);
        }
    } catch (err: any) {
      if (err.response.status === 409)
        toast.error("Ce garage est déjà l'un de vos favoris");
    }
  };
}

  return (
    <div className="flex justify-center w-full h-full py-5">
      {infosPros && 
      <div
        className={`w-11/12 h-full flex flex-col items-center rounded-lg p-4 ${glassMorphism}`}>
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
          {userGarage?.id_pros === undefined && (
            <button onClick={handleChoiceGarage} className={button}>
              Ajouter aux favoris
            </button>
          )}
          <div className="w-1/2">
            <ReturnButton target={''} />
          </div>
      </div>}
    </div>
  );
}

export default GarageDetails;
