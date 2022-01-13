import React, { useContext,useEffect,useState } from 'react';
import { h1, input } from '../../../variableTailwind';
import ProsContext from '../../../contexts/ProsContext';
import axios from 'axios';


function CreateAppointments() {

  const { prosLogin }: any = useContext(ProsContext);
  const [customer, setCustomer] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [details, setDetails] = useState('');
  const [message, setMessage] = useState('');
  const [customersList, setCustomersList]: Array<any> = useState([]);
  const [chosenCustomer, setChosenCustomer] = useState('');
  let appointmentDate = `${date}T${time}:00.000Z`;

  // Looking for customers in database

  useEffect(() => {
    prosLogin.id_user && axios
    .get(
      `http://localhost:8000/api/pros/${prosLogin.id_user}/users`,
      { withCredentials: true },
    )
    .then((res) => res.data)
    .then((data) => setCustomersList(data))
  }, [prosLogin]);

  // Create rdv in database

  const handleCreateRdv = (e: React.FormEvent) => {
    e.preventDefault();
    if (details && date && chosenCustomer && prosLogin) {
      axios
        .post(
          'http://localhost:8000/api/appointment',
          {
            userId: parseInt(chosenCustomer),
            prosId: prosLogin.id_user,
            date: appointmentDate,
            comment: details
          },
          { withCredentials: true },
        )
        .then((res) => {
          res.data;
          setMessage('Rendez-vous créé')
        })
        
        .catch((err) => {
         console.log(err)
        });
    } else {
      setMessage('Veuillez remplir les champs.');
    }
  };

  return (
    <div className="h-full w-full">
      <h1 className={`${h1}`}>
      Créer un RDV
      </h1>
      <form
          className="flex flex-col items-center w-full h-5/6 justify-around"
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
          <select name="customer" id="client" onChange={(e) => setChosenCustomer(e.target.value)}>
            <option defaultValue={""}>Aucun client sélectionné</option>
            {customersList.filter(e => e.lastname.toLowerCase().includes(customer.toLowerCase()))
              .map((client: any)=> 
              <option value={client.id_user} key={client.id_user}>{client.lastname} {client.firstname}</option>)}
          </select>
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
          <label htmlFor="details">Détails</label>
          <input
            className={`w-3/4 ${input}`}
            type="text"
            name="details"
            id="details"
            placeholder="Détails"
            onChange={(e) => setDetails(e.target.value)}
          />
          <p className="text-error-600">{message}</p>
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
