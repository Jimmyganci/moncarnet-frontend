import React, { useContext, useState } from 'react';
import axios from 'axios';
import { glassMorphism, h3, button, deleteButton } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';
import InfosLine from '../../InfosLine';

interface InfosRdv {
  date: string;
  user: string;
  comment: string;
  id_appointment: number;
}

const ModalAppointment = ({ date, user, comment, id_appointment }: InfosRdv) => {

  const { setShowModal } : any = useContext(ProsContext);
  const [changeMode, setChangeMode] = useState(false);
  const [dateUpdate, setDateUpdate] = useState("");
  const [userUpdate, setUserUpdate] = useState("");
  const [commentUpdate, setCommentUpdate] = useState("");

  // Close Modal with background

      const handleParentsClick = () => {
        setShowModal(false)
    };

    const handleChildClick = (item : any) => {
        item.stopPropagation(item);
    };

      // Delete Appointment

      const [deleteRdvStatus, setDeleteRdvStatus] = useState(0);

    const deleteAppointment = () => {
       axios
          .delete(`http://localhost:8000/api/appointment/${id_appointment}`, { withCredentials: true })
          .then((res) => res.status)
          .then((el) => setDeleteRdvStatus(el))
          .catch(() => setDeleteRdvStatus(500));
          setTimeout(() => location.reload(), 1500); 
        }

      // Update Appointment
      
      const handleInfosUser = () => {
        updateAppointment();
        setChangeMode(!changeMode);
      };

      "2022-01-07T00:00:00.000Z"

      async function updateAppointment () {
        try {
          const res = await axios.put(`http://localhost:8000/api/appointment/${id_appointment}`,
          { date: dateUpdate || date,
            comment: commentUpdate || comment,
            user: userUpdate || user,
          }, {
            withCredentials: true,
          });
          location.reload();
        } catch (err) {
          console.log(err);
        }
      };


  return (
    <main className='fixed inset-0 z-10 h-screen w-screen flex justify-center align-middle' onClick={() => handleParentsClick() }> 
      <section className={`m-16 p-8 flex flex-col justify-around items-center rounded-lg w-4/6 ${glassMorphism}`} onClick={(e) => handleChildClick(e)}>
          <InfosLine className={`${h3} `} champ={"date"} lineName={`Le : ${date}`} changeMode={changeMode} setChangeMode={setChangeMode} modif={dateUpdate} setModif={setDateUpdate} />

          <h2 className={`m-2 ${h3} `}>Client :</h2>
          <InfosLine champ={"user"} lineName={user} changeMode={changeMode} setChangeMode={setChangeMode} modif={userUpdate} setModif={setUserUpdate} />
          <h2 className={`m-2 ${h3} `}>Description :</h2>
          <p className='mb-6'>{comment}</p>
          <div className='flex mb-4'>
          <button className={`w-1/6 ${button}`} onClick={() => !changeMode ? setChangeMode(!changeMode) : updateAppointment()}>{changeMode ? "Valider" : "Modifier"}</button>
            <button className={`${deleteButton} w-32 mx-4 mt-2 px-4 p-2 h-12 bg-secondary hover:bg-secondary-hovered`} onClick={() => deleteAppointment()}>Supprimer</button>
          </div>
          {
            deleteRdvStatus === 200 && <p className='text-green-700'>Votre rendez-vous a bien été supprimé</p>
          }
          {
            deleteRdvStatus === 500 && <p className='text-red-500'>Impossible de supprimer ce rendez-vous</p>
          }          
      </section>
    </main>
  );
}

export default ModalAppointment;
