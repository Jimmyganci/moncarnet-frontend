import React, { useEffect, useState } from 'react';
import ProRdv from './ProRdv';
import { glassMorphism } from '../../variableTailwind';
import axios from 'axios';
import calendar from '../../assets/minimalist_logos/calendar.svg';

const NextRdvs = () => {

  const [nextRdv, setNextRdv] = useState([]);
  const nextRdvDisplay:Array<any> = [];

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
    <div className={`m-4 p-4 rounded-lg  ${glassMorphism}`}>
      <div className='flex items-center justify-center'>
        <img className='h-20' src={calendar} alt="calendar" />
        <h2 className='ml-12'>Mes prochains RDVs</h2>  
      </div>            
      {(nextRdvDisplay.length !==0)  && nextRdvDisplay.map((e, i) => 
      <ProRdv
        key = {i}
        date={e.date}
        comment={e.comment}
        user={e.userId}
      />
      )}
      <div className='flex justify-around'>
        <button>Voir tout</button>
        <button>Créer un RDV</button>
      </div>     
    </div>
  );
}

export default NextRdvs;
