import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import ProsContext from '../../../contexts/ProsContext';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import { h2 } from '../../../variableTailwind';
import ProRdv from './ProRdv';
import { Link } from 'react-router-dom';
import { button } from '../../../variableTailwind';


const NextRdvs = () => {

  const { prosLogin }: any = useContext(ProsContext);

  const [nextRdv, setNextRdv] = useState<any>([]);
  const [users, setUsers] = useState<any>([]);  

  // Date of the day

  let today = new Date().toISOString();

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

   // Display correctly the date
   
   const dateDisplay = (element:Array<any>) => {
    const wholeDate =element.date.slice(0,10);
    const day = wholeDate.slice(8,10);
    const month = wholeDate.slice(5,7);
    const year = wholeDate.slice(0,4);
    const orderedDate = `${day}-${month}-${year}`;
    const hourDate = element.date.slice(11,16);
    return `${orderedDate} à ${hourDate}`;
 }

  return (
    <div className="flex flex-col justify-around h-full">
      <div className="flex items-center justify-center">
        <img className="w-12" src={calendar} alt="calendar" />
        <h2 className={`${h2}`}>Mes prochains RDVs</h2>
      </div>
        {nextRdv.length !== 0 && users.length !== 0 &&
          nextRdv
          .filter((e:any) => e.date > today)
          .sort((function(a:any, b:any) {
            a = new Date(a.date);
            b = new Date(b.date);
            return b>a ? -1 : a<b ? 1 : 0;
          }))
          .slice(0, 3)
          .map((e:any, i:number) => (
            <ProRdv 
            key={i} 
            date={dateDisplay(e)} 
            comment={e.comment} 
            user={users.find(el => el.id_user === e.userId).firstname + " " + users.find(el => el.id_user === e.userId).lastname}
            />
          ))
        }
      <div className="flex justify-around">
        <Link className={`${button} p-3`} to="/pros/appointments">Voir tous</Link>
        <Link className={`${button} p-3`}to="/pros/appointments/create">Créer un RDV</Link>
      </div>
    </div>
  );
};

export default NextRdvs;
