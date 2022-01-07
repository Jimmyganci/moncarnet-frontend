import React, { useEffect, useState } from 'react';
import ProRdv from './ProRdv';
import { glassMorphism } from '../variableTailwind';
import axios from 'axios';
import IProsInfos from '../Interfaces/IProsInfos';

type Props = IProsInfos;

const NextRdvs = (props) => {

  const [nextRdv, setNextRdv] = useState([]);
  const nextRdvDisplay:Array<object> = [];

  useEffect(() => {
    axios
    .get('http://localhost:8000/api/appointment',
    { withCredentials: true },
    )
      .then((res) => res.data)
      .then((data) => setNextRdv(data))
      .catch((err) => console.log(err));
  }, [])

  if(nextRdv.length !==0) {
    let orderRdv = nextRdv.sort();
    for(let i = 0; i<=2 ; i++ ) {
      nextRdvDisplay.push(orderRdv[i])
    }
  }
 

  return (
    <div className={`m-4 p-4 rounded-lg ${glassMorphism}`}>
        <h2>Mes prochains RDVs</h2>
        {(nextRdvDisplay.length !==0)  && nextRdvDisplay.map((e) => 
        <ProRdv
        date={e.date}
        comment={e.comment}
        user={e.userId}
        />
        )}        
    </div>
  );
}

export default NextRdvs;
