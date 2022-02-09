import React, { useContext, useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { appointment, service_book, users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IAppointment from '../../../Interfaces/IAppointment';
import { button, glassMorphism, h3, input } from '../../../variableTailwind';

function ModalAppointment() {
  const { prosLoggedIn, setModalCreateServiceBook, appointmentId } =
    useContext(ProsContext);
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
  }, []);

  // Create ServiceBook
  async function createServiceBook() {
    if (
      dayUpdate &&
      serviceUpdate &&
      observationUpdate &&
      kilometrage &&
      prosLoggedIn.id_user &&
      appointmentUnique &&
      appointmentUnique.immat
    ) {
      try {
        const res =
          prosLoggedIn &&
          (await service_book.post({
            date: new Date(dayUpdate),
            service: serviceUpdate,
            observations: observationUpdate,
            id_pros: prosLoggedIn.id_user,
            immat_vehicule: appointmentUnique.immat,
            kilometrage: kilometrage,
            url_invoice: '',
          }));
        if (res) {
          console.log('success');
          toast.success('Votre entretien a bien été enregistré');
        }
      } catch (err) {
        console.log(err);
        if (err) toast.error('Impossible de créer cet entretien');
      }
    } else {
      console.log('echec');
      toast.error('Veuillez remplir tous les champs!');
    }
  }

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <form
        className={`m-16 p-8 rounded-lg w-4/6 flex flex-col items-center ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        <div className="flex flex-col items-center w-full overflow-auto h-5/6">
          <h2 className={`m-2 ${h3} `}>Client :</h2>
          <p>{userAppointment}</p>
          <h2 className={`m-2 ${h3} `}>Immatriculation du véhicule :</h2>
          <p>{appointmentUnique && appointmentUnique.immat}</p>
          <label htmlFor="kilometrage" className={`m-2 ${h3} `}>
            Kilométrage
          </label>
          <input
            className={`w-3/4 ${input}`}
            type="text"
            name="kilometrage"
            id="kilometrage"
            required
            onChange={(e) => setKilometrage(parseInt(e.target.value))}
          />
          <label htmlFor="date" className={`m-2 ${h3}`}>
            Date des travaux
          </label>
          <input
            className={`w-3/4 ${input} py-6`}
            type="date"
            name="date"
            id="date"
            required
            onChange={(e) => setDayUpdate(e.target.value)}
          />
          <label htmlFor="service" className={`m-2 ${h3} `}>
            Service
          </label>
          <input
            className={`w-3/4 ${input}`}
            type="text"
            name="service"
            id="service"
            required
            placeholder="Renseignez le service effectué"
            onChange={(e) => setServiceUpdate(e.target.value)}
          />
          <label htmlFor="Observations" className={`m-2 ${h3}`}>
            Observations
          </label>
          <textarea
            className={`w-3/4 p-2 border rounded-md bg-primary-hovered border-primary outline-primary-focus pb-20 text`}
            name="Observations"
            id="Observations"
            required
            placeholder="Description des travaux effectués"
            onChange={(e) => setObservationUpdate(e.target.value)}
          />
        </div>
        <div className="flex item h-1/6">
          <button
            type="submit"
            className={`w-32 h-12 ${button}`}
            onClick={() => createServiceBook()}>
            Valider
          </button>
        </div>
      </form>
    </main>
  );
}

export default ModalAppointment;
