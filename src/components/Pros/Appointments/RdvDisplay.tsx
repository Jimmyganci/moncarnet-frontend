import { glassMorphism } from '../../../variableTailwind';
import IProsInfos from '../../../Interfaces/IProsInfos';
import { button } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';
import React, { useContext } from 'react';

type Props = IProsInfos;

const RdvDisplay:React.FC<Props> = (props) => {

  const { setShowModal, setRdvToDisplay }: any = useContext(ProsContext);

  const handleSetModal = () => {
    setShowModal(true);
    setRdvToDisplay([props.date, props.user, props.comment]);
  }

  return (
    <div className={`m-4 p-4 h-1/6 flex justify-around items-center rounded-lg ${glassMorphism}`}>
      <div className='w-1/4 flex justify-center'>
        <h2>{props.date}</h2>
      </div>
      <div className='w-1/4 flex justify-center'>
        <p>{props.user}</p>
      </div>
      <div className='w-1/4 flex justify-center'>
        <p>{props.comment}</p>
      </div>
      <div className='w-1/4 flex justify-center'>
        <button className={`${button} p-3`} onClick={() => handleSetModal()}>Détails</button>
      </div>
    </div>
  );
}

export default RdvDisplay;
