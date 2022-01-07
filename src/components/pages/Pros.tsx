import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from '../Header';

function Pros() {
  return (
    <div className="min-h-screen">
      <Header />
      <Outlet />
    </div>
  );
}

export default Pros;
