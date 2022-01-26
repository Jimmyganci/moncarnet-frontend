import React, { useContext, useState } from 'react';
import axios from 'axios';
import { button } from '../../variableTailwind';

interface ModalProps {
  deleteConfirmation?: boolean | null;
  immat?: string | null;
  registration_date?: string | null;
  url_vehiculeRegistration?: string | null;
  model_id?: number | null;
  type_id?: number | null;
  user_id?: number | null;
  confirmation?: boolean | null;
  setDeleteConfirmation?: Function | null;
}

function ModalDelete({
  deleteConfirmation,
  setDeleteConfirmation,
  immat,
  registration_date,
  url_vehiculeRegistration,
  model_id,
  type_id,
  user_id,
}: ModalProps) {
  const [vehiculeDeleted, setVehiculeDeleted] = useState<boolean>(false)
  console.log(immat, registration_date, model_id, type_id, user_id);

  const handleDeleteVehicule = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
    const putVehicule = await axios.put(`http://localhost:8000/api/vehicules/${immat && immat}`,
      {
        immat: immat && immat,
        registration_date: registration_date && registration_date,
        url_vehiculeRegistration: url_vehiculeRegistration && url_vehiculeRegistration,
        id_modelId: model_id && model_id,
        id_typeId: type_id && type_id,
        id_userId: user_id && user_id,
        active: false,
        validate: false,
      },
      {
        withCredentials: true,
      },
    );
      if (putVehicule.status === 204) {
        setVehiculeDeleted(true);
      }
      else {console.log(putVehicule)}
     } catch (err) {
  console.log(err);
   }
  };
  
  return (
    <div className='flex justify-center w-full h-full'>
      {deleteConfirmation && !vehiculeDeleted && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-full rounded-lg py-6 px-2 my-4`}>
            {`Vous êtes sur le point de supprimer ce véhicule.`} <br /><span className='font-bold'>Confirmer ?</span>
            <div className='flex items-center justify-between px-2'>
              <button
                onClick={(e) => handleDeleteVehicule(e)}
                className={`${button} flex justify-center items-center bg-secondary hover:bg-secondary-hovered mt-6 w-[45%]`}>
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
      {deleteConfirmation && vehiculeDeleted && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
          className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-full rounded-lg py-6 px-2 my-4 flex flex-col items-center justify-center`}>
            {`Le véhicule immatriculé :`} <br /> {`${immat}`} <br /> {`vient d'être supprimé.`}
          <button
            onClick={() => {setDeleteConfirmation && setDeleteConfirmation(false); setVehiculeDeleted(false)}}
            className={`${button} flex justify-center items-center mt-6 w-[45%]`}>
            Retour
          </button>
        </div> 
      </div>      
      )}
    </div>
  );
}

export default ModalDelete;
