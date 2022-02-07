import React, { useContext } from 'react';
import { Link } from 'react-router-dom';

import calendar from '../../../assets/minimalist_logos/calendar.svg';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { h2 } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';
import AppointmentDisplay from '../Appointments/AppointmentDisplay';

const NextRdvs = () => {
  const { appointmentToDisplay } = useContext(ProsContext);

  // Date of the day

  let today: Date = new Date();

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="flex items-center justify-center">
        <img className="w-12" src={calendar} alt="calendar" />
        <h2 className={`${h2}`}>Mes prochains RDVs</h2>
      </div>
      {appointmentToDisplay &&
        appointmentToDisplay
          .filter(
            (appointmentFilter: IAppointment) =>
              new Date(appointmentFilter.date).toISOString() >
              new Date(today).toISOString(),
          )
          .sort((a: IAppointment, b: IAppointment) => {
            const dateA: Date = new Date(a.date);
            const dateB: Date = new Date(b.date);
            return dateB > dateA ? -1 : dateB < dateA ? 1 : 0;
          })
          .slice(0, 3)
          .map((appointment, index: number) => (
            <AppointmentDisplay
              key={index}
              date={appointment.date}
              comment={appointment.comment}
              userId={appointment.userId}
              prosId={appointment.prosId}
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
