import React, { useContext, useEffect, useState } from 'react';
import { users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IUser from '../../../Interfaces/IUser';
import IVehicule from '../../../Interfaces/IVehicule';
import { toast } from 'react-toastify';

import {
  button,
  glassMorphism,
  h2,
} from '../../../variableTailwind';

const CUSTOMER_EMPTY = {
    id_user: 0,
  firstname: '',
  lastname: '',
  email: '',
  password: '',
  address: '',
  phone: '',
  postal_code: 0,
  city: '',
  active: true,
  userName: '',
  };

function ModalCustomer() {

    const { setShowModalServiceBook, setShowCustomer, searchCustomer, userArray, setImmatServiceBook, immatServiceBook } = useContext(ProsContext);

    const [customer, setCustomer] = useState<IUser>(CUSTOMER_EMPTY);   
    const [vehicules, setVehicules] = useState<IVehicule[]>([]);    

  // Close Modal with background

  const handleParentsClick = () => {
    setShowCustomer(false);
  };

  const handleChildClick = (item: React.MouseEvent<HTMLElement, MouseEvent>) => {
    item.stopPropagation();
  };

  // Get the Customer

  const getOneUser = () => {
     const searchArray = searchCustomer.split(' ');
     setCustomer(userArray.filter((user) => user.firstname === searchArray[0] && user.lastname === searchArray[1])[0]);
  }

  useEffect(() => {
    getOneUser();
  }, [])

  // Get Vehicules

  async function getVehicules () {
    const vehicules = await users.getVehicules(customer.id_user || 0);
    customer && setVehicules(vehicules);
 };

 useEffect(() => {
    customer && getVehicules();
 }, [customer]); 

 // Switch Modal

 const handleSwitchModal = () => {
   if (!immatServiceBook) {           
    toast.error("Veuillez sélectionner un véhicule")
   } else {
    setShowModalServiceBook(true);
    setShowCustomer(false);
   }  
  } 
  
  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8 flex flex-col justify-around items-center rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
            <p>{customer.firstname + ' ' + customer.lastname}</p>
            <p>{customer.address}</p>
            <p>{customer.postal_code}</p>
            <p>{customer.city}</p>
            <p>{customer.phone}</p>
            <p>{customer.email}</p>
            <h2 className={`${h2}`}>Véhicules</h2>
        <select name="immat" id="immat" onChange={(e) => setImmatServiceBook(e.target.value)}>
            <option value="0">Choisir un véhicule</option>
            {vehicules.map((vehicule, index) => (
                <option key={index} value={vehicule.immat}>{vehicule.immat}</option>
            ))}
        </select>
        <button className={`${button}`} onClick={() => handleSwitchModal() }>Voir les entretiens</button>
      </section>
    </main>
  );
}

export default ModalCustomer;
