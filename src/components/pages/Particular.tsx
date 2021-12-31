import React, { useContext } from 'react';
import { Outlet } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import Header from '../Header';

function Particular() {
  const { userLogin }: any = useContext(UserContext);
  return (
    <div className="min-h-screen">
      <Header />
      <h1 className="mt-8 mb-8 text-2xl text-background">
        Bienvenue {userLogin.firstname}
      </h1>
      <Outlet />
    </div>
  );
}

export default Particular;
