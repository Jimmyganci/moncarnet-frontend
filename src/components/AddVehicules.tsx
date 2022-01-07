import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import UserContext from '../contexts/UserContext';
import { button, glassMorphism, input, title } from '../variableTailwind';

function AddVehicules() {
  const [brandList, setBrandList] = useState<any>([]);
  const [modelList, setModelList] = useState<any>([]);
  const [typeList, setTypeList] = useState<any>([]);
  const [immat, setImmat] = useState('');
  const [type, setType] = useState('');
  const [brandFilter, setBrandFilter] = useState('');
  const [model, setModel] = useState<any>([]);
  const [registrationDate, setRegistrationDate] = useState('');
  const [file, setFile] = useState<any>();
  const { userLogin }: any = useContext(UserContext);
  const [posted, setPosted] = useState(false);

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

  const handleUpload = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('immat', immat);
    formData.append('file', file);
    try {
      const upload = await axios.post(
        `http://localhost:8000/api/vehicules/upload`,
        formData,
        { withCredentials: true },
      );
      if (upload) {
        const postVehicule = await axios.post(
          'http://localhost:8000/api/vehicules/',
          {
            immat: immat.toUpperCase(),
            registration_date: registrationDate,
            url_vehiculeRegistration: upload.data.url,
            id_modelId: parseInt(model),
            id_typeId: parseInt(type),
            id_userId: parseInt(userLogin.id_user),
          },
          {
            withCredentials: true,
          },
        );
        if (postVehicule.status === 200) {
          setPosted(true);
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex flex-col">
      <h1 className={title}>Ajouter un véhicule</h1>
      {posted === false && (
        <form
          onSubmit={(e) => handleUpload(e)}
          className={`flex flex-col m-4 rounded-lg p-4 items-center ${glassMorphism}`}>
          <label className="flex flex-col w-full text-lg font-semibold">
            Immatriculation
            <p className="text-sm">Format (AA-111-AA)</p>
            <input
              className={`valid:outline-valid-500 invalid:outline-error-500 ${input}`}
              type="text"
              name="immat"
              id="immat"
              pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
              placeholder="Rentrez votre immatriculation"
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
              <option value="">Selectionnez un type de véhicule</option>
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
          <button className={`w-1/2 ${button}`}>Ajouter</button>
        </form>
      )}
      {posted && (
        <div className={`m-4 flex flex-col items-center rounded-lg ${glassMorphism}`}>
          <h3 className="w-3/4 mb-20 text-5xl mt-28">Véhicule ajouté avec succès</h3>
          <p className="mb-28">
            Vous pouvez maintenant consulter les informations de votre vehicule depuis
            votre compte utilisateur
          </p>
          <Link to="/particular/vehicules">
            <button className={`mb-10 ${button}`}>Mes véhicules</button>
          </Link>
        </div>
      )}
    </div>
  );
}

export default AddVehicules;
