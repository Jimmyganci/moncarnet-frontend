import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { pros } from '../../../API/request';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import { h2 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import ProRdv from './ProRdv';

const NextRdvs = () => {
  const { prosLogin }: any = useContext(ProsContext);

  const [nextRdv, setNextRdv] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  // Date of the day

  let today = new Date().toISOString();

  // Search RDV from this pro
  // Search user's from this pro

  async function getAppointmentsAndUsers() {
    const res = await Promise.all([
      pros.getAppointments(prosLogin.id_user),
      pros.getUsers(prosLogin.id_user),
    ]);
    setNextRdv(res[0]);
    setUsers(res[1]);
  }

  useEffect(() => {
    prosLogin.id_user && getAppointmentsAndUsers();
  }, [prosLogin]);

  // Display correctly the date

  const dateDisplay = (element: any) => {
    const wholeDate = element.date.slice(0, 10);
    const day = wholeDate.slice(8, 10);
    const month = wholeDate.slice(5, 7);
    const year = wholeDate.slice(0, 4);
    const orderedDate = `${day}-${month}-${year}`;
    const hourDate = element.date.slice(11, 16);
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
          .filter((rdvFilter: any) => rdvFilter.date > today)
          .sort(function (a: any, b: any) {
            a = new Date(a.date);
            b = new Date(b.date);
            return b > a ? -1 : a < b ? 1 : 0;
          })
          .slice(0, 3)
          .map((rdvMap: any, i: number) => (
            <ProRdv
              key={i}
              date={dateDisplay(rdvMap)}
              comment={rdvMap.comment}
              user={
                users.find((el: any) => el.id_user === rdvMap.userId).firstname +
                ' ' +
                users.find((el: any) => el.id_user === rdvMap.userId).lastname
              }
              id_appointment={rdvMap.id_appointment}
              immat={rdvMap.immat}
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
