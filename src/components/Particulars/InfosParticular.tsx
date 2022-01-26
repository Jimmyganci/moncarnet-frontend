import React, { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import InfosLine from './InfosLine';
import { button, deleteButton,glassMorphism, title } from '../../variableTailwind';

function ParticularInfos () {
  const { userLogin }: any = useContext(UserContext);
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [firstNameModif, setFirstNameModif] = useState<string>("");
  const [lastNameModif, setLastNameModif] = useState<string>("");
  const [emailModif, setEmailModif] = useState<string>("");
  const [phoneModif, setPhoneModif] = useState<string>("");
  const [addressModif, setAddressModif] = useState<string>("");
  const [postalCodeModif, setPostalCodeModif] = useState<string>("");
  const [cityModif, setCityModif] = useState<string>("");
  const [deleteAccount, setDeleteAccount] = useState<boolean>(false);

const handleInfosUser = () => {
  getInfosParticular();
  setChangeMode(!changeMode);
};

  async function getInfosParticular () {
      try {
        
        const res = await axios.put(`http://localhost:8000/api/users/${userLogin.id_user}`,
        {firstname: firstNameModif || userLogin.firstname,
          lastname: lastNameModif || userLogin.lastname,
          email: emailModif || userLogin.email,
          phone: phoneModif || userLogin.phone,
          address: addressModif || userLogin.address,
          postal_code: parseInt(postalCodeModif) || userLogin.postal_code,
          city: cityModif || userLogin.city,
          /* password: userLogin.hashedPassword, */
        }, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <h1 className={`${title}`}>
        Mon profil
      </h1>
      <div className={`w-10/12 rounded-lg ${glassMorphism} flex flex-col items-center justify-center py-6 max-w-xl`}>
        <InfosLine champ={"prénom"} lineName={userLogin.firstname} changeMode={changeMode} setChangeMode={setChangeMode} modif={firstNameModif} setModif={setFirstNameModif} />
        <InfosLine champ={"nom"} lineName={userLogin.lastname} changeMode={changeMode} setChangeMode={setChangeMode} modif={lastNameModif} setModif={setLastNameModif} />
        <InfosLine champ={"adresse mail"} lineName={userLogin.email} changeMode={changeMode} setChangeMode={setChangeMode} modif={emailModif} setModif={setEmailModif} />
        <InfosLine champ={"numéro de téléphone"} lineName={userLogin.phone} changeMode={changeMode} setChangeMode={setChangeMode} modif={phoneModif} setModif={setPhoneModif} />
        <InfosLine champ={"adresse postale"} lineName={userLogin.address} changeMode={changeMode} setChangeMode={setChangeMode} modif={addressModif} setModif={setAddressModif} />
        <InfosLine champ={"code postale"} lineName={userLogin.postal_code} changeMode={changeMode} setChangeMode={setChangeMode} modif={postalCodeModif} setModif={setPostalCodeModif} />
        <InfosLine champ={"ville"} lineName={userLogin.city} changeMode={changeMode} setChangeMode={setChangeMode} modif={cityModif} setModif={setCityModif} />
        <button className={`w-1/6 min-w-[200px] ${button}`} onClick={() => !changeMode ? setChangeMode(!changeMode) : handleInfosUser()}>{changeMode ? "Valider" : "Modifier"}</button>
        <button className={`w-1/6 min-w-[200px] ${button} text-sm bg-secondary hover:bg-secondary-hovered`} onClick={() => ""}>Supprimer mon compte</button>
      </div>
      <Outlet />     
    </div>
  );
}

export default ParticularInfos;
       