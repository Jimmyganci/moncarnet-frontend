import React from 'react';

import { UserContextProvider } from '../../contexts/UserContext';
import Header from '../Header';
import Vehicules from './Vehicules';

function Particular() {
  return (
    <div className="min-h-screen">
      <UserContextProvider>
        <Header />
        <Vehicules />
      </UserContextProvider>
    </div>
  );
}

export default Particular;
