import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { button } from '../variableTailwind';

interface ReturnButtonProps {
  target: string;
}

const ReturnButton: React.FC<ReturnButtonProps> = ({target}) => {
  
  let navigate = useNavigate();
  const navigateBack = () => {
  navigate(-1);
}

    return (
           target === "" ? <button className={`w-full h-fit p-2 px-4 ${button}`} onClick={() => navigateBack()}>
            Retour
          </button>
           :
           <Link className='w-full flex justify-center' to={target}>
            <button className={`w-full h-fit p-2 px-4 ${button}`}>
              Retour
            </button>
          </Link>
    );
};

export default ReturnButton;