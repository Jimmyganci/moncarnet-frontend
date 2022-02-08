import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast } from 'react-toastify';

import { users, vehicule } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import { button, input } from '../../../variableTailwind';

interface ModalProps {
  giveConfirmation: boolean;
  setGiveConfirmation?: Function;
  immat: string;
  registration_date: Date;
  url_vehiculeRegistration: string;
  model_id: number;
  type_id: number;
  user_id: number;
}

function ModalGive({
  immat,
  registration_date,
  url_vehiculeRegistration,
  model_id,
  type_id,
  user_id,
  giveConfirmation,
  setGiveConfirmation,
}: ModalProps) {
  const { vehiculeGiven, setVehiculeGiven } = useContext(UserContext);
  const [lastname, setLastname] = useState<string>('');
  const [firstname, setFirstname] = useState<string>('');
  const [email, setEmail] = useState<string>('');

  const handleGiveVehicule = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (lastname) {
        const res = await users.getByLastName(lastname);
        console.log(res[0].id_user);

        if (res[0].id_user) {
        const giveVehiculeToUser = await vehicule.putOne(immat, {
        immat: immat,
        registration_date: registration_date,
        url_vehiculeRegistration: url_vehiculeRegistration,
        id_modelId: model_id,
        id_typeId: type_id,
        id_userId: res[0].id_user,
        active: true,
        validate: true,
      });
      if (giveVehiculeToUser === 204) {
        setVehiculeGiven(true);
        toast.success('Véhicule Cédé');
      } else {
        console.log(giveVehiculeToUser);
        toast.error("Une erreur s'est produite");
      }
        }
      }
    } catch (err) {
      toast.error("Une erreur s'est produite!");
    }
  };

  return (
    <div className="flex justify-center w-full h-full">
      {giveConfirmation && !vehiculeGiven && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-full h-full rounded-lg py-6 px-2 my-4`}>
            <p className='font-bold'>Vous souhaitez céder ce véhicule à un tiers.</p>
            <p>Veuillez entrer le nom, prénom et l'adresse mail de la personne à qui vous souhaitez céder votre véhicule, puis cliquez sur Valider.</p>
            <div className="flex items-center justify-between px-2 my-4">
      <form onSubmit={(e) => handleGiveVehicule(e)} className={`w-full flex flex-col items-center justify-start`} >
        <label className='w-full' htmlFor="lastname"><input className={`${input} w-full`} type="text" id='lastname' placeholder='Nom de famille' onChange={(e) => setLastname(e.target.value)} /></label>
        <label className='w-full' htmlFor="firstname"><input className={`${input} w-full`} type="text" id='firstname' placeholder='Prénom' onChange={(e) => setFirstname(e.target.value)} /></label>
        <label className='w-full' htmlFor="email"><input className={`${input} w-full`} type="text" id='email' placeholder='Adresse mail' onChange={(e) => setEmail(e.target.value)} /></label>
                <div className='w-5/6 flex justify-between items-center'>
                  <button
                    onClick={() => setGiveConfirmation && setGiveConfirmation(false)}
                    className={`px-4 p-2 mt-2 duration-300 ease-in-out rounded-lg shadow-lg bg-background text-primary lg:hover:bg-primary lg:hover:text-background flex justify-center items-center w-[45%]`}>
                    Annuler
                  </button>
                  <button
                    type='submit'
                    className={`${button} flex justify-center items-center mt-2 w-[45%]`}>
                    Valider
                  </button>
                </div>
      </form>
            </div>
          </div>
        </div>
      )}
      {giveConfirmation && vehiculeGiven && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`w-5/6 h-full rounded-lg py-6 px-2 my-4 flex flex-col items-center justify-center`}>
            {`Le véhicule immatriculé :`} <br /> {`${immat}`} <br />{' '}
            {`vient d'être supprimé.`}
            <button
              onClick={() => {
                setGiveConfirmation && setGiveConfirmation(false);
                setVehiculeGiven(false);
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

export default ModalGive;
