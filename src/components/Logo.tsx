import React from 'react';
import logo from '../assets/logo.svg';

interface HeaderProps {
  location?: string;
}

const Logo: React.FC<HeaderProps> = ({ location }) => {
  return (
    <div className={`flex items-center ${location !== 'header' && 'mt-4'}`}>
      <div className="w-10 mr-4">
        <img className="w-full" src={logo} alt="book" />
      </div>

      {location !== 'header' && <h2 className="text-2xl text-green-50">Mon Carnet</h2>}
    </div>
  );
};

export default Logo;
