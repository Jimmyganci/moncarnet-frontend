import React, { useContext, useEffect, useState } from 'react';
import { service_book } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IServiceBook from '../../../Interfaces/IServiceBook';
import ServiceBookDisplay from './ServiceBookDisplay';
import { glassMorphism } from '../../../variableTailwind';

function ModalServiceBook() {

    const { immatServiceBook, setShowModalServiceBook } = useContext(ProsContext);

    // const [customer, setCustomer] = useState<IUser>(CUSTOMER_EMPTY);   
    const [serviceBooks, setServiceBooks] = useState<IServiceBook[]>([]);

    console.log(serviceBooks);

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
 }, []);
  
  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8 flex flex-col justify-around items-center rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        {serviceBooks.length && serviceBooks.map((serviceBook, index) => (
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
        ))}
      </section>
    </main>
  );
}

export default ModalServiceBook;
