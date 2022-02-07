import React, { useContext } from 'react';
import { Link, NavigateFunction, useNavigate } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { button } from '../../variableTailwind';

interface modalDeleteAccountProps {
  deleteAccountModal: boolean;
  setDeleteAccountModal: Function;
  deleteAccount: boolean;
  setDeleteAccount: Function;
  getInfosParticular: Function;
}

const DeleteAccountModal = ({
  deleteAccountModal,
  setDeleteAccountModal,
  deleteAccount,
  setDeleteAccount,
  getInfosParticular,
}: modalDeleteAccountProps) => {
  const { logout }: any = useContext(UserContext);
  const navigateFromDeleteAccount: NavigateFunction = useNavigate();
  return (
    <div className="flex justify-center w-full h-full">
      {deleteAccountModal && !deleteAccount && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-fit rounded-lg py-6 px-2 my-4`}>
            {`Vous êtes sur le point de supprimer votre compte.`} <br />
            <span className="font-bold">Confirmer ?</span>
            <div className="flex items-center justify-between px-2">
              <button
                onClick={(e) => {
                  setDeleteAccount && setDeleteAccount(true);
                  getInfosParticular(e);
                }}
                className={`${button} flex justify-center items-center bg-secondary hover:bg-secondary-hovered mt-6 w-[45%]`}>
                Supprimer
              </button>
              <button
                onClick={() => setDeleteAccountModal && setDeleteAccountModal(false)}
                className={`${button} flex justify-center items-center mt-6 w-[45%]`}>
                Annuler
              </button>
            </div>
          </div>
        </div>
      )}
      {deleteAccount && (
        <div className={`w-full h-full flex flex-col justify-center items-center`}>
          <div
            className={`backdrop-filter backdrop-blur-xl bg-background/30 w-5/6 h-full rounded-lg py-6 px-2 my-4 flex flex-col items-center justify-center`}>
            {`Votre compte a bien été supprimé.`}
            <button
              onClick={() => {
                setDeleteAccount && setDeleteAccount(false);
                logout().then(() => {
                  return navigateFromDeleteAccount('/');
                });
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
};

export default DeleteAccountModal;
