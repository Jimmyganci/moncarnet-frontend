import axios from 'axios';
import React, { useEffect, useContext, useState } from 'react';
import { h1 } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';
import {h2, button} from '../../../variableTailwind';
import InfosLine from '../../InfosLine';

const Profile = () => {

  const { prosLogin }: any = useContext(ProsContext);
  const [infoUser, setInfoUser]: Array<any> = useState([]);
  const [changeMode, setChangeMode] = useState(false);
  const [addressUpdate, setAddressUpdate] = useState("");
  const [postalUpdate, setPostalUpdate] = useState("");
  const [cityUpdate, setCityUpdate] = useState("");
  const [phoneUpdate, setPhoneUpdate] = useState("");
  const [emailUpdate, setEmailUpdate] = useState("");
  const [nameUpdate, setNameUpdate] = useState("");
  const [siretUpdate, setSiretUpdate] = useState("");

  useEffect(() => {
    prosLogin.length !==0 && axios
    .get(`http://localhost:8000/api/pros/${prosLogin.id_user}`,
    { withCredentials: true },
    )
    .then((res) => res.data)
    .then((data) => setInfoUser(data))
  }, [prosLogin]);

  const handleInfosUser = () => {
    getInfosPros();
    setChangeMode(!changeMode);
  };
  
  function refreshPage() {
    window.location.reload();
  }

  async function getInfosPros () {
    try {
      const res = await axios.put(`http://localhost:8000/api/pros/${prosLogin.id_user}`,
      {name: nameUpdate || infoUser.name,
        email: emailUpdate || infoUser.email,
        address: addressUpdate || infoUser.address,
        postal_code: parseInt(postalUpdate) || parseInt(infoUser.postal_code),     
        city: cityUpdate || infoUser.city,
        phone: phoneUpdate || infoUser.phone,
        siret: siretUpdate || infoUser.siret,
      }, {
        withCredentials: true,
      });
      refreshPage();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full">
      <h1 className={`${h1} m-6`}>
        Mon Profil
      </h1>
      {infoUser && 
        <main className='h-4/6'>
          <h2 className={`${h2}`}>
            Nom du Garage
          </h2>
          <InfosLine champ={"name"} lineName={infoUser.name} changeMode={changeMode} setChangeMode={setChangeMode} modif={nameUpdate} setModif={setNameUpdate} />
          <h2 className={`${h2}`}>
            Numéro de Siret
          </h2>
          <InfosLine champ={"siret"} lineName={infoUser.siret} changeMode={changeMode} setChangeMode={setChangeMode} modif={siretUpdate} setModif={setSiretUpdate} />
          <div className='flex items-center justify-around w-full h-4/6'>
            <div className='w-2/5 h-full'>
              <h2 className={`${h2}`}>Adresse</h2>
              <InfosLine champ={"adresse"} lineName={infoUser.address} changeMode={changeMode} setChangeMode={setChangeMode} modif={addressUpdate} setModif={setAddressUpdate} />
              <InfosLine champ={"code postal"} lineName={infoUser.postal_code} changeMode={changeMode} setChangeMode={setChangeMode} modif={postalUpdate} setModif={setPostalUpdate} />
              <InfosLine champ={"Ville"} lineName={infoUser.city} changeMode={changeMode} setChangeMode={setChangeMode} modif={cityUpdate} setModif={setCityUpdate} />
            </div>
            <div className='w-2/5 h-full'>
              <h2 className={`${h2}`}>Contact</h2>
              <InfosLine champ={"Téléphone"} lineName={infoUser.phone} changeMode={changeMode} setChangeMode={setChangeMode} modif={phoneUpdate} setModif={setPhoneUpdate} />
              <InfosLine champ={"email"} lineName={infoUser.email} changeMode={changeMode} setChangeMode={setChangeMode} modif={emailUpdate} setModif={setEmailUpdate} />
            </div>
          </div>
          <button className={`w-1/6 ${button}`} onClick={() => !changeMode ? setChangeMode(!changeMode) : handleInfosUser()}>{changeMode ? "Valider" : "Modifier"}</button>
        </main>
      }
    </div>
  );
}

export default Profile;