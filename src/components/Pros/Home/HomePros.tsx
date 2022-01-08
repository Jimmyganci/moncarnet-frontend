import React, { useContext } from 'react';
import NextRdvs from './NextRdvs';
import UserContext from '../../../contexts/UserContext';
import { h1 } from '../../../variableTailwind';

function HomePros() {

  const { userLogin }: any = useContext(UserContext);
  
  return (
    <div className='w-full h-full'>
      <h1 className={`${h1} m-6`}>
        Bienvenue {userLogin.firstname}
      </h1>
      <main className='h-5/6'>
        <NextRdvs/>
      </main>
    </div>
  );
}

export default HomePros;
