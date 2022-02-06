import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { appointment } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import {
  button,
  deleteButton,
  glassMorphism,
  h3,
  input,
} from '../../../variableTailwind';

const ModalAppointment = ({
  date,
  user,
  comment,
  id_appointment,
  immat,
  userId,
}: IAppointment) => {

  const { setShowModal, prosLoggedIn } = useContext(ProsContext);
  const [changeMode, setChangeMode] = useState<boolean>(false);
  const [dayUpdate, setDayUpdate] = useState<string>('');
  const [hoursUpdate, setHoursUpdate] = useState<string>('');
  const [commentUpdate, setCommentUpdate] = useState<string>('');
  const [validAppointment, SetValidAppointment] = useState<boolean>(true);

  // Close Modal with background

  const handleParentsClick = () => {
    setShowModal(false);
  };

  const handleChildClick = (item : React.MouseEvent<HTMLElement, MouseEvent>) => {
    item.stopPropagation();
  };

  // Delete Appointment

  let appointmentDate: Date = new Date(`${dayUpdate}T${hoursUpdate}:00.000Z`);

  async function deleteAppointment() {
    try {
      const res = id_appointment && await appointment.delete(id_appointment);
      setTimeout(() => location.reload(), 1500);
      if (res) toast.success('Votre rendez-vous a bien été supprimé');
    } catch (err) {
      if (err) toast.error('Impossible de supprimer ce rendez-vous');
    }
  }

  // Update Appointment

  async function updateAppointment() {
    if (dayUpdate && hoursUpdate && commentUpdate && userId) {
      try {
        const res = id_appointment && await appointment.put(id_appointment, {
          date: appointmentDate || date,
          comment: commentUpdate || comment,
          prosId: prosLoggedIn.id_pros!,
          userId: userId,
          immat: immat,
        });
        if (res) {
          toast.success('Votre rendez-vous a bien été modifié');
          setTimeout(() => {
            location.reload();
            setChangeMode(false);
          }, 1500);
        }
      } catch (err) {
        console.log(err);
        if (err) toast.error('Impossible de modifier ce rendez-vous');
      }
    } else {
      toast.error('Veuillez remplir tous les champs!');
    }
  }

  const today : Date = new Date();

  // Check validity of appointment's date :

  const dateCompare = (today: Date, appointmentDate: Date) => {
    if (today < appointmentDate) {
      SetValidAppointment(true);
    } else {
      SetValidAppointment(false);
    }
  };

  useEffect(() => {
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
            <p className="mb-6">{user}</p>
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
              placeholder={comment}
              onChange={(e) => setCommentUpdate(e.target.value)}
            />
            <button className={`w-32 ${button}`} onClick={() => updateAppointment()}>
              Valider
            </button>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-around h-full">
            <h2 className={`${h3} `}>Le {date}</h2>
            <h2 className={`m-2 ${h3} `}>Client :</h2>
            <p>{user}</p>
            <h2 className={`m-2 ${h3} `}>Description :</h2>
            <p className="mb-6">{comment}</p>
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
                onClick={() => deleteAppointment()}>
                Supprimer
              </button>
            </div>
          </div>
        )}
      </section>
    </main>
  );
};

export default ModalAppointment;
