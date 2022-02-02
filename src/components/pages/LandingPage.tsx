import React from 'react';
import { Link } from 'react-router-dom';

import imageHome from '../../assets/photohome.svg';
import {
  appear,
  button,
  glassMorphism,
  h1LandingPage,
  h2LandingPage,
} from '../../variableTailwind';
import Logo from '../Logo';

function LandingPage() {
  return (
    <div className={`flex flex-col h-screen ${appear}`}>
      <div className="flex flex-col items-center justify-center h-1/2">
        <div
          className={`relative flex flex-col items-center justify-center w-4/5 rounded-lg h-2/3 max-w-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 bg-background shadow-main`}>
          <Logo />
          <img className="w-full pb-4 lg:p-0 h-2/3 lg:h-2/3" src={imageHome} alt="car" />
        </div>
      </div>

      <div
        className={`flex flex-col items-center justify-center h-1/2 w-full ${glassMorphism}`}>
        <div className="h-1/4">
          <h1 className={`${h1LandingPage} mb-4`}>Bienvenue</h1>
          <h2 className={`${h2LandingPage}`}>Je suis un :</h2>
        </div>
        <div className="flex flex-col w-full max-w-2xl mt-3 lg:flex-row">
          <Link to="/login-particular" className="w-full">
            <button className={`${button} w-2/3 lg:w-3/4 lg:h-16`}>Particulier</button>
          </Link>
          <Link to="/login-pro" className="w-full">
            <button className={`${button} w-2/3 lg:w-3/4 lg:h-16`}>Professionnel</button>
          </Link>
          <Link to="/login-admin" className="w-full">
            <button className={`${button} w-2/3 lg:w-3/4 lg:h-16`}>Admin</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
