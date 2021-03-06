import React from 'react';

import miniLogo from '../assets/logo.svg';
import stars from '../assets/stars.png';

interface IPlate {
  immat: string;
  postalCode: number;
}

const Plate: React.FC<IPlate> = ({ immat, postalCode }) => {
  return (
    <div className="box-border flex items-center justify-between w-full h-full p-0 m-0 overflow-hidden rounded-lg border-[1px] border-black">
      <div className="h-full w-[15%] m-0 pb-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-background flex flex-col-reverse justify-center items-center overflow-hidden box-border">
        <p className="text-base font-bold h-3/6">F</p>
        <div className="box-border flex items-center justify-center w-full overflow-hidden h-3/6">
          <img src={stars} alt="eurepean stars" className="w-[60%] pt-2" />
        </div>
      </div>
      <div className="flex h-full text-black justify-center items-center w-full text-[200%] font-chakra bg-gradient-to-tr from-white to-stone-300">
        {immat}
      </div>
      <div className="h-full w-[15%] px-[0.5px] pb-[4%] bg-gradient-to-tr from-blue-500 to-blue-700 text-background flex flex-col-reverse justify-center items-center overflow-hidden box-border">
        <p className="pt-2 text-[85%] font-medium leading-3 h-3/6">
          {postalCode && postalCode.toString().slice(0, 2)}
        </p>
        <div className="box-border flex items-center justify-center w-full overflow-hidden h-3/6">
          <img className="w-[60%] pt-2" src={miniLogo} alt="Mon Carnet logo" />
        </div>
      </div>
    </div>
  );
};

export default Plate;
