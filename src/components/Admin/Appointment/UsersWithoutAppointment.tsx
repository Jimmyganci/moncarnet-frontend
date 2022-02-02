import React, { useEffect, useState } from 'react';

import { users } from '../../../API/request';
import IUserInfos from '../../../Interfaces/IUserInfos';
import { glassMorphism } from '../../../variableTailwind';
import WithoutAppointmentCard from './WithoutAppointmentCard';

function UsersWithoutAppointment() {
  const [dataUsers, setDataUsers] = useState<Array<IUserInfos>>([]);

  //  get all users witch doesn't never had an appointment
  async function getUsersWithoutAppointment() {
    const res = await users.getUserWithoutAppointment();
    setDataUsers(res);
  }

  useEffect(() => {
    getUsersWithoutAppointment();
  }, []);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">
            Utilisateurs sans rendez-vous
          </h1>
        </div>
        <div className={`${glassMorphism} mt-4 rounded-lg`}>
          <div className={`grid grid-cols-3 ${glassMorphism} rounded-lg pt-2 pb-2`}>
            <p>Nom</p>
            <p>Prénoms</p>
            <p>Email</p>
          </div>
          <div>
            {dataUsers.map((user, index) => (
              <WithoutAppointmentCard key={index} user={user} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default UsersWithoutAppointment;
