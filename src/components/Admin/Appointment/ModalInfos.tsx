import React from 'react';

import email from '../../../assets/minimalist_logos/email.svg';
import house from '../../../assets/minimalist_logos/house.svg';
import phone from '../../../assets/minimalist_logos/phone.svg';
import profilLogo from '../../../assets/minimalist_logos/profile.svg';
import UserInfos from '../../../Interfaces//IuserInfos';
import ProsInfos from '../../../Interfaces/IPros';
import { button } from '../../../variableTailwind';

interface ModalProps {
  showUser: boolean;
  setShowUser: Function;
  showPros?: boolean | null;
  setShowPros?: Function | null;
  user: UserInfos;
  pros?: ProsInfos | null;
}

function ModalInfos({
  showUser,
  setShowUser,
  showPros,
  setShowPros,
  user,
  pros,
}: ModalProps) {
  return (
    <div>
      {showUser && (
        <div className={`fixed top-0 left-0 w-full h-full p-4`}>
          <div
            className={` backdrop-filter backdrop-blur-xl bg-background/30 w-full h-full rounded-lg flex flex-col items-center justify-around`}>
            <div>
              <img className="w-40" src={profilLogo} alt="logo_user" />
            </div>
            <div className="flex justify-center justify-around w-1/5">
              <p className="text-4xl ">{user.firstname}</p>
              <p className="text-4xl">{user.lastname}</p>
            </div>
            <div className="flex justify-around w-1/2">
              <div className="flex flex-col items-center">
                <img className="w-11" src={email} alt="email" />
                <p>{user.email}</p>
              </div>
              <div className="flex flex-col items-center">
                <img className="w-11" src={phone} alt="phone" />
                <p>{user.phone}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-14" src={house} alt="house_logo" />
              <p>{user.address}</p>
              <p>{user.postal_code}</p>
              <p>{user.city}</p>
            </div>

            <button onClick={() => setShowUser(false)} className={`${button}`}>
              Fermer
            </button>
          </div>
        </div>
      )}
      {showPros && pros && (
        <div className={`fixed top-0 left-0 w-full h-full p-4`}>
          <div
            className={` backdrop-filter backdrop-blur-xl bg-background/30 w-full h-full rounded-lg flex flex-col items-center justify-around`}>
            <div>
              <img className="w-40" src={profilLogo} alt="logo_user" />
            </div>
            <div className="flex flex-col">
              <p className="text-4xl ">{pros.name}</p>
              <p className="mt-4 text-2xl">siret: {pros.siret}</p>
            </div>
            <div className="flex justify-around w-1/2">
              <div className="flex flex-col items-center">
                <img className="w-11" src={email} alt="email" />
                <p>{pros.email}</p>
              </div>
              <div className="flex flex-col items-center">
                <img className="w-11" src={phone} alt="phone" />
                <p>{pros.phone}</p>
              </div>
            </div>
            <div className="flex flex-col items-center">
              <img className="w-14" src={house} alt="house_logo" />
              <p>{pros.address}</p>
              <p>{pros.postal_code}</p>
              <p>{pros.city}</p>
            </div>

            <button
              onClick={() => setShowPros && setShowPros(false)}
              className={`${button}`}>
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default ModalInfos;
