import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { pros } from '../../../API/request';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import { h1 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import RdvDisplay from './RdvDisplay';

function Appointments() {
  const { prosLogin }: any = useContext(ProsContext);
  const [rdvArray, setRdvArray] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);

  // Date of the day

  let today = new Date().toISOString();

  // Search RDV from this pro
  // Search user's from this pro

  async function getProsAndUsers() {
    const res = await Promise.all([
      pros.getAppointments(prosLogin.id_user),
      pros.getUsers(prosLogin.id_user),
    ]);
    setRdvArray(res[0]);
    setUsers(res[1]);
  }

  useEffect(() => {
    if (prosLogin.id_user !== undefined) getProsAndUsers();
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
    <div className="w-5/6 h-full">
      <div className="flex justify-center mt-6">
        <img className="w-12" src={calendar} alt="calendar logo" />
        <h1 className={`${h1}`}>Mes RDVs</h1>
      </div>
      <main className="w-full overflow-x-auto h-4/6">
        {rdvArray.length !== 0 &&
          users.length !== 0 &&
          rdvArray
            .filter((rdvfilter: any) => rdvfilter.date > today)
            .sort(function (a: any, b: any) {
              a = new Date(a.date);
              b = new Date(b.date);
              return a > b ? -1 : b < a ? 1 : 0;
            })
            .reverse()
            .map((rdv: any, i: number) => (
              <RdvDisplay
                key={i}
                id_appointment={rdv.id_appointment}
                date={dateDisplay(rdv)}
                comment={rdv.comment}
                userId={users.id_user}
                user={
                  users.find((el: any) => el.id_user === rdv.userId).firstname +
                  ' ' +
                  users.find((el: any) => el.id_user === rdv.userId).lastname
                }
                immat={rdv.immat}
              />
            ))}
      </main>
      <div className="flex justify-center mt-4 h-1/6">
        <Link className={`${button} p-3 h-12`} to="/pros/appointments/create">
          Créer un RDV
        </Link>
      </div>
    </div>
  );
}

export default Appointments;
