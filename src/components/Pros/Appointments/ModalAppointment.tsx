import React, { useContext, useState, useEffect } from 'react';
import axios from 'axios';
import {
  glassMorphism,
  h3,
  button,
  deleteButton,
  input,
} from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';

interface InfosRdv {
  date: string;
  user: string;
  comment: string;
  id_appointment: number;
  immat: string;
}

const ModalAppointment = ({ date, user, comment, id_appointment, immat }: InfosRdv) => {

  const { setShowModal } : any = useContext(ProsContext);
  const [changeMode, setChangeMode] = useState(false);
  const [dayUpdate, setDayUpdate] = useState('');
  const [hoursUpdate, setHoursUpdate] = useState('');
  const [message, setMessage] = useState(0);
  const [commentUpdate, setCommentUpdate] = useState('');
  const [valideRdv, setValivRdv] = useState(true);

  // Close Modal with background

  const handleParentsClick = () => {
    setShowModal(false);
  };

  const handleChildClick = (item: any) => {
    item.stopPropagation(item);
  };

  // Delete Appointment

  let appointmentDate = `${dayUpdate}T${hoursUpdate}:00.000Z`;

  const [deleteRdvStatus, setDeleteRdvStatus] = useState(0);

    const deleteAppointment = () => {
       axios
          .delete(`http://localhost:8000/api/appointments/${id_appointment}`, { withCredentials: true })
          .then((res) => res.status)
          .then((el) => setDeleteRdvStatus(el))
          .catch(() => setDeleteRdvStatus(500));
          setTimeout(() => location.reload(), 1500); 
        }

  // Update Appointment

      async function updateAppointment () {
        try {
          const res = await axios.put(`http://localhost:8000/api/appointments/${id_appointment}`,
          { date: appointmentDate || date,
            comment: commentUpdate || comment,
            immat: immat,
            user: user,
          },
          {
            withCredentials: true,
          },
        )
        .then((res) => setMessage(res.status))
        .then(() => {
          setTimeout(() => {
            location.reload();
            setChangeMode(false);
          }, 1500);
        });
    } catch (err) {
      console.log(err);
      setMessage(500);
    }
  }

  let today = new Date().toISOString();

  // Check validity of rdv's date :

  const dateCompare = (today: string, appointmentDate: string) => {
    if (today < appointmentDate) {
      setValivRdv(true);
    } else {
      setValivRdv(false);
    }
  };

  useEffect(() => {
    dateCompare(today, appointmentDate);
  }, [appointmentDate]);

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
    >
      <section
        className={`m-16 p-8 rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
      >
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
            {valideRdv ? (
              ''
            ) : (
              <p className="text-red-700">
                La date sélectionnée est antérieure à aujourd'hui
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
            {message === 200 && (
              <p className="text-green-700">Votre rendez-vous a bien été modifié</p>
            )}
            {message === 500 && (
              <p className="text-red-500">Impossible de modifier ce rendez-vous</p>
            )}
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
                }
              >
                {changeMode ? 'Valider' : 'Modifier'}
              </button>
              <button
                className={`${deleteButton} w-32 mx-4 mt-2 px-4 p-2 h-12 bg-secondary hover:bg-secondary-hovered`}
                onClick={() => deleteAppointment()}
              >
                Supprimer
              </button>
            </div>
            {deleteRdvStatus === 200 && (
              <p className="text-green-700">Votre rendez-vous a bien été supprimé</p>
            )}
            {deleteRdvStatus === 500 && (
              <p className="text-red-500">Impossible de supprimer ce rendez-vous</p>
            )}
          </div>
        )}
      </section>
    </main>
  );
};

export default ModalAppointment;
