import React, { useContext, useEffect, useState } from 'react';
import { Outlet } from 'react-router-dom';
import axios from 'axios';

import UserContext from '../contexts/UserContext';
import InfosLine from './InfosLine';
import { button, glassMorphism } from '../variableTailwind';

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
  const [buttonValider, setButtonValider] = useState(false);

  function getInfosParticular() {
useEffect(() => {
    async function updateInfos() {
      try {
        const res = await axios.put(`http://localhost:8000/api/users/${userLogin.id_user}`, {body: {firsname: firstNameModif || userLogin.firstname}}, {
          withCredentials: true,
        });
      } catch (err) {
        console.log(err);
      }
    }
    updateInfos();
  }, []);}

  return (
    <div className='h-screen w-screen flex flex-col items-center'>
      <h1 className="mt-8 mb-8 text-2xl text-background">
        Mon profil
      </h1>
      <div className={`w-10/12 h-5/6 rounded-xl ${glassMorphism} flex flex-col items-center justify-center`}>
        <InfosLine champ={"prénom"} lineName={userLogin.firstname} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={firstNameModif} setModif={setFirstNameModif} />
        <InfosLine champ={"nom"} lineName={userLogin.lastname} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={lastNameModif} setModif={setLastNameModif} />
        <InfosLine champ={"adresse mail"} lineName={userLogin.email} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={emailModif} setModif={setEmailModif} />
        <InfosLine champ={"numéro de téléphone"} lineName={userLogin.phone} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={phoneModif} setModif={setPhoneModif} />
        <InfosLine champ={"adresse postale"} lineName={userLogin.address} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={addressModif} setModif={setAddressModif} />
        <InfosLine champ={"code postale"} lineName={userLogin.postal_code} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={postalCodeModif} setModif={setPostalCodeModif} />
        <InfosLine champ={"ville"} lineName={userLogin.city} buttonValider={buttonValider} setButtonValider={setButtonValider} changeMode={changeMode} setChangeMode={setChangeMode} modif={cityModif} setModif={setCityModif} />
        <button className={`w-1/6 min-w-[200px] ${button}`} onClick={() => {!buttonValider?setChangeMode(!changeMode): getInfosParticular()}}>{changeMode ? "Valider" : "Modifier"}</button>
      </div>
      <Outlet />     
    </div>
  );
}

export default ParticularInfos;
         {/*  <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Nom</div>
             <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="lastname"
                id="lasttname"
                value={lastNameModif || infosUser && infosUser.lastname}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre nom"
                onChange={(e) => setLastNameModif(e.target.value)}
                required></input>
             </label>
          </div>
          <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Adresse mail</div>
              <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="email"
                id="email"
                value={emailModif || infosUser && infosUser.email}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre adresse mail"
                onChange={(e) => setEmailModif(e.target.value)}
                required></input>
              </label>
          </div>
          <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Phone</div>
              <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="phone"
                id="phone"
                value={phoneModif || infosUser && infosUser.phone}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre ville"
                onChange={(e) => setPhoneModif(e.target.value)}
                required></input>
              </label>
          </div>
          <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Adresse</div>
              <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="address"
                id="address"
                value={addressModif || infosUser && infosUser.address}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre adresse"
                onChange={(e) => setAddressModif(e.target.value)}
                required></input>
              </label>
          </div>
          <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Code Postal</div>
              <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="postal_code"
                id="postal_code"
                value={postalCodeModif || infosUser && infosUser.postal_code}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre code postal"
                onChange={(e) => setPostalCodeModif(e.target.value)}
                required></input>
              </label>
          </div>
          <div className={`h-10 w-full rounded-xl my-1 flex flex-row justify-center items-center`}>
                <div
                className="w-2/6 max-w-xs h-full flex items-center justify-center mb-4 text-center border rounded-md mx-2 bg-primary/75"
                >Ville</div>
              <label className='w-4/6 max-w-md mx-2'>
                <input className={`valid:outline-valid-500 invalid:outline-error-500 ${input} w-full h-full bg-slate-50/75`}
                type="text"
                name="city"
                id="city"
                value={cityModif || infosUser && infosUser.city}
                pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                placeholder="modifier votre ville"
                onChange={(e) => setCityModif(e.target.value)}
                required></input>
              </label>
          </div> */}
       