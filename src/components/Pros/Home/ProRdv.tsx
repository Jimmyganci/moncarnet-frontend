import React, { useContext } from 'react';

import ProsContext from '../../../contexts/ProsContext';
import IProsInfos from '../../../Interfaces/IProsInfos';
import { button, glassMorphism } from '../../../variableTailwind';

type Props = IProsInfos;

const ProRdv: React.FC<Props> = (props : any) => {

  const { setShowModal, setRdvToDisplay } = useContext(ProsContext);

  const handleSetModal = () => {
    setShowModal(true);
    setRdvToDisplay([props.date, props.user, props.comment, props.id_appointment]);
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
      <div className="flex justify-center w-1/4">
        <button className={`${button}`} onClick={() => handleSetModal()}>
          Détails
        </button>
      </div>
    </div>
  );
};

export default ProRdv;
