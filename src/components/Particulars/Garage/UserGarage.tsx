import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { users } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import IPros from '../../../Interfaces/IPros';
import { button, glassMorphism, title } from '../../../variableTailwind';

function UserGarage() {
  const [usersGarage, setUsersGarage] = useState<IPros[]>();
  const { userLogin }: any = useContext(UserContext);

  useEffect(() => {
    async function getUsersGarage() {
      if (userLogin.id_user !== undefined) {
        try {
          const res = await users.getGarage(userLogin.id_user);
          setUsersGarage(res);
        } catch (err) {
          console.log(err);
        }
      }
    }
    getUsersGarage();
  }, [userLogin]);

  const handleDeleteGarage = async (idPros: number) => {
    try {
      const res = await users.deleteGarage(userLogin.id_user, idPros);
      console.log(res);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <div className="flex items-center justify-around">
        <h1 className={`${title}`}>Mes garages</h1>
        <Link to="/particular/garage">
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
              d="M12 4v16m8-8H4"
            />
          </svg>
        </Link>
      </div>

      <div className="m-4">
        {usersGarage && usersGarage.length > 0 ? (
          usersGarage.map((el: any) => (
            <div
              className={`flex flex-col mt-4 mb-4 rounded-lg ${glassMorphism}`}
              key={el.id_pros}>
              <div className="flex items-center justify-around p-4">
                <div className="flex flex-col justify-center w-1/2">
                  <p>{el.name}</p>
                  <p>{el.city}</p>
                </div>
                <Link to={`/particular/garage-details/${el.id_pros}`}>
                  <button className={` mt-0 ${button}`}>Details</button>
                </Link>
                <button onClick={() => handleDeleteGarage(el.id_pros)}>
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
              <button className="flex justify-center p-2 duration-300 ease-in-out bg-opacity-50 rounded-b-lg hover:bg-primary-hovered bg-background">
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
            <p>{`Vous n'avez aucu garage enregistré dans vos favoris`}</p>
            <Link to="/particular/garage">
              <button className={button}>Afficher la liste des garages</button>
            </Link>
          </>
        )}
      </div>
    </div>
  );
}

export default UserGarage;
