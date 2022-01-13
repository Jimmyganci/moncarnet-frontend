import React, { useContext, useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../../contexts/UserContext';
import InfosLine from './InfosLine';
import { button, glassMorphism } from '../../variableTailwind';

function ParticularInfos () {
  const { userLogin }: any = useContext(UserContext);
  const [changeMode, setChangeMode] = useState(false);
  const [firstNameModif, setFirstNameModif] = useState("");
  const [lastNameModif, setLastNameModif] = useState("");
  const [emailModif, setEmailModif] = useState("");
  const [phoneModif, setPhoneModif] = useState("");
  const [addressModif, setAddressModif] = useState("");
  const [postalCodeModif, setPostalCodeModif] = useState("");
  const [cityModif, setCityModif] = useState("");

const handleInfosUser = () => {
  getInfosParticular();
  setChangeMode(!changeMode);
};

function refreshPage() {
  window.location.reload();
}

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
          password: userLogin.hashedPassword,
        }, {
          withCredentials: true,
        });
        refreshPage();
      } catch (err) {
        console.log(err);
      }
    };

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <h1 className="mt-8 mb-8 text-2xl text-background">
        Mon profil
      </h1>
      <div className={`w-10/12 h-5/6 rounded-xl ${glassMorphism} flex flex-col items-center justify-center`}>
        <InfosLine champ={"prénom"} lineName={userLogin.firstname} changeMode={changeMode} setChangeMode={setChangeMode} modif={firstNameModif} setModif={setFirstNameModif} />
        <InfosLine champ={"nom"} lineName={userLogin.lastname} changeMode={changeMode} setChangeMode={setChangeMode} modif={lastNameModif} setModif={setLastNameModif} />
        <InfosLine champ={"adresse mail"} lineName={userLogin.email} changeMode={changeMode} setChangeMode={setChangeMode} modif={emailModif} setModif={setEmailModif} />
        <InfosLine champ={"numéro de téléphone"} lineName={userLogin.phone} changeMode={changeMode} setChangeMode={setChangeMode} modif={phoneModif} setModif={setPhoneModif} />
        <InfosLine champ={"adresse postale"} lineName={userLogin.address} changeMode={changeMode} setChangeMode={setChangeMode} modif={addressModif} setModif={setAddressModif} />
        <InfosLine champ={"code postale"} lineName={userLogin.postal_code} changeMode={changeMode} setChangeMode={setChangeMode} modif={postalCodeModif} setModif={setPostalCodeModif} />
        <InfosLine champ={"ville"} lineName={userLogin.city} changeMode={changeMode} setChangeMode={setChangeMode} modif={cityModif} setModif={setCityModif} />
        <button className={`w-1/6 min-w-[200px] ${button}`} onClick={() => !changeMode ? setChangeMode(!changeMode) : handleInfosUser()}>{changeMode ? "Valider" : "Modifier"}</button>
      </div>
      <Outlet />     
    </div>
  );
}

export default ParticularInfos;
       