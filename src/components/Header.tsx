import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { glassMorphism } from '../variableTailwind';
import Logo from './Logo';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);
  const spanBurgerMenu = 'w-full h-1.5 bg-text-darker rounded-lg';
  return (
    <div
      className={`ease-in-out duration-300 overflow-hidden ${
        showMenu ? 'h-screen' : 'h-16'
      } ${glassMorphism}`}>
      <nav className={`flex h-16 items-center justify-between pl-4 pr-4 relative`}>
        <div
          onClick={() => setShowMenu(!showMenu)}
          aria-hidden="true"
          className="flex flex-col justify-around h-10 cursor-pointer w-11">
          <span className={spanBurgerMenu}></span>
          <span className={spanBurgerMenu}></span>
          <span className={spanBurgerMenu}></span>
        </div>
        <div className="absolute -translate-x-1/2 cursor-pointer left-1/2">
          <Link to="/particular">
            <Logo location="header" />
          </Link>
        </div>
        <div className="w-12">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-full"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor">
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M5.121 17.804A13.937 13.937 0 0112 16c2.5 0 4.847.655 6.879 1.804M15 10a3 3 0 11-6 0 3 3 0 016 0zm6 2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
        </div>
      </nav>
      <ul className="flex flex-col h-full mt-4">
        <li className="mt-4 text-4xl font-medium tracking-widest">Items1</li>
        <li className="mt-4 text-4xl font-medium tracking-widest">Items2</li>
        <li className="mt-4 text-4xl font-medium tracking-widest">Items3</li>
        <li className="mt-4 text-4xl font-medium tracking-widest">Items4</li>
      </ul>
    </div>
  );
};

export default Header;
