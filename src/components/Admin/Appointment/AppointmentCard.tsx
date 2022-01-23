import React, { useState } from 'react';

import UserInfos from '../../../Interfaces//IuserInfos';
import AppointmentInfos from '../../../Interfaces/IAppointmentInfos';
import ProsInfos from '../../../Interfaces/IPros';
import ModalInfos from './ModalInfos';

interface AppointmentProps {
  appointment: AppointmentInfos;
  user: UserInfos;
  pros: ProsInfos;
}

function AppointmentCard({ appointment, user, pros }: AppointmentProps) {
  console.log(new Date(appointment.date).toLocaleDateString());
  const [showUser, setShowUser] = useState(false);
  const [showPros, setShowPros] = useState(false);

  return (
    <div className="grid grid-cols-5 pt-2 pb-2 hover:bg-background/20">
      <p>{appointment.id_appointment}</p>
      <p>{new Date(appointment.date).toLocaleDateString()}</p>
      <button
        onClick={() => setShowUser(true)}
        className="underline hover:text-background">
        {user.lastname}
      </button>
      <button
        onClick={() => setShowPros(true)}
        className="underline hover:text-background">
        {pros.name}
      </button>
      <p>{appointment.comment}</p>
      <ModalInfos
        showUser={showUser}
        setShowUser={setShowUser}
        showPros={showPros}
        setShowPros={setShowPros}
        user={user}
        pros={pros}
      />
    </div>
  );
}

export default AppointmentCard;
