import React from 'react';

import UserInfos from '../../../Interfaces/IuserInfos';

interface WithoutAppointmentCardProps {
  user: UserInfos;
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
