import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { h2 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import AppointmentDisplay from './AppointmentDisplay';

const Appointments = () => {
  const { appointmentToDisplay } = useContext(ProsContext);

    // Date of the day
    const today: Date = new Date();

  const nextAppointments = appointmentToDisplay
  .filter(
    (appointmentfilter: IAppointment) =>
      new Date(appointmentfilter.date).toISOString() >
      new Date(today).toISOString(),
  );

  const pastAppointments = appointmentToDisplay
  .filter(
    (appointmentfilter: IAppointment) =>
      new Date(appointmentfilter.date).toISOString() <
      new Date(today).toISOString(),
  )

  return (
    <div className="w-5/6 h-full overflow-auto">
        <div className="flex justify-center mt-4">
          <img className="w-12" src={calendar} alt="calendar logo" />
          <h1 className={`${h2}`}>Mes prochains RDVs </h1>
        </div>
        <section className="w-full">
          {nextAppointments && nextAppointments          
              .sort((a: IAppointment, b: IAppointment) => {
                const dateA: Date = new Date(a.date);
                const dateB: Date = new Date(b.date);
                return dateB > dateA ? -1 : dateB < dateA ? 1 : 0;
              })
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
        </section>
        <div className="flex justify-center mt-6">
          <img className="w-12" src={calendar} alt="calendar logo" />
          <h1 className={`${h2}`}>Mes RDVs passés </h1>
        </div>
        <section className="w-full">
          {pastAppointments && pastAppointments          
              .sort((a: IAppointment, b: IAppointment) => {
                const dateA: Date = new Date(a.date);
                const dateB: Date = new Date(b.date);
                return dateB < dateA ? -1 : dateB < dateA ? 1 : 0;
              })
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
        </section>
        <div className="flex justify-center mt-4 h-1/6">
          <Link className={`${button} p-3 h-12`} to="/pros/appointments/create">
            Créer un RDV
          </Link>
        </div>
      </div>
  );
};

export default Appointments;
