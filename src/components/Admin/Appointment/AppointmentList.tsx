import React, { useEffect, useState } from 'react';

import { appointment, pros, users } from '../../../API/request';
import AppointmentInfos from '../../../Interfaces/IAppointmentInfos';
import { glassMorphism } from '../../../variableTailwind';
import AppointmentCard from './AppointmentCard';

interface RequestId {
  appointment: number;
  userId: number;
  prosId: number;
}

function AppointmentList() {
  const [dataAppointment, setDataAppointment] = useState([]);

  async function getAppointments() {
    try {
      const getAll = await appointment.getAll();

      let requestId: Array<RequestId> = [];
      getAll.map(async (appointment: AppointmentInfos) => {
        requestId.push({
          appointment: appointment.id_appointment,
          userId: appointment.userId,
          prosId: appointment.prosId,
        });
      });

      Promise.all(
        requestId.map(async (id) => [
          await appointment.getOne(id.appointment),
          await users.getOne(id.userId),
          await pros.getOne(id.prosId),
        ]),
      ).then((res: any) => setDataAppointment(res));
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">Tous les rendez-vous</h1>
        </div>
        <div className={`bg-background/50 rounded-lg mt-4`}>
          <div className={`grid grid-cols-5 ${glassMorphism} rounded-lg pt-2 pb-2`}>
            <p>N°</p>
            <p>Date</p>
            <p>Client</p>
            <p>Professionel</p>
            <p>Commentaire</p>
          </div>
          {dataAppointment.map((appointment, index) => (
            <AppointmentCard
              key={index}
              appointment={appointment[0]}
              user={appointment[1]}
              pros={appointment[2]}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default AppointmentList;
