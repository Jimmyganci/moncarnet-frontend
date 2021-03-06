import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { appointment, users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import {
  button,
  deleteButton,
  glassMorphism,
  h3,
  input,
} from '../../../variableTailwind';

function ModalAppointment() {
  const { setShowModal, prosLoggedIn, appointmentId } = useContext(ProsContext);
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [dayUpdate, setDayUpdate] = useState<string>('');
  const [hoursUpdate, setHoursUpdate] = useState<string>('');
  const [commentUpdate, setCommentUpdate] = useState<string>('');
  const [validAppointment, SetValidAppointment] = useState<boolean>(true);
  const [appointmentUnique, setAppointmentUnique] = useState<IAppointment>();
  const [userAppointment, setUserAppointment] = useState<string>('');

  // Close Modal with background

  const handleParentsClick = () => {
    setShowModal(false);
  };

  const handleChildClick = (item: React.MouseEvent<HTMLElement, MouseEvent>) => {
    item.stopPropagation();
  };

  // Get One Appointment
  async function getAppointmentAndUser() {
    const oneAppointment = await appointment.getOne(appointmentId);
    setAppointmentUnique(oneAppointment);
    if (oneAppointment) {
      const userAppointment = await users.getOne(oneAppointment.userId);
      setUserAppointment(`${userAppointment.firstname} ${userAppointment.lastname}`);
    }
  }

  // Delete Appointment
  async function deleteAppointment(appointmentId: number) {
    try {
      const res = await appointment.delete(appointmentId);
      if (res) toast.success('Votre rendez-vous a bien été supprimé');
    } catch (err) {
      if (err) toast.error('Impossible de supprimer ce rendez-vous');
    }
  }

  let appointmentDate: Date = new Date(`${dayUpdate}T${hoursUpdate}:00.000Z`);

  // Update Appointment

  async function updateAppointment() {
    if (dayUpdate && hoursUpdate && commentUpdate && appointmentUnique?.userId) {
      try {
        const res =
          appointmentId &&
          (await appointment.put(appointmentId, {
            date: appointmentDate || appointmentUnique?.date,
            comment: commentUpdate || appointmentUnique?.comment,
            prosId: prosLoggedIn.id_pros!,
            userId: appointmentUnique?.userId,
            immat: appointmentUnique?.immat,
          }));
        if (res) {
          toast.success('Votre rendez-vous a bien été modifié');
          setChangeMode(false);
        }
      } catch (err) {
        console.log(err);
        if (err) toast.error('Impossible de modifier ce rendez-vous');
      }
    } else {
      toast.error('Veuillez remplir tous les champs!');
    }
  }

  const today: Date = new Date();

  // Check validity of appointment's date :

  const dateCompare = (today: Date, appointmentDate: Date) => {
    if (today < appointmentDate) {
      SetValidAppointment(true);
    } else {
      SetValidAppointment(false);
    }
  };

  useEffect(() => {
    getAppointmentAndUser();
    dateCompare(today, appointmentDate);
  }, [appointmentDate]);

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8 rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        {changeMode ? (
          <div className="flex flex-col items-center justify-around h-full">
            <h2 className={`m-2 ${h3} `}>Client :</h2>
            <p className="mb-6">{userAppointment}</p>
            <input
              className={`w-3/4 ${input}`}
              type="date"
              name="date"
              id="date"
              onChange={(e) => setDayUpdate(e.target.value)}
            />
            <input
              className={`w-3/4 ${input}`}
              type="time"
              name="time"
              id="time"
              placeholder="Choisissez une heure"
              onChange={(e) => setHoursUpdate(e.target.value)}
            />
            {validAppointment ? (
              ''
            ) : (
              <p className="text-red-700">
                {`La date sélectionnée est antérieure à aujourd'hui`}
              </p>
            )}
            <label htmlFor="details">Détails</label>
            <textarea
              className={`w-3/4 h-1/3 p-2 border rounded-md bg-primary-hovered border-primary outline-primary-focus lg:mb-2 lg:h-2/6';
            pl-0`}
              name="details"
              id="details"
              placeholder={appointmentUnique && appointmentUnique.comment}
              onChange={(e) => setCommentUpdate(e.target.value)}
            />
            <button className={`w-32 ${button}`} onClick={() => updateAppointment()}>
              Valider
            </button>
          </div>
        ) : (
          appointmentUnique && (
            <div className="flex flex-col items-center justify-around h-full">
              <h2 className={`${h3} `}>
                Le{' '}
                {new Date(appointmentUnique.date).toLocaleDateString() +
                  ' à ' +
                  new Date(appointmentUnique.date).toLocaleTimeString().slice(0, 5)}
              </h2>
              <h2 className={`m-2 ${h3} `}>Client :</h2>
              <p>{userAppointment}</p>
              <h2 className={`m-2 ${h3} `}>Description :</h2>
              <p className="mb-6">{appointmentUnique.comment}</p>
              <div className="flex mb-4">
                <button
                  className={`w-32 h-12 ${button}`}
                  onClick={() =>
                    !changeMode ? setChangeMode(!changeMode) : updateAppointment()
                  }>
                  {changeMode ? 'Valider' : 'Modifier'}
                </button>
                <button
                  className={`${deleteButton} w-32 mx-4 mt-2 px-4 p-2 h-12 bg-secondary hover:bg-secondary-hovered`}
                  onClick={() => deleteAppointment(appointmentId)}>
                  Supprimer
                </button>
              </div>
            </div>
          )
        )}
      </section>
    </main>
  );
}

export default ModalAppointment;
