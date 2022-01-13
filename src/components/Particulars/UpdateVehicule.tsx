import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { button, glassMorphism, input, title } from '../../variableTailwind';

function UpdateVehicule() {
  const [brandList, setBrandList] = useState<any>([]);
  const [modelList, setModelList] = useState<any>([]);
  const [typeList, setTypeList] = useState<any>([]);
  const [immat, setImmat] = useState('');
  const [type, setType] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [model, setModel] = useState<any>([]);
  const [registrationDate, setRegistrationDate] = useState('');
  const [file, setFile] = useState<any>();
  const { infosUserVehicule }: any = useContext(UserContext);
  const [posted, setPosted] = useState(false);
  const {vehiculeImmatToUpdate} = useParams();
  const [infosVehicule, setInfosVehicule] = useState<any>([]);

  /* infosUserVehicule.filter((ele: any)=> ele.immat === vehiculeImmatToUpdate) */
  useEffect(() => {
    async function getInfosVehicule () {
      try {
        const res = await axios.get(`http://localhost:8000/api/vehicules/${vehiculeImmatToUpdate}`,
        {
          withCredentials: true,
        });
        setInfosVehicule(res.data);
      } catch (err) {
        console.log(err);
      }
    }
    getInfosVehicule();
  }, []);

  infosUserVehicule.length && console.log(infosUserVehicule);

  useEffect(() => {

    async function getBrandModel() {
      let urlBrand = 'http://localhost:8000/api/brands';
      if (brandFilter) urlBrand += `?name=${brandFilter}`;

      try {
        const getBrand = await axios.get(urlBrand, {
          withCredentials: true,
        });
        setBrandList(getBrand.data);
        const getType = await axios.get('http://localhost:8000/api/types/all', {
          withCredentials: true,
        });
        setTypeList(getType.data);
        if (getBrand.data.length === 1) {
          let urlModel = `http://localhost:8000/api/brands/${getBrand.data[0].id_brand}/models`;
          try {
            const getModel = await axios.get(urlModel, { withCredentials: true });
            setModelList(getModel.data);
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err) {
        console.log(err);
      }
    }
    getBrandModel();
  }, [brandFilter, model]);

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('immat', immat);
    formData.append('file', file);
    try {
      const upload = await axios.put(
        `http://localhost:8000/api/vehicules/upload`,
        formData,
        { withCredentials: true },
      );
      if (upload) {
        const putVehicule = await axios.put(`http://localhost:8000//api/vehicules/${vehiculeImmatToUpdate}`,
          {
            immat: vehiculeImmatToUpdate || "",
            registration_date: infosUserVehicule.registration_date || "",
            url_vehiculeRegistration: infosUserVehicule.url_vehiculeRegistration || "",
            id_modelId: infosUserVehicule.id_modelId || "",
            id_typeId: infosUserVehicule.id_typeId || "",
            id_userId: infosUserVehicule.id_userId
            /* immat: immat.toUpperCase(),
            registration_date: registrationDate,
            url_vehiculeRegistration: upload.data.url,
            id_modelId: parseInt(model),
            id_typeId: parseInt(type),
            id_userId: parseInt(userLogin.id_user), */

          },
          {
            withCredentials: true,
          },
        );
        if (putVehicule.status === 200) {
          setPosted(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col items-center w-full h-full m-auto">
      <h1 className={title}>Modifier votre véhicule</h1>
      {posted === false && (
        <form
          onSubmit={(e) => handleUpdate(e)}
          className={`flex flex-col w-10/12 m-4 rounded-lg p-4 items-center ${glassMorphism}`}>
          <label className="flex flex-col w-full text-lg font-semibold">
            Immatriculation
            <p className="text-sm">Format (AA-111-AA)</p>
            <input
              className={`valid:outline-valid-500 invalid:outline-error-500 ${input}`}
              type="text"
              name="immat"
              id="immat"
              pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
              placeholder={vehiculeImmatToUpdate}
              onChange={(e) => setImmat(e.target.value)}
              required
            />
          </label>
          <label className="flex flex-col w-full text-lg font-semibold">
            Type de véhicule
            <select
              className={`${input}`}
              name="type"
              id="type"
              required
              onChange={(e) => setType(e.target.value)}>
              <option value="">{infosUserVehicule.length && infosUserVehicule[0].type}</option>
              {typeList.map((el: any) => (
                <option key={el.id_type} value={el.id_type}>
                  {el.name_type}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col w-full text-lg font-semibold">
            Marque
            <input
              className={input}
              type="text"
              name="brand"
              id="brand"
              list="listBrands"
              placeholder="Selectionnez une marque"
              required
              onChange={(e) => setBrandFilter(e.target.value)}
            />
            <datalist id="listBrands">
              {brandList.map((el: any) => (
                <option key={el.id_brand} value={el.name}>
                  {el.name}
                </option>
              ))}
            </datalist>
          </label>
          <label className="flex flex-col w-full text-lg font-semibold">
            Modèle
            <select
              className={input}
              name="model"
              id="model"
              required
              onChange={(e) => setModel(e.target.value)}>
              <option value="">Selectionner un modèle</option>
              {modelList.map((el: any) => (
                <option key={el.id_model} value={el.id_model}>
                  {el.name}
                </option>
              ))}
            </select>
          </label>
          <label className="flex flex-col w-full text-lg font-semibold">
            Date de mise en circulation
            <input
              className={input}
              type="date"
              name="registrationDate"
              id="registrationDate"
              required
              onChange={(e) => setRegistrationDate(e.target.value)}
            />
          </label>
          <label className="flex flex-col w-full text-lg font-semibold">
            Télécharger votre carte grise
            <input
              className={input}
              type="file"
              name="file"
              id="file"
              required
              accept=".jpg, .jpeg, .png"
              onChange={(e) => setFile(e.target.files![0])}
            />
          </label>
          <button className={`w-1/2 ${button}`}>Valider les modifications</button>
        </form>
      )}
      {posted && (
        <div className={`h-3/6 w-10/12 m-4 flex flex-col items-center justify-center rounded-lg ${glassMorphism}`}>
          <h3 className="w-3/4 mb-10 text-4xl h-1/6 mt-23">Véhicule modifié avec succès</h3>
          <p className="w-3/4 h-3/6 mb-18">
            Vous pouvez maintenant consulter les informations de votre vehicule depuis
            votre compte utilisateur
          </p>
          <Link to="/particular/vehicules">
            <button className={`mb-5 h-1/6 ${button}`}>Mes véhicules</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default UpdateVehicule;
