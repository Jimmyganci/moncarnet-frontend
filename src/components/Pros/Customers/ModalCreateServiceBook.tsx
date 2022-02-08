import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import IAppointment from '../../../Interfaces/IAppointment';
import { service_book, appointment, users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import {
  button,
  glassMorphism,
  h3,
  input,
} from '../../../variableTailwind';

function ModalAppointment() {

  const { prosLoggedIn, setModalCreateServiceBook, appointmentId } = useContext(ProsContext);
  const [dayUpdate, setDayUpdate] = useState<string>('');
  const [serviceUpdate, setServiceUpdate] = useState<string>('');
  const [observationUpdate, setObservationUpdate] = useState<string>('');
  const [kilometrage, setKilometrage] = useState<number>(0);
  const [appointmentUnique, setAppointmentUnique] = useState<IAppointment>();
  const [userAppointment, setUserAppointment] = useState<string>('');

  // Close Modal with background

  const handleParentsClick = () => {
    setModalCreateServiceBook(false);
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
      setUserAppointment(`${userAppointment.lastname} ${userAppointment.firstname}`);
    }
  }

  useEffect(() => {
    getAppointmentAndUser();
  }, [])

// Create ServiceBook
  async function createServiceBook() {
    if (dayUpdate && serviceUpdate && observationUpdate && kilometrage && prosLoggedIn.id_user && appointmentUnique && appointmentUnique.immat ) {
      try {
        const res =
        prosLoggedIn &&
          (await service_book.post({
            date: new Date(dayUpdate),
            service: serviceUpdate,
            observations: observationUpdate,
            id_pros: prosLoggedIn.id_user,
            immat_vehicule: appointmentUnique.immat,
            kilometrage : kilometrage,
            url_invoice: "",
          }));
        if (res) {
            console.log('success')
          toast.success('Votre entretien a bien été enregistré');
        }
      } catch (err) {
        console.log(err);
        if (err) toast.error('Impossible de créer cet entretien');
      }
    } else {
        console.log('echec')
      toast.error('Veuillez remplir tous les champs!');
    }
  }  

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <form className={`m-16 p-8 rounded-lg w-4/6 flex flex-col items-center justify-around ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
       <h2 className={`m-2 ${h3} `}>Client :</h2>
       <p>{userAppointment}</p>
       <h2 className={`m-2 ${h3} `}>Immatriculation du véhicule :</h2>
       <p>{appointmentUnique && appointmentUnique.immat}</p>
       <label htmlFor="kilometrage">Kilométrage</label>
       <input
        className={`w-3/4 ${input}`}
        type="text"
        name="kilometrage"
        id="kilometrage"
        onChange={(e) => setKilometrage(parseInt(e.target.value))}
        />
        <label htmlFor="date">Date des travaux</label>
       <input
        className={`w-3/4 ${input}`}
        type="date"
        name="date"
        id="date"
        onChange={(e) => setDayUpdate(e.target.value)}
        />
       <label htmlFor="service">Service</label>
       <input
        className={`w-3/4 ${input}`}
        type="text"
        name="service"
        id="service"
        placeholder="Renseignez le service effectué"
        onChange={(e) => setServiceUpdate(e.target.value)}
        />
        <label htmlFor="Observations">Observations</label>
       <textarea
        className={`w-3/4 h-1/3 p-2 border rounded-md bg-primary-hovered border-primary outline-primary-focus lg:mb-2 lg:h-2/6';
        pl-0`}
        name="Observations"
        id="Observations"
        placeholder="Description des travaux effectués"
        onChange={(e) => setObservationUpdate(e.target.value)}
        />
        <button type='submit' className={`w-32 h-12 ${button}`} onClick={() => createServiceBook()}>Valider</button>
      </form>
    </main>
  )
}

export default ModalAppointment;