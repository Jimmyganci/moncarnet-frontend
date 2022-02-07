import React from 'react';

import { glassMorphism } from '../../../variableTailwind';

function CountAppointment({ appointment }: { appointment: number }) {
  return (
    <div
      className={`flex flex-col items-center justify-between flex-1 rounded-lg ${glassMorphism} p-4`}>
      <p>Au total</p>
      <p
        className={`${glassMorphism} mt-2 mb-2 p-4 w-12 rounded-lg text-primary text-2xl`}>
        {appointment}
      </p>
      <p>rendez-vous ont été pris sur la plateforme</p>
    </div>
  );
}

export default CountAppointment;
