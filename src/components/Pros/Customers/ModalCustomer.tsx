import React, { useContext, useEffect, useState } from 'react';
import { users } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IUser from '../../../Interfaces/IUser';
import IVehicule from '../../../Interfaces/IVehicule';
import { toast } from 'react-toastify';

import {
  button,
  glassMorphism,
  h4,
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
        className={`m-16 p-8 flex flex-col items-center justify-around rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
          <div>
            <p className={`${h4} my-2`}>{customer.firstname + ' ' + customer.lastname}</p>
            <p className='my-2'>{customer.address}</p>
            <p className='my-2'>{customer.postal_code}</p>
            <p className='my-2'>{customer.city}</p>
            <p className='my-2'>{customer.phone}</p>
            <p className='my-2'>{customer.email}</p>
          </div>
          <div>
          <h4 className={`${h4}`}>Véhicules</h4>
        <select name="immat" id="immat" onChange={(e) => setImmatServiceBook(e.target.value)}>
            <option value="0">Choisir un véhicule</option>
            {vehicules.map((vehicule, index) => (
                <option key={index} value={vehicule.immat}>{vehicule.immat}</option>
            ))}
        </select>
        </div>
        <button className={`${button}`} onClick={() => handleSwitchModal() }>Voir les entretiens</button>
      </section>
    </main>
  );
}

export default ModalCustomer;
