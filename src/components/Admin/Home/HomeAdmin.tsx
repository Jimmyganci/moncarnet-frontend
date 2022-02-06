import React, { useContext, useEffect, useState } from 'react';
import { useOutletContext } from 'react-router-dom';
import { Link } from 'react-router-dom';

import { appointment, pros, service_book, users, vehicule } from '../../../API/request';
import calendar from '../../../assets/minimalist_logos/calendar.svg';
import AdminContext from '../../../contexts/AdminContext';
import IVehicule from '../../../Interfaces/IVehicule';
import { button, glassMorphism } from '../../../variableTailwind';
import CountAppointment from './CountAppointment';
import CountCustomers from './CountCustomers';
import CountServiceBook from './CountServiceBook';
import UsersWithoutAppointment from './UsersWithoutAppointment';
import VehiculeConfirm from './VehiculeConfirm';
import VehiculeWithoutServiceBook from './VehiculeWithoutServiceBook';

function HomeAdmin() {
  const { adminLogin } = useContext(AdminContext);
  const vehiculeToValidate = useOutletContext<IVehicule[]>();

  const [dataLength, setDataLength] = useState([
    {
      particular: 0,
      pros: 0,
      appointment: 0,
      usersWithoutAppointment: 0,
      serviceBook: 0,
      vehicules: 0,
      vehiculeWithOutServiceBook: 0,
    },
  ]);
  const percentageAppointment = Math.round(
    (dataLength[0].usersWithoutAppointment / dataLength[0].particular) * 100,
  );
  const percentageServiceBook = Math.round(
    (dataLength[0].vehiculeWithOutServiceBook / dataLength[0].vehicules) * 100,
  );

  async function getUserAndPros() {
    const promise1 = users.getAll();
    const promise2 = pros.getAll();
    const promise3 = appointment.getAll();
    const promise4 = users.getUserWithoutAppointment();
    const promise5 = service_book.getAll();
    const promise6 = vehicule.getAll();
    const promise7 = vehicule.getVehiculeWithoutServiceBook();
    const res = await Promise.all([
      promise1,
      promise2,
      promise3,
      promise4,
      promise5,
      promise6,
      promise7,
    ]);
    setDataLength([
      {
        particular: res[0].length,
        pros: res[1].length,
        appointment: res[2].length,
        usersWithoutAppointment: res[3].length,
        serviceBook: res[4].length,
        vehicules: res[5].length,
        vehiculeWithOutServiceBook: res[6].length,
      },
    ]);
  }

  useEffect(() => {
    getUserAndPros();
  }, []);

  return (
    <div className="flex flex-col items-end w-full">
      {adminLogin && (
        <div className={`w-5/6 p-2`}>
          <div className="mt-4 mb-4">
            <h1 className="text-3xl text-white uppercase ">
              Bienvenue {adminLogin.firstname}
            </h1>
          </div>
          <div className="flex flex-wrap gap-2">
            <VehiculeConfirm vehiculeToValidate={vehiculeToValidate} />
            <CountCustomers
              particular={dataLength[0].particular}
              pros={dataLength[0].pros}
            />
          </div>
          <div
            className={`${glassMorphism} justify-between mt-2 flex-1 rounded-lg p-2 flex flex-col items-center`}>
            <div className="flex items-center justify-center w-full rounded-lg bg-background/50">
              <img className="w-10" src={calendar} alt="calendar" />
              <p className="ml-1">Rendez-vous</p>
            </div>
            <div className="flex w-full gap-2 mt-4">
              <CountAppointment appointment={dataLength[0].appointment} />
              <UsersWithoutAppointment percentage={percentageAppointment} />
            </div>
            <Link to="/admin/appointments">
              <button className={`${button}`}>Accéder au rendez-vous</button>
            </Link>
          </div>
          <div
            className={`${glassMorphism} justify-between mt-2 flex-1 rounded-lg p-2 flex flex-col items-center`}>
            <div className="flex items-center justify-center w-full rounded-lg bg-background/50">
              <img className="w-10" src={calendar} alt="calendar" />
              <p className="ml-1">{`Carnet d'entretien`}</p>
            </div>
            <div className="flex flex-row-reverse w-full gap-2 mt-4">
              <CountServiceBook serviceBook={dataLength[0].serviceBook} />
              <VehiculeWithoutServiceBook percentage={percentageServiceBook} />
            </div>
            <Link to="/admin/serviceBook">
              <button className={`${button}`}>Liste des carnets</button>
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomeAdmin;
