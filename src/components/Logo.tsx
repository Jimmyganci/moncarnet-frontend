import React from 'react';

import logo from '../assets/logo.svg';

function Logo() {
  return (
    <div className="flex mt-4">
      <div className="w-10">
        <img className="w-full" src={logo} alt="book" />
      </div>

      <h2>Mon Carnet</h2>
    </div>
  );
}

export default Logo;
