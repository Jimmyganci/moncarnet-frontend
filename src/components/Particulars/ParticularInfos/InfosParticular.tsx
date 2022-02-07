import React, { useContext, useState } from 'react';
import { toast } from 'react-toastify';

import { users } from '../../../API/request';
import UserContext from '../../../contexts/UserContext';
import { button, glassMorphism, title } from '../../../variableTailwind';
import DeleteAccountModal from './../DeleteAccountModal';
import InfosLine from './InfosLine';

function ParticularInfos() {
  const { userLoggedIn } = useContext(UserContext);
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [firstNameModif, setFirstNameModif] = useState<string>('');
  const [lastNameModif, setLastNameModif] = useState<string>('');
  const [emailModif, setEmailModif] = useState<string>('');
  const [phoneModif, setPhoneModif] = useState<string>('');
  const [addressModif, setAddressModif] = useState<string>('');
  const [postalCodeModif, setPostalCodeModif] = useState<string>('');
  const [cityModif, setCityModif] = useState<string>('');
  const [deleteAccountModal, setDeleteAccountModal] = useState<boolean>(false);
  const { deleteAccount, setDeleteAccount } = useContext(UserContext);

  const handleInfosUser = () => {
    getInfosParticular();
    setChangeMode(!changeMode);
  };
  async function getInfosParticular() {
    try {
      const res = userLoggedIn.id_user && await users.put(userLoggedIn.id_user, {
        firstname: firstNameModif || userLoggedIn.firstname,
        lastname: lastNameModif || userLoggedIn.lastname,
        email: emailModif || userLoggedIn.email,
        phone: phoneModif || userLoggedIn.phone,
        address: addressModif || userLoggedIn.address,
        postal_code: parseInt(postalCodeModif) || userLoggedIn.postal_code,
        city: cityModif || userLoggedIn.city,
        active: deleteAccountModal ? false : userLoggedIn.active,
      });
      toast.success(`${res} vos modifications ont été modifiés`);
    } catch (err) {
      if (err) toast.error("Une erreur s'est produite!");
    }
  }

  return (
    <div className="flex flex-col items-center w-screen h-screen">
      <h1 className={`${title}`}>Mon profil</h1>
      {!deleteAccountModal ? (
        <div
          className={`w-10/12 rounded-lg ${glassMorphism} flex flex-col items-center justify-center py-6 max-w-xl`}>
          <InfosLine
            champ={'prénom'}
            lineName={userLoggedIn.firstname}
            changeMode={changeMode}
            modif={firstNameModif}
            setModif={setFirstNameModif}
          />
          <InfosLine
            champ={'nom'}
            lineName={userLoggedIn.lastname}
            changeMode={changeMode}
            modif={lastNameModif}
            setModif={setLastNameModif}
          />
          <InfosLine
            champ={'adresse mail'}
            lineName={userLoggedIn.email}
            changeMode={changeMode}
            modif={emailModif}
            setModif={setEmailModif}
          />
          <InfosLine
            champ={'numéro de téléphone'}
            lineName={userLoggedIn.phone}
            changeMode={changeMode}
            modif={phoneModif}
            setModif={setPhoneModif}
          />
          <InfosLine
            champ={'adresse postale'}
            lineName={userLoggedIn.address}
            changeMode={changeMode}
            modif={addressModif}
            setModif={setAddressModif}
          />
          <InfosLine
            champ={'code postale'}
            lineName={userLoggedIn.postal_code.toString()}
            changeMode={changeMode}
            modif={postalCodeModif}
            setModif={setPostalCodeModif}
          />
          <InfosLine
            champ={'ville'}
            lineName={userLoggedIn.city}
            changeMode={changeMode}
            modif={cityModif}
            setModif={setCityModif}
          />
          <button
            className={`w-1/6 min-w-[200px] ${button}`}
            onClick={() =>
              !changeMode ? setChangeMode(!changeMode) : handleInfosUser()
            }>
            {changeMode ? 'Valider' : 'Modifier'}
          </button>
          <button
            className={`w-1/6 min-w-[200px] ${button} text-sm bg-secondary hover:bg-secondary-hovered`}
            onClick={() => setDeleteAccountModal(true)}>
            Supprimer mon compte
          </button>
        </div>
      ) : (
        <DeleteAccountModal
          deleteAccountModal={deleteAccountModal}
          setDeleteAccountModal={setDeleteAccountModal}
          deleteAccount={deleteAccount}
          setDeleteAccount={setDeleteAccount}
          getInfosParticular={getInfosParticular}
        />
      )}
    </div>
  );
}

export default ParticularInfos;
