import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { pros, users } from '../../../API/request';
import AdminContext from '../../../contexts/AdminContext';
import IPros from '../../../Interfaces/IPros';
import IUser from '../../../Interfaces/IUser';
import { button, glassMorphism } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';

interface ICustomers {
  particular: IUser[];
  pros: IPros[];
}

function CustomersAdmin() {
  const [dataCustomers, setDataCustomers] = useState<ICustomers[]>();
  const [dataSelect, setDataSelect] = useState('particular');
  const [userId, setUserId] = useState<number>();
  const [prosId, setProsId] = useState<number>();
  const [showUser, setShowUser] = useState<boolean>(false);
  const [showPros, setShowPros] = useState<boolean>(false);
  const { renderState, setRenderState } = useContext(AdminContext);

  async function getCustomers() {
    const promise1 = users.getAll();
    const promise2 = pros.getAll();
    const getAllCustomers = await Promise.all([promise1, promise2]);
    setDataCustomers([{ particular: getAllCustomers[0], pros: getAllCustomers[1] }]);
  }

  async function handleActiveUser(userId: number, data: IUser) {
    try {
      const toggleActiveUser = await users.put(userId, {
        active: !data.active,
        firstname: data.firstname,
        lastname: data.lastname,
        email: data.email,
        address: data.address,
        phone: data.phone,
        postal_code: data.postal_code,
        city: data.city,
      });
      if (toggleActiveUser.status === 200) {
        toast.success(
          `${data.lastname + ' ' + data.firstname} a bien été ${
            data.active ? 'bloqué' : 'débloqué'
          }`,
        );
        setRenderState(!renderState);
      }
    } catch (err) {
      if (err) toast.error("Une erreur s'est produite!");
    }
  }

  async function handleDeletePros(id: number, data: IPros) {
    try {
      const deletedPros = await pros.delete(id);
      if (deletedPros.status === 200) {
        setRenderState(!renderState);
        toast.success(`Le professionnel ${data.name} a bien été supprimé!`);
      }
    } catch (err) {
      if (err) toast.error("Une erreur s'est produite!");
    }
  }

  useEffect(() => {
    getCustomers();
  }, [renderState]);
  return (
    <div className="flex flex-col items-end w-full">
      <div className={`w-5/6 p-2`}>
        <div>
          <h1 className="text-3xl uppercase text-background">Mes utilisateurs</h1>
        </div>
        <div className={`flex flex-col ${glassMorphism} rounded-lg mt-4`}>
          <div className="flex">
            <button
              onClick={() => setDataSelect('particular')}
              className={`w-1/2 p-4 rounded-tl-lg bg-primary hover:bg-primary-hovered ${
                dataSelect === 'particular' ? 'bg-primary-focus' : ''
              }`}>
              Particulier
            </button>
            <button
              onClick={() => setDataSelect('pros')}
              className={`w-1/2 p-4 rounded-tr-lg bg-primary hover:bg-primary-hovered ${
                dataSelect === 'pros' ? 'bg-primary-focus' : ''
              }`}>
              Professionnels
            </button>
          </div>
          {dataSelect === 'particular' ? (
            <div className="grid grid-cols-6 pt-2 pb-2 bg-background/30">
              <p>Id User</p>
              <p>Nom</p>
              <p>Prénom</p>
              <p>Email</p>
              <p>Infos</p>
              <p>Status</p>
            </div>
          ) : (
            <div className="grid grid-cols-6 pt-2 pb-2 bg-background/30">
              <p>Id Pros</p>
              <p>Siret</p>
              <p>name</p>
              <p>Email</p>
              <p>Infos</p>
              <p></p>
            </div>
          )}
          {dataSelect === 'particular' && dataCustomers
            ? dataCustomers[0].particular.map((user: IUser, index: number) => (
                <div
                  className="grid items-center grid-cols-6 pt-2 pb-2 hover:bg-background/30 "
                  key={index}>
                  <p>{user.id_user}</p>
                  <p>{user.lastname}</p>
                  <p>{user.firstname}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.email}
                  </p>
                  <button
                    onClick={() => {
                      setShowUser(true);
                      setUserId(user.id_user);
                    }}
                    className={`${button} w-2/3 m-auto`}>
                    Details
                  </button>
                  <button
                    onClick={() => user.id_user && handleActiveUser(user.id_user, user)}
                    className={`${button} w-2/3 m-auto ${
                      !user.active ? '' : 'bg-red-500 hover:bg-red-300'
                    }`}>
                    {user.active ? 'Bloquer' : 'Débloquer'}
                  </button>
                </div>
              ))
            : dataCustomers &&
              dataCustomers[0].pros.map((pro: IPros, index: number) => (
                <div
                  className="grid items-center grid-cols-6 pt-2 pb-2 hover:bg-background/30 "
                  key={index}>
                  <p>{pro.id_pros}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {pro.siret}
                  </p>
                  <p>{pro.name}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {pro.email}
                  </p>
                  <button
                    onClick={() => {
                      setShowPros(true);
                      setProsId(pro.id_pros);
                    }}
                    className={`${button} w-2/3 m-auto`}>
                    Details
                  </button>
                  <button
                    onClick={() => pro.id_pros && handleDeletePros(pro.id_pros, pro)}
                    className={`${button} bg-red-500 hover:bg-red-300 w-2/3 m-auto`}>
                    Supprimer
                  </button>
                </div>
              ))}
        </div>
      </div>
      <ModalInfos
        setShowUser={setShowUser}
        showUser={showUser}
        userId={userId}
        prosId={prosId}
        showPros={showPros}
        setShowPros={setShowPros}
      />
    </div>
  );
}

export default CustomersAdmin;
