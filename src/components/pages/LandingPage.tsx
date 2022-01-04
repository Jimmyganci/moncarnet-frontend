import React from 'react';
import { Link } from 'react-router-dom';

import imageHome from '../../assets/photohome.svg';
import { glassMorphism, button } from '../../variableTailwind';
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
      <div className={`flex flex-col items-center justify-center h-1/2 w-full${glassMorphism}`}>      
            <Link to="/login-particular" className='h-1/3'><button className={`${button}`}>Particulier</button></Link>
            <Link to="/login-pro" className='h-1/3'> <button className={`${button}`}>Professionnel</button></Link>          
      </div>
    </div>
  );
}

export default LandingPage;
