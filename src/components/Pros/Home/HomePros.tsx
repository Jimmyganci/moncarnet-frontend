import React from 'react';

import { h1 } from '../../../variableTailwind';
import NextAppointments from './NextAppointments';

function HomePros() {
  return (
    <div className="w-full h-full">
      <h1 className={`${h1} m-6`}>Bienvenue</h1>
      <main className="h-5/6">
        <NextAppointments />
      </main>
    </div>
  );
}

export default HomePros;
