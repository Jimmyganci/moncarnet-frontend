import React from 'react';
import stars from '../assets/stars.png';
import miniLogo from '../assets/logo.svg';

const Plate = ({immat, postalCode}) => {
    return (
        <div className="w-full h-full m-0 p-0 rounded-lg flex justify-between items-center overflow-hidden box-border">
            <div className="h-full w-[15%] m-0 pb-2 bg-gradient-to-tr from-blue-500 to-blue-700 text-background flex flex-col-reverse justify-center items-center overflow-hidden box-border">
                <p className='h-3/6 text-base font-bold'>F</p>
                <div className='h-3/6 w-full flex justify-center items-center overflow-hidden box-border'>
                    <img src={stars} alt="eurepean stars" className='w-[60%] pt-2'/>
                </div>
            </div>
            <div className="flex justify-center items-center w-full text-[210%] font-chakra bg-gradient-to-tr from-white to-stone-300">
                {immat}
            </div>
            <div className="h-full w-[15%] px-[0.5px] pb-[4%] bg-gradient-to-tr from-blue-500 to-blue-700 text-background flex flex-col-reverse justify-center items-center overflow-hidden box-border">
                <p className="h-3/6 text-xl leading-3 pt-2">{postalCode && postalCode.toString().slice(0,2)}</p>
                <div className="h-3/6 w-full flex justify-center items-center overflow-hidden box-border">
                    <img className='w-[60%] pt-2' src={miniLogo} alt="Mon Carnet logo" />
                </div>
            </div>
        </div>
    );
};

export default Plate;