import React, { useContext, useEffect, useState } from 'react';
import { pros } from '../../../API/request';
import CustomerDisplay from './CustomerDisplay';
import {h1} from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';

function Customers() {  

  // user list

  const [searchTerm, setSearchTerm] = useState<string>('');
  const { prosLoggedIn, userArray, setUserArray } = useContext(ProsContext);

  // Get all users from this pro

  async function getUsersFromPro () {
    const usersToDisplay = await pros.getUsers(prosLoggedIn.id_user);
    setUserArray(usersToDisplay);
  };

  useEffect(() => {
    getUsersFromPro()   
  }, [searchTerm]);
  
  return (
    <div className="w-full h-full overflow-auto">
      <h1 className={`${h1}`}>
         Clients
      </h1>
      <ul className='w-full'>
        {userArray && userArray
        .map((user) => (
            <CustomerDisplay
              key={user.id_user}
              email={user.email}
              address={user.address}
              phone={user.phone}
              postal_code={user.postal_code}
              city={user.city}
              id_user={user.id_user}
              firstname={user.firstname}
              lastname={user.lastname}
            />
        ))}
      </ul>
    </div>
  );
  };

export default Customers;