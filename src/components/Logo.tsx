import React from 'react';

import logo from '../assets/logo.svg';

interface HeaderProps {
  location?: string;
}

const Logo: React.FC<HeaderProps> = ({ location }) => {
  return (
    <div
      className={`${location == 'header' && 'flex items-center'} ${
        location !== 'header' &&
        'flex justify-center items-center h-1/3 w-full lg:-ml-[10%] lg:pt-12 pt-8'
      } ${
        location == 'particularSideBar' &&
        'flex justify-center items-center h-1/3 w-full lg:-ml-[10%] lg:pt-12 pt-8'
      }`}>
      <div
        className={`${location == 'header' && 'w-10 mr-[4%]'} ${
          location !== 'header' && 'w-1/5 lg:flex lg:justify-end lg:items-center'
        } ${
          location == 'particularSideBar' &&
          'w-3/6 lg:flex lg:justify-end lg:items-center'
        }`}>
        <img
          className={`${location == 'header' && 'w-full'} ${
            location !== 'header' && 'lg:w-4/6'
          } ${location == 'particularSideBar' && 'lg:w-full ml-4'}`}
          src={logo}
          alt="book"
        />
      </div>

      {location !== 'header' && (
        <h2 className="text-3xl lg:text-4xl text-green-50">Mon Carnet</h2>
      )}
    </div>
  );
};

export default Logo;
