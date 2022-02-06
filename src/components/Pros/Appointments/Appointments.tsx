import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import IAppointment from '../../../Interfaces/IAppointment'
import { pros } from '../../../API/request';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import { h1 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import AppointmentDisplay from './AppointmentDisplay';
import IUser from '../../../Interfaces/IUser';

const Appointments = () => {
  
  const { prosLoggedIn } = useContext(ProsContext);

  const [appointmentArray, setAppointmentArray] = useState<IAppointment[]>([]);
  const [users, setUsers] = useState<IUser[]>([]);
 
  // Date of the day

  const today: Date = new Date();

  async function getProsAndUsers() {
    const res = await Promise.all([
        // Search RDV from this pro
      pros.getAppointments(prosLoggedIn.id_user),
        // Search user's from this pro
      pros.getUsers(prosLoggedIn.id_user),
    ]);
    setAppointmentArray(res[0]);
    setUsers(res[1]);
  };

  useEffect(() => {
    prosLoggedIn && getProsAndUsers();
  }, [prosLoggedIn]);

  return (
    <div className="w-5/6 h-full">
      <div className="flex justify-center mt-6">
        <img className="w-12" src={calendar} alt="calendar logo" />
        <h1 className={`${h1}`}>Mes RDVs</h1>
      </div>
      <main className="w-full overflow-x-auto h-4/6">
        {appointmentArray.length !== 0 &&
          users.length !== 0 &&
          appointmentArray
            .filter((appointmentfilter: IAppointment) => appointmentfilter.date > today)
            .sort((a: IAppointment, b:IAppointment) => {
              const dateA : Date = new Date(a.date);
              const dateB : Date = new Date(b.date);
              return dateA > dateB ? -1 : dateB < dateA ? 1 : 0;
            })
            .reverse()
            .map((appointment, index) => (
              <AppointmentDisplay
                key={index}
                id_appointment={appointment.id_appointment}
                date={appointment.date}
                comment={appointment.comment}
                userId={appointment.userId}
                prosId={appointment.prosId}
                immat={appointment.immat}
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
