import React, { useEffect, useState } from 'react';

import { pros, users } from '../../../API/request';
import IPros from '../../../Interfaces/IPros';
import ProsInfos from '../../../Interfaces/IPros';
import IUserInfos from '../../../Interfaces/IUserInfos';
import UserInfos from '../../../Interfaces/IUserInfos';
import { glassMorphism } from '../../../variableTailwind';

interface ICustomers {
  particular: IUserInfos[];
  pros: IPros[];
}

function CustomersAdmin() {
  const [dataCustomers, setDataCustomers] = useState<ICustomers[]>();
  const [dataSelect, setDataSelect] = useState('particular');

  async function getCustomers() {
    const promise1 = users.getAll();
    const promise2 = pros.getAll();
    const getAllCustomers = await Promise.all([promise1, promise2]);
    setDataCustomers([{ particular: getAllCustomers[0], pros: getAllCustomers[1] }]);
  }

  useEffect(() => {
    getCustomers();
  }, []);
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
            <div className="grid grid-cols-9 pt-2 pb-2 bg-background/30">
              <p>Id User</p>
              <p>Nom</p>
              <p>Prénom</p>
              <p>Email</p>
              <p>Adresse</p>
              <p>Code Postal</p>
              <p>City</p>
              <p>Tel</p>
              <p>Status</p>
            </div>
          ) : (
            <div className="grid grid-cols-9 pt-2 pb-2 bg-background/30">
              <p>Id Pros</p>
              <p>Siret</p>
              <p>name</p>
              <p>Email</p>
              <p>Adresse</p>
              <p>Code Postal</p>
              <p>City</p>
              <p>Tel</p>
              <p>Status</p>
            </div>
          )}
          {dataSelect === 'particular' && dataCustomers
            ? dataCustomers[0].particular.map((user: UserInfos, index: number) => (
                <div className="grid grid-cols-9 pt-2 pb-2 " key={index}>
                  <p>{user.id_user}</p>
                  <p>{user.lastname}</p>
                  <p>{user.firstname}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {user.email}
                  </p>
                  <p>{user.address}</p>
                  <p>{user.postal_code}</p>
                  <p>{user.city}</p>
                  <p>{user.phone}</p>
                  <p>non bloqué</p>
                </div>
              ))
            : dataCustomers &&
              dataCustomers[0].pros.map((pro: ProsInfos, index: number) => (
                <div className="grid grid-cols-9 pt-2 pb-2 " key={index}>
                  <p>{pro.id_pros}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {pro.siret}
                  </p>
                  <p>{pro.name}</p>
                  <p className="overflow-hidden whitespace-nowrap text-ellipsis">
                    {pro.email}
                  </p>
                  <p>{pro.address}</p>
                  <p>{pro.postal_code}</p>
                  <p>{pro.city}</p>
                  <p>{pro.phone}</p>
                  <p>non bloqué</p>
                </div>
              ))}
        </div>
      </div>
    </div>
  );
}

export default CustomersAdmin;
