import 'react-circular-progressbar/dist/styles.css';

import React from 'react';
import { CircularProgressbar } from 'react-circular-progressbar';

import { button, glassMorphism } from '../../../variableTailwind';

interface UserAppointmentProps {
  percentage: number;
}

function UsersWithoutAppointment({ percentage }: UserAppointmentProps) {
  return (
    <div
      className={`flex flex-col items-center justify-between flex-1 p-4 rounded-lg ${glassMorphism}`}>
      <div className="w-1/5">
        <CircularProgressbar
          value={percentage}
          text={`${percentage}%`}
          styles={{
            path: {
              stroke: `rgb(0,155,155)`,
            },
          }}
        />
      </div>

      <p>{`% d'utilisateurs qui n'ont pas pris de rendez-vous sur la plateforme!`}</p>
      <button className={`${button}`}>Voir</button>
    </div>
  );
}

export default UsersWithoutAppointment;
