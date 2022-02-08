import React, { useContext, useEffect, useState } from 'react';

import { service_book } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IServiceBook from '../../../Interfaces/IServiceBook';
import { button, glassMorphism, h2 } from '../../../variableTailwind';
import ServiceBookDisplay from './ServiceBookDisplay';

function ModalServiceBook() {
  const {
    immatServiceBook,
    setShowModalServiceBook,
    setShowCustomer,
    setImmatServiceBook,
  } = useContext(ProsContext);

  const [serviceBooks, setServiceBooks] = useState<IServiceBook[]>([]);

  // Close Modal with background

  const handleParentsClick = () => {
    setShowModalServiceBook(false);
    setImmatServiceBook('');
  };

  const handleChildClick = (item: React.MouseEvent<HTMLElement, MouseEvent>) => {
    item.stopPropagation();
  };

  // Get Service Book

  async function getServiceBooks(immat: string) {
    const serviceBooks = await service_book.getServiceBookVehicule(immat);
    immatServiceBook && setServiceBooks(serviceBooks);
  }

  useEffect(() => {
    immatServiceBook && getServiceBooks(immatServiceBook);
  }, [immatServiceBook]);

  // Return Button

  const handleSwitchModal = () => {
    setShowCustomer(true);
    setShowModalServiceBook(false);
    setImmatServiceBook('');
  };

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8  rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        <div className="flex flex-col items-center w-full overflow-auto h-5/6">
          {serviceBooks.length ? (
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
          ) : (
            <div className="flex flex-col items-center justify-around">
              <p className={`${h2}`}>{`Ce véhicule ne possède pas encore d'entretien`}</p>
            </div>
          )}
        </div>
        <div className="flex items-center justify-center h-1/6">
          <button className={`${button}`} onClick={() => handleSwitchModal()}>
            Retour
          </button>
        </div>
      </section>
    </main>
  );
}

export default ModalServiceBook;
