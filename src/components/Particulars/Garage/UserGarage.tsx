import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { users } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IPros from '../../../Interfaces/IPros';
import { button, glassMorphism, title } from '../../../variableTailwind';
import ReturnButton from '../../ReturnButton';
import AppointmentRequestModal from './AppointmentRequestModal';

function UserGarage() {
  const [usersGarage, setUsersGarage] = useState<IPros[]>();
  const { userLoggedIn } = useContext(UserContext);
  const [deletedGarage, setDeletedGarage] = useState<boolean>(false);
  const [showAppointmentRequest, setShowAppointmentRequest] = useState<boolean>(false);
  const [garageId, setGarageId] = useState<number>(0);

  useEffect(() => {
    async function getUsersGarage() {
      if (userLoggedIn.id_user !== undefined) {
        try {
          const res = await users.getGarage(userLoggedIn.id_user);

          setUsersGarage(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getUsersGarage();
  }, [userLoggedIn, deletedGarage]);

  const handleDeleteGarage = async (idPros: number) => {
    try {
      const res = userLoggedIn.id_user && await users.deleteGarage(userLoggedIn.id_user, idPros);
      res && toast.success(res);
      setDeletedGarage(false)
    } catch (err) {
      err && toast.error("Une erreur s'est produite!");
    }
  };
  return (
    <div className='flex w-full max-w-lg flex-col items-center justify-center'>
      <div className="w-full flex items-center justify-center">
        <h1 className={`${title}`}>Mes garages</h1>
        <Link to="/particular/garage">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6 text-background border-2 border-background rounded-full hover:bg-white hover:text-primary transition-all"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>

      <div className="w-5/6 m-4">
        {!showAppointmentRequest && usersGarage && usersGarage.length > 0 ? (
          usersGarage.map((garage: IPros) => (
            <div
              className={`flex flex-col w-full mt-4 mb-4 rounded-lg ${glassMorphism}`}
              key={garage.id_pros}>
              <div className="flex items-center justify-around p-4">
                <div className="flex flex-col justify-center w-1/2">
                  <p>{garage.name}</p>
                  <p>{garage.city}</p>
                </div>
                <Link to={`/particular/garage-details/${garage.id_pros}`}>
                  <button className={` mt-0 ${button}`}>Details</button>
                </Link>
                <button onClick={() => {garage.id_pros && handleDeleteGarage(garage.id_pros); setDeletedGarage(true)}}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-7 h-7"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v6a1 1 0 102 0V8a1 1 0 00-1-1z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
              <button 
              onClick={() => {garage.id_pros && setGarageId(garage.id_pros); setShowAppointmentRequest(true)}}
              className="flex justify-center p-2 duration-300 ease-in-out bg-opacity-50 rounded-b-lg hover:bg-primary-hovered bg-background">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="w-6 h-6"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                  />
                </svg>
                <p className="ml-4">Prendre rendez-vous</p>
              </button>
            </div>
          ))
        ) : (
          <>
           {!showAppointmentRequest && (<div>
              <p>{`Vous n'avez aucu garage enregistré dans vos favoris`}</p>
              <Link to="/particular/garage">
                <button className={button}>Afficher la liste des garages</button>
              </Link>
            </div>)}
          </>
        )}
      </div>
      <>{!showAppointmentRequest && (<div className='text-md font-inter max-w-md mb-2 w-[60%] flex justify-center mt-4'><ReturnButton target={'/particular/home'}/></div>)}</>
      <AppointmentRequestModal garageId={garageId} showAppointmentRequest={showAppointmentRequest} setShowAppointmentRequest={setShowAppointmentRequest} />
    </div>
  );
}

export default UserGarage;
