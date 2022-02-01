import React, { useEffect, useState } from 'react';

import { pros, users } from '../../../API/request';
import email from '../../../assets/minimalist_logos/email.svg';
import house from '../../../assets/minimalist_logos/house.svg';
import phone from '../../../assets/minimalist_logos/phone.svg';
import profilLogo from '../../../assets/minimalist_logos/profile.svg';
import ProsInfos from '../../../Interfaces/IPros';
import UserInfos from '../../../Interfaces/IUserInfos';
import { button } from '../../../variableTailwind';

interface ModalProps {
  showUser?: boolean | null;
  setShowUser?: Function | null;
  showPros?: boolean | null;
  setShowPros?: Function | null;
  userId?: number | null;
  prosId?: number | null;
}

function ModalInfos({
  showUser,
  setShowUser,
  showPros,
  setShowPros,
  userId,
  prosId,
}: ModalProps) {
  const [userData, setUserData] = useState<UserInfos>();
  const [prosData, setProsData] = useState<ProsInfos>();

  async function getUserOrPros() {
    if (userId) {
      const res = await users.getOne(userId);
      setUserData(res);
    }
    if (prosId) {
      const res = await pros.getOne(prosId);
      setProsData(res);
    }
  }

  useEffect(() => {
    getUserOrPros();
  }, [userId, prosId]);

  return (
    <div>
      {showUser && userData && (
        <div
          className={`backdrop-filter backdrop-blur-xl fixed flex justify-center items-center top-0 left-0 w-full h-full p-4`}
        >
          <div
            className={`w-2/3 rounded-lg flex flex-col items-center justify-around bg-background/30 p-4`}
          >
            <div>
              <img className="w-32" src={profilLogo} alt="logo_user" />
            </div>
            <div className="flex justify-around w-1/3">
              <p className="text-2xl ">{userData.firstname}</p>
              <p className="text-2xl">{userData.lastname}</p>
            </div>
            <div className="flex justify-around w-1/2">
              <div className="flex flex-col items-center">
                <img className="w-11" src={email} alt="email" />
                <p>{userData.email}</p>
              </div>
              <div className="flex flex-col items-center">
                <img className="w-11" src={phone} alt="phone" />
                <p>{userData.phone}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-14" src={house} alt="house_logo" />
              <p>{userData.address}</p>
              <p>{userData.postal_code}</p>
              <p>{userData.city}</p>
            </div>

            <button
              onClick={() => setShowUser && setShowUser(false)}
              className={`${button}`}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
      {showPros && prosData && (
        <div
          className={`backdrop-filter backdrop-blur-xl fixed flex justify-center items-center top-0 left-0 w-full h-full p-4`}
        >
          <div
            className={`w-2/3 rounded-lg flex flex-col items-center justify-around bg-background/30 p-4`}
          >
            <div>
              <img className="w-32" src={profilLogo} alt="logo_user" />
            </div>
            <div className="flex flex-col">
              <p className="text-3xl ">{prosData.name}</p>
              <p className="mt-4 text-2xl">siret: {prosData.siret}</p>
            </div>
            <div className="flex justify-around w-1/2">
              <div className="flex flex-col items-center">
                <img className="w-11" src={email} alt="email" />
                <p>{prosData.email}</p>
              </div>
              <div className="flex flex-col items-center">
                <img className="w-11" src={phone} alt="phone" />
                <p>{prosData.phone}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-14" src={house} alt="house_logo" />
              <p>{prosData.address}</p>
              <p>{prosData.postal_code}</p>
              <p>{prosData.city}</p>
            </div>

            <button
              onClick={() => setShowPros && setShowPros(false)}
              className={`${button}`}
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalInfos;
