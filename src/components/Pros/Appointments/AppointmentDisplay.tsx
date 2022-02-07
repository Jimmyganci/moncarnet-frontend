import React, { useContext, useEffect, useState } from 'react';

import { users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { glassMorphism } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';

type Props = IAppointment;

const AppointmentDisplay: React.FC<Props> = (props) => {
  const { setAppointmentId } = useContext(ProsContext);
  const { setShowModal } = useContext(ProsContext);
  const [userName, setUserName] = useState<string>('');

  const handleSetModal = () => {
    setAppointmentId(props.id_appointment || 0);
    setShowModal(true);
  };

  async function getUser() {
    const user = await users.getOne(props.userId);
    setUserName(`${user.lastname} ${user.firstname}`);
  }

  useEffect(() => {
    getUser();
  }, []);
  return (
    <div
      className={`m-4 p-4 h-1/6 flex justify-around items-center rounded-lg ${glassMorphism}`}>
      <div className="flex justify-center w-1/4">
        <h2>
          {new Date(props.date).toLocaleDateString() +
            ' à ' +
            new Date(props.date).toLocaleTimeString().slice(0, 5)}
        </h2>
      </div>
      <div className="flex justify-center w-1/4">
        <p>{userName}</p>
      </div>
      <div className="flex justify-center w-1/4">
        <p>{props.comment.slice(0, 20) + '...'}</p>
      </div>
      <div className="flex justify-center w-1/4 mb-2">
        <button className={`${button} p-3`} onClick={() => handleSetModal()}>
          Détails
        </button>
      </div>
    </div>
  );
};

export default AppointmentDisplay;
