import React, { useContext, useEffect, useState } from 'react';
import { service_book } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IServiceBook from '../../../Interfaces/IServiceBook';
import ServiceBookDisplay from './ServiceBookDisplay';
import { glassMorphism, button, h2 } from '../../../variableTailwind';

function ModalServiceBook() {

    const { immatServiceBook, setShowModalServiceBook, setShowCustomer } = useContext(ProsContext);

    const [serviceBooks, setServiceBooks] = useState<IServiceBook[]>([]);

  // Close Modal with background

  const handleParentsClick = () => {
    setShowModalServiceBook(false);
  };

  const handleChildClick = (item: React.MouseEvent<HTMLElement, MouseEvent>) => {
    item.stopPropagation();
  };

  // Get Service Book

  async function getServiceBooks (immat: string) {
    const serviceBooks = await service_book.getServiceBookVehicule(immat);
    immatServiceBook && setServiceBooks(serviceBooks);
 };

 useEffect(() => {
    immatServiceBook && getServiceBooks(immatServiceBook);    
 }, [immatServiceBook]);

 // Return Button 

 const handleSwitchModal = () => {
  setShowCustomer(true);
  setShowModalServiceBook(false);  
 }

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8  rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        <div className='flex flex-col justify-around items-center h-5/6 w-full overflow-auto'>
          {serviceBooks.length ? 
          serviceBooks.map((serviceBook, index) => (
              <ServiceBookDisplay 
                  id_service_book={serviceBook.id_service_book}
                  date={serviceBook.date}
                  service={serviceBook.service}
                  observations={serviceBook.observations}
                  kilometrage={serviceBook.kilometrage}
                  url_invoice={serviceBook.url_invoice}
                  id_pros={serviceBook.id_pros}
                  immat_vehicule={serviceBook.immat_vehicule}
                  key={index}
              />
          ))
          :
          <div className='flex flex-col justify-around items-center'>
            <p className={`${h2}`}>Ce véhicule ne possède pas encore d'entretien</p>
          </div>
          }
        </div>
        <button className={`${button}`} onClick={() => handleSwitchModal()}>Retour</button>
      </section>
    </main>
  );
}

export default ModalServiceBook;
