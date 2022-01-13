import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import ProsContext from '../../../contexts/ProsContext';
import { h1 } from '../../../variableTailwind';
import { Link } from 'react-router-dom';
import RdvDisplay from './RdvDisplay';
import calendar from '../../../assets/minimalist_logos/calendar.svg'

function Appointments() {

  const { prosLogin }: any = useContext(ProsContext);

  const [rdvArray, setRdvArray] = useState<any>([]);
  let rdvArrayDisplay:Array<any> = [];


  useEffect(() => {    
    prosLogin.length !==0 && axios
      .get(`http://localhost:8000/api/appointment/pros/${prosLogin.id_user}`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setRdvArray(data))
      .catch((err) => console.log(err));
  }, [prosLogin]);

  rdvArrayDisplay = rdvArray.sort((function(a:any, b:any) {
    a = new Date(a.date);
    b = new Date(b.date);
    return a>b ? -1 : a<b ? 1 : 0;
}))
.reverse();

  return (
    <div className="h-full w-5/6">
      <div className='flex justify-center'>
        <img className='w-12' src={calendar} alt="calendar logo" />
        <h1 className={`${h1}`}>
          Mes RDVs
        </h1>
      </div>     
      <main className='h-5/6 w-full overflow-x-auto'>
        {rdvArrayDisplay.length !== 0 &&
          rdvArrayDisplay
            .map((e:any, i:number) => (
              <RdvDisplay key={i} date={e.date} comment={e.comment} user={e.userId} />
            ))
          }
      </main>
      <Link className='hover:text-white' to="/pros/appointments/create">Créer un RDV</Link>
    </div>
  );
}

export default Appointments;
