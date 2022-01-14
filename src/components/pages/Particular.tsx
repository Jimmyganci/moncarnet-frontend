import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

function Particular() {

  return (
    <div className="h-full">
      <Header />
      <Outlet />
    </div>
  );
}

export default Particular;
