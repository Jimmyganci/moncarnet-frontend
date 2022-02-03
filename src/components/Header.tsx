import React, { useState } from 'react';
import { useContext } from 'react';
import { Link } from 'react-router-dom';
import { NavigateFunction, useNavigate } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import { glassMorphism } from '../variableTailwind';
import Logo from './Logo';

const Header = () => {
  const [showMenu, setShowMenu] = useState(false);

  // Return Home after logout !
  const navigate: NavigateFunction = useNavigate();

  // access userContext !
  const { logOut }: any = useContext(UserContext);

  const spanBurgerMenu = 'w-full h-1.5 bg-text-darker rounded-lg';
  return (
    <div
      className={`ease-in-out duration-300 overflow-hidden ${
        showMenu ? 'h-screen' : 'h-16 mb-[10vw]'
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
          <Link to="/particular/home">
            <Logo location="header" />
          </Link>
        </div>
        <div className="w-12">
          <Link to="/particular/infos">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-full cursor-pointer hover:text-white"
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
          </Link>
        </div>
      </nav>
      <ul className="flex flex-col h-full mt-4">
        <li
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
          className="mt-4 text-2xl font-medium tracking-widest">
          <Link to="/particular/vehicules">Mes véhicules</Link>
        </li>
        <li
          className="mt-4 text-2xl font-medium tracking-widest"
          onClick={() => setShowMenu(false)}
          aria-hidden="true">
          <Link to="/particular/appointments">Mes rendez-vous</Link>
        </li>
        <li
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
          className="mt-4 text-2xl font-medium tracking-widest">
          <Link to="/particular/mygarages">Mes garages</Link>
        </li>
        <li
          onClick={() => setShowMenu(false)}
          aria-hidden="true"
          className="mt-4 text-2xl font-medium tracking-widest">
          <Link to="/particular/infos">Mon profil</Link>
        </li>
        <button
          className="mt-4 text-2xl font-medium tracking-widest"
          onClick={() => {
            logOut().then(() => {
              return navigate('/');
            });
          }}>
          Se déconnecter
        </button>
      </ul>
    </div>
  );
};

export default Header;
