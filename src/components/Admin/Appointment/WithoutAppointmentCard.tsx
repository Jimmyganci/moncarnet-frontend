import React from 'react';

import IUser from '../../../Interfaces/IUser';

interface WithoutAppointmentCardProps {
  user: IUser;
}

function WithoutAppointmentCard({ user }: WithoutAppointmentCardProps) {
  return (
    <div className="grid grid-cols-3 pt-2 pb-2 hover:bg-background/30">
      <p>{user.lastname}</p>
      <p>{user.firstname}</p>
      <p>{user.email}</p>
    </div>
  );
}

export default WithoutAppointmentCard;
