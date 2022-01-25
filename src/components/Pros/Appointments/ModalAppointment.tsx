import React, { useContext } from 'react';
import { glassMorphism, h2 } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';

interface InfosRdv {
  date: string;
  user: string;
  comment: string;
}

const ModalAppointment = ({ date, user, comment }: InfosRdv) => {

  const { setShowModal } : any = useContext(ProsContext);

      const handleParentsClick = () => {
        setShowModal(false)
    };

    const handleChildClick = (item : any) => {
        item.stopPropagation(item);
    };

  return (
    <main className='fixed inset-0 z-10 h-screen w-screen' onClick={() => handleParentsClick() }> 
      <section className={`m-16 p-8 flex flex-col justify-around items-center rounded-lg ${glassMorphism}`} onClick={(e) => handleChildClick(e)}>
          <h2 className={`p-8 m-4 ${h2} `}>Le {date}</h2>
          <h2 className={`p-8 m-2 ${h2} `}>Client :</h2>
          <p>{user}</p>
          <h2 className={`p-8 m-2 ${h2} `}>Description :</h2>
          <p className='mb-6'>{comment}</p> 
      </section>
    </main>
  );
}

export default ModalAppointment;
