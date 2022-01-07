import React, { useState } from 'react';
// import { Link } from 'react-router-dom';

import { glassMorphism } from '../variableTailwind';
import logo from './Logo';

const SideBar = () => {

  return (
    <div className={`${glassMorphism} w-5/6 mt-2 mb-2 h-5/6 rounded-lg`}>
        <img src={logo} alt="" />
    </div>
  );
};

export default SideBar;
