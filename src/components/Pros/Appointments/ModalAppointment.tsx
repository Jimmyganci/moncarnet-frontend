import React, { useContext, useState } from 'react';
import axios from 'axios';
import { glassMorphism, h3, button, deleteButton } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';

interface InfosRdv {
  date: string;
  user: string;
  comment: string;
  id_appointment: number;
}

const ModalAppointment = ({ date, user, comment, id_appointment }: InfosRdv) => {

  const { setShowModal } : any = useContext(ProsContext); 

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


  return (
    <main className='fixed inset-0 z-10 h-screen w-screen flex justify-center align-middle' onClick={() => handleParentsClick() }> 
      <section className={`m-16 p-8 flex flex-col justify-around items-center rounded-lg w-4/6 ${glassMorphism}`} onClick={(e) => handleChildClick(e)}>
          <h2 className={`${h3} `}>Le {date}</h2>
          <h2 className={`m-2 ${h3} `}>Client :</h2>
          <p>{user}</p>
          <h2 className={`m-2 ${h3} `}>Description :</h2>
          <p className='mb-6'>{comment}</p>
          <div className='flex mb-4'>
            <button className={`${button} mx-4 h-12 w-32`}>Modifier</button>
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
