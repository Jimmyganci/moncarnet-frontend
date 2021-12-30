import React from 'react';
import { Outlet } from 'react-router-dom';

import { UserContextProvider } from '../../contexts/UserContext';
import Header from '../Header';

function Particular() {
  return (
    <div className="min-h-screen">
      <UserContextProvider>
        <Header />
        <Outlet />
      </UserContextProvider>
    </div>
  );
}

export default Particular;
