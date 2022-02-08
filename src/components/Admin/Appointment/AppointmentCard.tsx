import React, { useEffect } from 'react';

import { vehicule } from '../../../API/request';
import { getVehicules } from '../../../API/requestVehicule';
import IAppointment from '../../../Interfaces/IAppointment';
import IPros from '../../../Interfaces/IPros';
import IUser from '../../../Interfaces/IUser';
import IVehiculeAndUser from '../../../Interfaces/IVehiculeAndUser';

interface AppointmentProps {
  appointment: IAppointment;
  user: IUser;
  pros: IPros;
  setUserId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setProsId: React.Dispatch<React.SetStateAction<number | undefined>>;
  setShowUser: React.Dispatch<React.SetStateAction<boolean>>;
  setShowPros: React.Dispatch<React.SetStateAction<boolean>>;
  setOneVehicule: React.Dispatch<React.SetStateAction<IVehiculeAndUser[]>>;
  setShowVehicule: React.Dispatch<React.SetStateAction<boolean>>;
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
  // get one Vehicule and call the getVehicules...
  //...functions to have all informations about this vehicule (put the array of vehicule in the parameter of this function)
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
        className="underline hover:text-background">
        {appointment.immat}
      </button>
      <p>{new Date(appointment.date).toLocaleDateString()}</p>
      <button
        onClick={() => {
          setUserId(user.id_user);
          setShowUser(true);
        }}
        className="underline hover:text-background">
        {user.firstname.charAt(0).toUpperCase() + // format firstname and lastname
          user.firstname.slice(1) +
          ' ' +
          user.lastname.charAt(0).toUpperCase() +
          user.lastname.slice(1)}
      </button>
      <button
        onClick={() => {
          setProsId(pros.id_pros);
          setShowPros(true);
        }}
        className="underline hover:text-background">
        {pros.name}
      </button>
      <p>{appointment.comment}</p>
    </div>
  );
}

export default AppointmentCard;
