import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import ProsContext from '../../../contexts/ProsContext';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import { h2 } from '../../../variableTailwind';
import ProRdv from './ProRdv';
import { Link } from 'react-router-dom';


const NextRdvs = () => {

  const { prosLogin }: any = useContext(ProsContext);

  const [nextRdv, setNextRdv] = useState<any>();
  const [users, setUsers] = useState<any>();

  // Search RDV from this pro

  useEffect(() => {    
    prosLogin.length !==0 && axios
      .get(`http://localhost:8000/api/appointment/pros/${prosLogin.id_user}`, { withCredentials: true })
      .then((res) => res.data)
      .then((data) => setNextRdv(data))
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

users && nextRdv && console.log(users[nextRdv[1].userId].firstname)
users && nextRdv && console.log(nextRdv[2].userId)

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="flex items-center justify-center">
        <img className="w-12" src={calendar} alt="calendar" />
        <h2 className={`${h2}`}>Mes prochains RDVs</h2>
      </div>
        {nextRdv && users &&
          nextRdv
          .sort((function(a:any, b:any) {
            a = new Date(a.date);
            b = new Date(b.date);
            return a>b ? -1 : a<b ? 1 : 0;
          }))
          .reverse()
          .slice(0, 3)
          .map((e:any, i:number) => (
            <ProRdv key={i} date={e.date} comment={e.comment} user={users[1].firstname + ' ' + users[1].lastname} />
          ))
        }
      <div className="flex justify-around">
        <Link className='hover:text-white' to="/pros/appointments">Voir tous</Link>
        <Link className='hover:text-white' to="/pros/appointments/create">Créer un RDV</Link>
      </div>
    </div>
  );
};

export default NextRdvs;
