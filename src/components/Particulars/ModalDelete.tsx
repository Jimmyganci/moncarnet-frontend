import React from 'react';
import axios from 'axios';
import UserContext from '../../contexts/UserContext';
import UserInfos from '../../Interfaces/IuserInfos';
import { button, deleteButton } from '../../variableTailwind';

interface ModalProps {
  deleteConfirmation?: boolean | null;
  immat?: string | null;
  brand?: string | null;
  model?: string | null;
  confirmation?: boolean | null;
  setDeleteConfirmation?: Function | null;
  user?: UserInfos | null;
}

function ModalDelete({
  deleteConfirmation,
  setDeleteConfirmation,
  immat,
  brand,
  model,
  confirmation
}: ModalProps) {

  return (
    <div className='flex justify-center w-full h-full'>
      {deleteConfirmation && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-full rounded-lg py-6 px-2 my-4`}>
            {`Vous êtes sur le point de supprimer le véhicule immatriculé ${immat}.`} <span className='font-bold'>Confirmer ?</span>
            <div className='flex items-center justify-between px-2'>
              <button
                onClick={() => {setDeleteConfirmation && setDeleteConfirmation(false)}}
                className={`${button} flex justify-center items-center bg-secondary mt-6 w-[45%]`}>
              Supprimer
            </button> 
              <button
                onClick={() => setDeleteConfirmation && setDeleteConfirmation(false)}
                className={`${button} flex justify-center items-center mt-6 w-[45%]`}>
              Annuler
            </button>
            </div> 
          </div>         
        </div>
      )}
    </div>
  );
}

export default ModalDelete;
