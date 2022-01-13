import React from 'react';
import { h2 } from '../../../variableTailwind';
import CreateAppointments from './CreateAppointment';

function Appointments() {
  return (
    <div className="h-full">
      <h1 className={`${h2}`}>
        Mes RDVs
      </h1>
      <CreateAppointments />
    </div>
  );
}

export default Appointments;
