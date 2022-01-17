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
  const [users, setUsers] = useState<any>([]);

    // Search RDV from this pro

  useEffect(() => {    
    prosLogin.length !==0 && axios
      .get(`http://localhost:8000/api/appointment/pros/${prosLogin.id_user}`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setRdvArray(data))
      .catch((err) => console.log(err));
  }, [prosLogin]);

  // Search user's from this pro

  useEffect(() => {    
    prosLogin.length !==0 && axios
      .get(`http://localhost:8000/api/pros/${prosLogin.id_user}/users`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setUsers(data))
      .catch((err) => console.log(err));
  }, [prosLogin]);

  return (
    <div className="h-full w-5/6">
      <div className='flex justify-center'>
        <img className='w-12' src={calendar} alt="calendar logo" />
        <h1 className={`${h1}`}>
          Mes RDVs
        </h1>
      </div>     
      <main className='h-5/6 w-full overflow-x-auto'>
        {rdvArray.length !== 0 && users.length !== 0 &&
          rdvArray
          .sort((function(a:any, b:any) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
          }))
          .reverse()
            .map((e:any, i:number) => (
              <RdvDisplay 
              key={i} 
              date={e.date} 
              comment={e.comment} 
              user={users[e.userId].firstname+ ' '+users[e.userId].lastname}
              />
            ))
          }
      </main>
      <Link className='hover:text-white' to="/pros/appointments/create">Créer un RDV</Link>
    </div>
  );
}

export default Appointments;
