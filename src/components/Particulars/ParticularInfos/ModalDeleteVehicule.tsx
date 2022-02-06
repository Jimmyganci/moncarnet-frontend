import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { vehicule } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import { button } from '../../../variableTailwind';

interface ModalProps {
  deleteConfirmation: boolean;
  setDeleteConfirmation?: Function;
  immat: string;
  registration_date: Date;
  url_vehiculeRegistration: string;
  model_id: number;
  type_id: number;
  user_id: number;
}

function ModalDelete({
  immat,
  registration_date,
  url_vehiculeRegistration,
  model_id,
  type_id,
  user_id,
  deleteConfirmation,
  setDeleteConfirmation,
}: ModalProps) {
  const { vehiculeDeleted, setVehiculeDeleted }: any = useContext(UserContext);

  const handleDeleteVehicule = async (e: React.MouseEvent) => {
    e.preventDefault();
    try {
      const putVehicule = await vehicule.putOne(immat, {
        immat: immat,
        registration_date: registration_date,
        url_vehiculeRegistration: url_vehiculeRegistration,
        id_modelId: model_id,
        id_typeId: type_id,
        id_userId: user_id,
        active: false,
        validate: false,
      });
      if (putVehicule === 204) {
        setVehiculeDeleted(true);
        toast.success('Véhicule Supprimé');
      } else {
        console.log(putVehicule);
        toast.error("Une erreur s'est produite");
      }
    } catch (err) {
      toast.error("Une erreur s'est produite!");
    }
  };

  return (
    <div className="flex justify-center w-full h-full">
      {deleteConfirmation && !vehiculeDeleted && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-full rounded-lg py-6 px-2 my-4`}>
            {`Vous êtes sur le point de supprimer ce véhicule.`} <br />
            <span className="font-bold">Confirmer ?</span>
            <div className="flex items-center justify-between px-2">
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
            {`Le véhicule immatriculé :`} <br /> {`${immat}`} <br />{' '}
            {`vient d'être supprimé.`}
            <button
              onClick={() => {
                setDeleteConfirmation && setDeleteConfirmation(false);
                setVehiculeDeleted(false);
              }}
              className={`${button} flex justify-center items-center mt-6 w-[45%]`}>
              <Link to="/particular/vehicules" className="w-full h-full">
                Retour
              </Link>
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalDelete;
