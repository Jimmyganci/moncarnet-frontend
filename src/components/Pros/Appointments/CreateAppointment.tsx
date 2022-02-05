import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { appointment, pros } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IUserInfos from '../../../Interfaces/IUserInfos';
import IVehiculeInfos from '../../../Interfaces/IVehiculeInfos';
import { h1, input } from '../../../variableTailwind';

function CreateAppointments() {
  const { prosLogin } = useContext(ProsContext);
  const [customer, setCustomer] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [time, setTime] = useState<string>('');
  const [details, setDetails] = useState<string>('');
  const [customersList, setCustomersList] = useState<IUserInfos[]>([]);
  const [chosenCustomer, setChosenCustomer] = useState<string>('');
  const [valideRdv, setValivRdv] = useState<boolean>(true);
  const [userVehicules, setUserVehicules] = useState<IVehiculeInfos[]>();
  const [chosenImmat, setChosenImmat] = useState<string>();
  let appointmentDate : string = `${date}T${time}:00.000Z`;

  const today : string = new Date().toISOString();

  // Check validity of rdv's date :

  const dateCompare = (today: string, date: string) => {
    if (today < date) {
      setValivRdv(true);
    } else {
      setValivRdv(false);
    }
  };

  useEffect(() => {
    dateCompare(today, date);
  }, [date]);

  // Looking for customers in database

  useEffect(() => {
    prosLogin.id_user &&
      pros.getUsers(prosLogin.id_user).then((data) => setCustomersList(data));
  }, [prosLogin]);

  // Create rdv in database

  const handleCreateRdv = (e: React.FormEvent) => {
    e.preventDefault();
    if (valideRdv && details && date && chosenCustomer && prosLogin && chosenImmat) {
      appointment
        .create({
          userId: parseInt(chosenCustomer),
          prosId: prosLogin.id_user,
          date: appointmentDate,
          comment: details,
          immat: chosenImmat,
        })
        .then(() => {
          toast.success('Rendez-vous créé');
        })

        .catch((err) => {
          console.log(err);
        });
    } else {
      toast.error('Veuillez remplir les champs.');
    }
  };

  useEffect(() => {
    chosenCustomer &&
      axios
        .get(`http://localhost:8000/api/users/${chosenCustomer}/vehicules`, {
          withCredentials: true,
        })
        .then((res) => res.data)
        .then((data) => setUserVehicules(data));
  }, [chosenCustomer]);

  return (
    <div className="w-full h-full">
      <h1 className={`${h1}`}>Créer un RDV</h1>
      <form
        className="flex flex-col items-center justify-around w-full h-5/6"
        onSubmit={(e: React.FormEvent) => handleCreateRdv(e)}>
        <label htmlFor="client">Nom du client</label>
        <input
          className={`w-3/4 p-2 mb-4 text-center border rounded-md bg-primary-hovered border-primary outline-primary-focus`}
          type="text"
          name="client"
          id="client"
          placeholder="Rechercher un client"
          onChange={(e) => setCustomer(e.target.value)}
        />
        <select
          name="customer"
          id="client"
          onChange={(e) => setChosenCustomer(e.target.value)}>
          <option defaultValue={''}>Aucun client sélectionné</option>
          {customersList
            .filter((user) => user.lastname.toLowerCase().includes(customer.toLowerCase()))
            .map((user) => (
              <option value={user.id_user} key={user.id_user}>
                {user.lastname} {user.firstname}
              </option>
            ))}
        </select>

        {chosenCustomer && (
          <div className="flex flex-col items-center justify-center">
            <label className="pt-2" htmlFor="vehicules">
              Véhicules du client
            </label>
            <select
              className="mt-2 mb-4"
              name="vehicules"
              id="vehicules"
              onChange={(e) => setChosenImmat(e.target.value)}>
              <option defaultValue={''}>Aucun véhicule sélectionné</option>
              {userVehicules &&
                userVehicules.map((vehicule) => (
                  <option value={vehicule.immat} key={vehicule.immat}>
                    {vehicule.immat}
                  </option>
                ))}
            </select>
          </div>
        )}
        <label htmlFor="date">Date</label>
        <input
          className={`w-3/4 ${input}`}
          type="date"
          name="date"
          id="date"
          placeholder="Choisissez une date"
          onChange={(e) => setDate(e.target.value)}
        />
        <input
          className={`w-3/4 ${input}`}
          type="time"
          name="time"
          id="time"
          placeholder="Choisissez une heure"
          onChange={(e) => setTime(e.target.value)}
        />
        {valideRdv ? (
          ''
        ) : (
          <p className="text-red-700">
            {`La date sélectionnée est antérieure à aujourd'hui`}
          </p>
        )}
        <label htmlFor="details">Détails</label>
        <input
          className={`w-3/4 ${input}`}
          type="text"
          name="details"
          id="details"
          placeholder="Détails"
          onChange={(e) => setDetails(e.target.value)}
        />
        <button
          className={`p-4 mt-4 duration-300 ease-in-out rounded-lg shadow-lg bg-primary hover:bg-primary-hovered`}
          type="submit">
          Créer
        </button>
      </form>
    </div>
  );
}

export default CreateAppointments;
