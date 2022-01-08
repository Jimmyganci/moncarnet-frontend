import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { h1 } from '../../../variableTailwind';
import UserContext from '../../../contexts/UserContext';
import {h2} from '../../../variableTailwind';

const Profile = () => {

  const { userLogin }: any = useContext(UserContext);
  const [infoUser, setInfoUser]: Array<any> = useState([]);

  useEffect(() => {
    axios
    .get(`http://localhost:8000/api/pros/${userLogin.id_user}`,
    { withCredentials: true },
    )
    .then((res) => res.data)
    .then((data) => setInfoUser(data))
  }, [userLogin]);

  return (
    <div className="h-full w-full">
      <h1 className={`${h1} m-6`}>
        Mon Profil
      </h1>
      {infoUser && 
        <main className='h-4/5'>
          <h2 className={`${h2}`}>{infoUser.name}</h2>
          <div className=' h-full w-full flex items-center justify-around'>
            <div>
              <h2 className={`${h2}`}>Adresse</h2>
              <p>{infoUser.address}</p>
              <p>{infoUser.postal_code}</p>
              <p>{infoUser.city}</p>
            </div>
            <div>
              <h2 className={`${h2}`}>Contact</h2>
              <p>{infoUser.phone}</p>
              <p>{infoUser.email}</p>         
            </div>
          </div>         
        </main>
      }
    </div>
  );
}

export default Profile;
