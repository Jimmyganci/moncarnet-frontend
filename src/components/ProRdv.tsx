import React from 'react';
import { glassMorphism } from '../variableTailwind';
import IProsInfos from '../Interfaces/IProsInfos';

type Props = IProsInfos;

const ProRdv:React.FC<Props> = (props) => {

  return (
    <div className={`m-4 p-4 rounded-lg ${glassMorphism}`}>
        <h2>{props.date}</h2>
        <p>{props.user}</p>
        <p>{props.comment}</p>      
        <button>Détails</button>
    </div>
  );
}

export default ProRdv;
