import React, { useEffect } from 'react';

import { vehicule } from '../../../API/request';
import { getVehicules } from '../../../API/requestVehicule';
import IAppointmentInfos from '../../../Interfaces/IAppointmentInfos';
import IProsInfos from '../../../Interfaces/IPros';
import IUserInfos from '../../../Interfaces/IUserInfos';

interface AppointmentProps {
  appointment: IAppointmentInfos;
  user: IUserInfos;
  pros: IProsInfos;
  setUserId: Function;
  setProsId: Function;
  setShowUser: Function;
  setShowPros: Function;
  setOneVehicule: Function;
  setShowVehicule: Function;
}

function AppointmentCard({
  appointment,
  user,
  pros,
  setUserId,
  setProsId,
  setShowUser,
  setShowPros,
  setOneVehicule,
  setShowVehicule,
}: AppointmentProps) {
  async function getVehicule() {
    const response = await vehicule.getOne(appointment.immat);
    if (response) {
      const vehiculeInfos = await getVehicules([response]);
      setOneVehicule(vehiculeInfos);
    }
  }

  useEffect(() => {
    getVehicule();
  }, []);

  return (
    <div className="grid grid-cols-6 pt-2 pb-2 hover:bg-background/20">
      <p>{appointment.id_appointment}</p>
      <button
        onClick={() => setShowVehicule(true)}
        className="underline hover:text-background"
      >
        {appointment.immat}
      </button>
      <p>{new Date(appointment.date).toLocaleDateString()}</p>
      <button
        onClick={() => {
          setUserId(user.id_user);
          setShowUser(true);
        }}
        className="underline hover:text-background"
      >
        {user.lastname.toUpperCase() +
          ' ' +
          user.firstname.charAt(0).toUpperCase() +
          user.firstname.slice(1)}
      </button>
      <button
        onClick={() => {
          setProsId(pros.id_pros);
          setShowPros(true);
        }}
        className="underline hover:text-background"
      >
        {pros.name}
      </button>
      <p>{appointment.comment}</p>
    </div>
  );
}

export default AppointmentCard;
