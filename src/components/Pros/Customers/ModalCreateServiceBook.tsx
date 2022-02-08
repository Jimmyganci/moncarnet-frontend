import React, { useContext, useEffect, useState } from 'react';
import { service_book } from '../../../API/request';
import ProsContext from '../../../contexts/ProsContext';
import IServiceBook from '../../../Interfaces/IServiceBook';
import { glassMorphism, button, h2 } from '../../../variableTailwind';

function ModalCreateServiceBook() {

    const { immatServiceBook, setModalCreateServiceBook } = useContext(ProsContext);

    const [serviceBooks, setServiceBooks] = useState<IServiceBook[]>([]);

  // Close Modal with background

  const handleParentsClick = () => {
    setModalCreateServiceBook(false);
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

  return (
    <main
      className="fixed inset-0 z-10 flex justify-center w-screen h-screen align-middle"
      onClick={() => handleParentsClick()}
      role="presentation">
      <section
        className={`m-16 p-8  rounded-lg w-4/6 ${glassMorphism}`}
        onClick={(e) => handleChildClick(e)}
        role="presentation">
        
        <button className={`${button}`} onClick={() => setModalCreateServiceBook(false)}>Retour</button>
      </section>
    </main>
  );
}

export default ModalCreateServiceBook;
