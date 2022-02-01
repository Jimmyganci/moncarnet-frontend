import axios from 'axios';
import React, { useContext, useEffect, useState, useRef, PropsWithChildren } from 'react';
import { Link, Params, useParams } from 'react-router-dom';

import UserContext from '../../../contexts/UserContext';
import { button, glassMorphism, input, title } from '../../../variableTailwind';

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
  const { posted, setPosted }: any = useContext(UserContext);
  const {vehiculeImmatToUpdate}:any= useParams();
  const [infosVehicule, setInfosVehicule] = useState<any>([]);
  const refDate: any = useRef();
  const refCard: any = useRef();

  useEffect(() => {
    async function getInfosVehicule() {
      setInfosVehicule(
        infosUserVehicule.filter((ele: any) => ele.immat === vehiculeImmatToUpdate),
      );
    }
    getInfosVehicule();
  }, [infosUserVehicule]);

  useEffect(() => {
    async function getBrandModel() {
      let urlBrand = 'http://localhost:8000/api/brands';
      if (brandFilter) urlBrand += `?name=${brandFilter}`;
      try {
        const getBrand = await axios.get(urlBrand, {
          withCredentials: true,
        });
        setBrandList(getBrand.data);
        const getType = await axios.get('http://localhost:8000/api/types', {
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
    let uploadedGreenCard: any = undefined;
    try {
      if (file !== undefined) {
        const formData = new FormData();
        formData.append('file', file);
        formData.append('immat', vehiculeImmatToUpdate);
        const resUpload = await axios.post(
          `http://localhost:8000/api/vehicules/${vehiculeImmatToUpdate}/upload`,
          formData,
          { withCredentials: true },
        );
      uploadedGreenCard = resUpload.data.url;
    }
       
       
    const putVehicule = await axios.put(`http://localhost:8000/api/vehicules/${vehiculeImmatToUpdate}`,
      {
        immat: immat.toUpperCase() || vehiculeImmatToUpdate,
        registration_date: registrationDate || infosVehicule[0].registration_date,
        url_vehiculeRegistration: uploadedGreenCard || infosVehicule[0].url_vehiculeRegistration,
        id_modelId: parseInt(model) || infosVehicule[0].id_modelId,
        id_typeId: parseInt(type) || infosVehicule[0].id_typeId,
        id_userId: parseInt(infosVehicule[0].id_userId),
        active: true,
        validate: false
      },
      {
        withCredentials: true,
      },
    );
      if (putVehicule.status === 204) {
        setPosted(true);
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="w-full h-full flex flex-col items-center justify-center">
      {posted === false && (
        <div className="h-full w-full flex flex-col items-center m-auto">
          <h1 className={title}>Modifier votre véhicule</h1>
          <form
            onSubmit={(e) => handleUpdate(e)}
            className={`flex flex-col w-10/12 m-4 rounded-lg p-4 items-center ${glassMorphism}`}
          >
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
              />
            </label>
            <label className="flex flex-col w-full text-lg font-semibold">
              Type de véhicule
              <select
                className={`${input}`}
                name="type"
                id="type"
                onChange={(e) => setType(e.target.value)}
              >
                <option value="">{infosVehicule.length && infosVehicule[0].type}</option>
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
                value={brandFilter}
                placeholder={infosVehicule.length && infosVehicule[0].brand}
                onChange={(e) => setBrandFilter(e.target.value)}
                onClick={() => setBrandFilter('')}
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
                onChange={(e) => setModel(e.target.value)}
              >
                <option value={model}>
                  {infosVehicule.length && infosVehicule[0].model}
                </option>
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
                className={`${input} w-full`}
                type="text"
                ref={refDate}
                onFocus={() => (refDate.current.type = 'date')}
                onBlur={() => (refDate.current.type = 'text')}
                name="registrationDate"
                id="registrationDate"
                placeholder={
                  infosVehicule.length && infosVehicule[0].registration_date.slice(0, 10)
                }
                onChange={(e) => setRegistrationDate(e.target.value)}
              />
            </label>
            <label className="flex flex-col w-full text-lg font-semibold">
              Votre carte grise
              <input
                className={input}
                type="text"
                name="file"
                id="file"
                ref={refCard}
                onFocus={() => (refCard.current.type = 'file')}
                onBlur={() => (refCard.current.type = 'file')}
                placeholder={
                  infosVehicule.length &&
                  infosVehicule[0].url_vehiculeRegistration.slice(
                    81,
                    infosVehicule[0].url_vehiculeRegistration.length,
                  )
                }
                accept=".jpg, .jpeg, .png"
                onChange={(e) => setFile(e.target.files![0])}
              />
            </label>
            <button className={`w-1/2 ${button}`}>Valider les modifications</button>
          </form>
        </div>
      )}
      {posted && (
        <div
          className={`h-full w-5/6 my-20 flex flex-col items-center justify-center rounded-lg ${glassMorphism}`}
        >
          <h3 className="w-3/4 h-3/6 mb-10 mt-15 pt-10 text-4xl">
            Véhicule modifié avec succès
          </h3>
          <p className="w-3/4 h-4/6 my-5">
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
