import React from 'react';
import { Link } from 'react-router-dom';

import imageHome from '../../assets/photohome.svg';
import { button, h1, h2, glassMorphism } from '../../variableTailwind';
import Logo from '../Logo';

function LandingPage() {
  return (
    <div className="flex flex-col h-screen">
      <div className="flex flex-col items-center justify-center h-1/2">
        <div
          className={`relative flex flex-col items-center w-4/5 rounded-lg h-2/3 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-40 bg-background shadow-main`}>
          <Logo />
          <img className="absolute bottom-0" src={imageHome} alt="car" />
        </div>
      </div>
      <div
        className={`flex flex-col items-center justify-center h-1/2 w-full${glassMorphism}`}>
          <div className="h-1/4">
            <h1 className={`${h1}`}>Bienvenue</h1>
            <h2 className={`${h2}`}>Je suis un :</h2>
          </div>
          <div className='mt-3 w-full' >
            <Link to="/login-particular" className="w-full">
              <button className={`${button} w-1/3 mr-3`}>Particulier</button>
            </Link>
            <Link to="/login-pro" className="w-full">
            {' '}
              <button className={`${button} w-1/3`}>Professionnel</button>
          </Link>
          </div>        
        
      </div>
    </div>
  );
}

export default LandingPage;
