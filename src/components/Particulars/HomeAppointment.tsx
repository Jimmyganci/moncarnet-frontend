import React, { useContext, useEffect, useState } from 'react';
import { BsArrowUpCircle } from 'react-icons/bs';

import { pros, users } from '../../API/request';
import UserContext from '../../contexts/UserContext';
import IAppointment from '../../Interfaces/IAppointment';
import IPros from '../../Interfaces/IPros';
import { borderGlass, button, glassMorphism, h2, title } from '../../variableTailwind';
import Plate from '../Plate';
import ReturnButton from '../ReturnButton';
import ProsAppointment from './ProsAppointment';

const HomeAppointment = () => {
  const { userLoggedIn } = useContext(UserContext);
  const [infosAppointments, setInfosAppointments] = useState<IAppointment[]>([]);
  const [prosData, setProsData] = useState<IPros[]>([]);
  const [showPastAppointments, setShowPastAppointments] = useState<boolean>(false);
  const [showAll, setShowAll] = useState<boolean>(false);
  const [showAllPast, setShowAllPast] = useState<boolean>(false);

  // Date of the day
  let today = new Date();
  useEffect(() => {
    async function getAppointments() {
      try {
        const res =
          userLoggedIn.id_user && (await users.appointments(userLoggedIn.id_user));
        if (res) {
          const resPros = await pros.getAll();
          setInfosAppointments(res);
          setProsData(resPros);
        }
      } catch (err) {
        console.log(err);
      }
    }
    getAppointments();
  }, [userLoggedIn]);

  return (
    <div className="flex flex-col items-center justify-center w-full h-full pb-5 lg:-mt-20">
      <div className="flex items-center justify-center lg:mb-10">
        <h1 className={`${title}`}>Mes rendez-vous</h1>
      </div>
      <div className="flex flex-col justify-center items-center w-11/12 lg:h-4/6 lg:ml-20 lg:flex-row lg:justify-around">
        <div
          className={`${glassMorphism} w-full max-w-xl rounded-lg pb-4 lg:w-5/12 lg:h-fit`}>
          <div className="flex flex-col items-center justify-around">
            <h2 className={`${h2}`}>Mes prochains rendez-vous</h2>
            {infosAppointments.length !== 0 &&
              prosData.length !== 0 &&
              infosAppointments
                .filter(
                  (e) => new Date(e.date).toISOString() > new Date(today).toISOString(),
                )
                .sort((a, b) => {
                  return a.date > b.date ? 1 : -1;
                })
                .slice(0, 2)
                .map((appointment, index: number) => (
                  <div key={index} className={`${borderGlass} w-11/12 mb-2 lg:mt-6`}>
                    <div
                      className={`w-64 h-12 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg mx-auto overflow-hidden mt-2 mb-4 border-black border-[1px]`}>
                      <Plate
                        immat={appointment.immat}
                        postalCode={userLoggedIn.postal_code.toString()}
                      />
                    </div>
                    <p>
                      {'le '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      {' à '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleTimeString().slice(0, 5)}
                      </span>
                    </p>
                    <p className="text-black text-lg leading-[1] my-2">
                      {appointment.comment}
                    </p>
                    <p>
                      {'Avec '}
                      <span className="text-xl font-medium underline">
                        <ProsAppointment prosId={appointment.prosId} />
                      </span>
                    </p>
                  </div>
                ))}
            {infosAppointments.length !== 0 &&
              prosData.length !== 0 &&
              infosAppointments
                .filter((e) => e.date > today)
                .sort((a, b) => {
                  return a.date > b.date ? 1 : -1;
                })
                .slice(2, infosAppointments.length - 1)
                .map((appointment, index: number) => (
                  <div
                    key={index}
                    className={`${borderGlass} w-11/12 mb-2 ${showAll ? '' : 'hidden'}`}>
                    <div
                      className={`w-64 h-12 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg mx-auto overflow-hidden mt-2 mb-4 border-black border-[1px]`}>
                      <Plate
                        immat={appointment.immat}
                        postalCode={userLoggedIn.postal_code.toString()}
                      />
                    </div>
                    <p className="">
                      {'le '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      {' à '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleTimeString().slice(0, 5)}
                      </span>
                    </p>
                    <p className="text-black leading-[1] my-2">{appointment.comment}</p>
                    <p className="">
                      {'Avec '}
                      <span className="text-xl font-medium underline">
                        <ProsAppointment prosId={appointment.prosId} />
                      </span>
                    </p>
                  </div>
                ))}
          </div>
          <p
            className="cursor-pointer hover:underline"
            onClick={() => setShowAll(!showAll)}
            onKeyDown={() => setShowAll(!showAll)}
            role="presentation">
            {showAll ? 'Retour' : 'Voir tout'}
          </p>
        </div>
        <div className="hidden lg:block h-full w-[1px] -mx-20 px-0 bg-white rounded-full shadow-md shadow-background opacity-50"></div>
        <div
          className={`${
            showPastAppointments
              ? `${glassMorphism} mt-6 pt-3 lg:flex lg:flex-col lg:h-fit lg:mt-0`
              : ''
          } w-full max-w-xl rounded-lg pb-4 lg:flex lg:items-center lg:justify-center lg:w-5/12`}>
          <div className="flex flex-col items-center justify-center w-full lg:justify-around">
            <button
              className={`${button} text-md font-inter max-w-md mb-2 w-4/6 flex justify-center`}
              onClick={() => {
                setShowPastAppointments(!showPastAppointments);
                setShowAllPast(false);
              }}>
              {showPastAppointments ? (
                <BsArrowUpCircle className="text-lg font-bold" />
              ) : (
                'Voir mes rendez-vous passés'
              )}
            </button>
            {infosAppointments.length !== 0 &&
              prosData.length !== 0 &&
              infosAppointments
                .filter((e) => e.date < today)
                .sort((a, b) => {
                  return a.date < b.date ? 1 : -1;
                })
                .slice(0, 2)
                .map((appointment, index: number) => (
                  <div
                    key={index}
                    className={`${borderGlass} w-11/12 mb-2 ${
                      showPastAppointments ? '' : 'hidden'
                    }`}>
                    <div
                      className={`w-64 h-12 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg mx-auto overflow-hidden mt-2 mb-4 border-black border-[1px]`}>
                      <Plate
                        immat={appointment.immat}
                        postalCode={userLoggedIn.postal_code.toString()}
                      />
                    </div>
                    <p className="">
                      {'le '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      {' à '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleTimeString().slice(0, 5)}
                      </span>
                    </p>
                    <p className="text-black leading-[1] my-2">{appointment.comment}</p>
                    <p className="">
                      {'Avec '}
                      <ProsAppointment prosId={appointment.prosId} />
                    </p>
                  </div>
                ))}
            {infosAppointments.length !== 0 &&
              prosData.length !== 0 &&
              infosAppointments
                .filter((e) => e.date < today)
                .sort((a, b) => {
                  return new Date(a.date) < new Date(b.date) ? 1 : -1;
                })
                .slice(2, infosAppointments.length - 1)
                .map((appointment, index: number) => (
                  <div
                    key={index}
                    className={`${borderGlass} w-11/12 mb-2 ${
                      showAllPast ? '' : 'hidden'
                    }`}>
                    <div
                      className={`w-64 h-12 max-h-16 max-w-sm shadow-text rounded-lg shadow-lg mx-auto overflow-hidden mt-2 mb-4 border-black border-[1px]`}>
                      <Plate
                        immat={appointment.immat}
                        postalCode={userLoggedIn.postal_code.toString()}
                      />
                    </div>
                    <p className="">
                      {'le '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleDateString()}
                      </span>
                      {' à '}
                      <span className="text-xl font-medium underline">
                        {new Date(appointment.date).toLocaleTimeString().slice(0, 5)}
                      </span>
                    </p>
                    <p className="text-black leading-[1] my-2">{appointment.comment}</p>
                    <p className="">
                      {'Avec '}
                      <ProsAppointment prosId={appointment.prosId} />
                    </p>
                  </div>
                ))}
          </div>
          <p
            className={`cursor-pointer hover:underline ${
              showPastAppointments ? '' : 'hidden'
            }`}
            onClick={() => setShowAllPast(!showAllPast)}
            onKeyDown={() => setShowAllPast(!showAllPast)}
            role="presentation">
            {showAllPast ? 'Retour' : 'Voir tout'}
          </p>
        </div>
      </div>
      <div className='text-md font-inter max-w-md mb-2 w-[60%] flex justify-center -mt-4'><ReturnButton target={''}/></div>
    </div>
  );
};

export default HomeAppointment;
