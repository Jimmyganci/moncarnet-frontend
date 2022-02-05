import React, { useContext } from 'react';

import ProsContext from '../../../contexts/ProsContext';
// import IAppointmentInfos from '../../../Interfaces/IAppointmentInfos';
import IProsInfos from '../../../Interfaces/IProsInfos';
import { glassMorphism } from '../../../variableTailwind';
import { button } from '../../../variableTailwind';

type Props = IProsInfos;

const RdvDisplay: React.FC<Props> = (props : any) => {

  const { setShowModal, setRdvToDisplay, rdvToDisplay } = useContext(ProsContext);

  const handleSetModal = () => {
    setShowModal(true);
    setRdvToDisplay([
      props.date,
      props.user,
      props.comment,
      props.id_appointment,
      props.immat,
    ]);
  };

  return (
    <div
      className={`m-4 p-4 h-1/6 flex justify-around items-center rounded-lg ${glassMorphism}`}>
      <div className="flex justify-center w-1/4">
        <h2>{props.date}</h2>
      </div>
      <div className="flex justify-center w-1/4">
        <p>{props.user}</p>
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

export default RdvDisplay;