import React from 'react';

import logo from '../assets/logo.svg';

function Logo() {
  return (
    <div className="flex items-center mt-4">
      <div className="w-10 mr-4">
        <img className="w-full" src={logo} alt="book" />
      </div>

      <h2 className="text-2xl">Mon Carnet</h2>
    </div>
  );
}

export default Logo;
