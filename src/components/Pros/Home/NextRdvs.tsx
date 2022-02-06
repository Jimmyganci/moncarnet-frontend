import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { pros } from '../../../API/request';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { h2 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import ProRdv from './ProRdv';
import IUser from '../../../Interfaces/IUser';


const NextRdvs = () => {

  const { prosLoggedIn } = useContext(ProsContext);

  const [nextRdv, setNextRdv] = useState<IAppointment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);

  // Date of the day

  let today = new Date().toISOString();

  // Search RDV from this pro
  // Search user's from this pro

  async function getAppointmentsAndUsers() {
    const res = await Promise.all([
      pros.getAppointments(prosLoggedIn.id_user),
      pros.getUsers(prosLoggedIn.id_user),
    ]);
    setNextRdv(res[0]);
    setUsers(res[1]);
  }

  useEffect(() => {
    prosLoggedIn.id_user && getAppointmentsAndUsers();
  }, [prosLoggedIn]);

  // Display correctly the date

  const dateDisplay = (appointment: IAppointment) => {
    const wholeDate = appointment.date.slice(0, 10);
    const day = wholeDate.slice(8, 10);
    const month = wholeDate.slice(5, 7);
    const year = wholeDate.slice(0, 4);
    const orderedDate = `${day}-${month}-${year}`;
    const hourDate = appointment.date.slice(11, 16);
    return `${orderedDate} à ${hourDate}`;
  };

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="flex items-center justify-center">
        <img className="w-12" src={calendar} alt="calendar" />
        <h2 className={`${h2}`}>Mes prochains RDVs</h2>
      </div>
      {nextRdv.length !== 0 &&
        users.length !== 0 &&
        nextRdv
          .filter((rdvfilter: IAppointment) => rdvfilter.date > today)
            .sort((a: IAppointment, b:IAppointment) => {
              const dateA : Date = new Date(a.date);
              const dateB : Date = new Date(b.date);
              return dateA > dateB ? -1 : dateB < dateA ? 1 : 0;
            })
            .reverse()
          .slice(0, 3)
          .map((appointment, index: number) => (
            <ProRdv
              key={index}
              date={dateDisplay(appointment)}
              comment={appointment.comment}
              user={
                users.find((user) => user.id_user === appointment.userId).firstname +
                ' ' +
                users.find((user) => user.id_user === appointment.userId).lastname
              }
              id_appointment={appointment.id_appointment}
              immat={appointment.immat}
            />
          ))}
      <div className="flex justify-around">
        <Link className={`${button} p-3`} to="/pros/appointments">
          Voir tous
        </Link>
        <Link className={`${button} p-3`} to="/pros/appointments/create">
          Créer un RDV
        </Link>
      </div>
    </div>
  );
};

export default NextRdvs;
