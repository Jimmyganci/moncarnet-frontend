import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { service_book } from '../../../API/request';
import ServiceBookInfos from '../../../Interfaces/IServiceBook';
import { glassMorphism } from '../../../variableTailwind';
import ModalInfos from '../Appointment/ModalInfos';
import ServiceBookDetailsCard from './ServiceBookDetailsCard';

type DetailsParams = {
  immat: string;
};

function ServiceBookDetails() {
  const [serviceBookList, setServiceBookList] = useState<ServiceBookInfos[]>();

  const [showPros, setShowPros] = useState(false);
  const [prosId, setProsId] = useState<number>(0);

  const { immat } = useParams<DetailsParams>();

  async function getServiceBook() {
    const res = await service_book.getServiceBookVehicule(String(immat));
    setServiceBookList(res);
  }
  useEffect(() => {
    getServiceBook();
  }, []);
  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">{`Carnet d'entretien`}</h1>
          <h2 className="text-xl font-bold">{immat}</h2>
        </div>
        <div className={`rounded-lg mt-4 ${glassMorphism}`}>
          <div className={`grid grid-cols-7 ${glassMorphism} pt-2 pb-2 rounded-lg`}>
            <p>Vehicule</p>
            <p>Date</p>
            <p>Observations</p>
            <p>Service</p>
            <p>Kilometrage</p>
            <p>Facture</p>
            <p>Professionnel</p>
          </div>
          <div>
            {serviceBookList?.map((serviceBook) => (
              <ServiceBookDetailsCard
                key={serviceBook.id_service_book}
                serviceBook={serviceBook}
                setShowPros={setShowPros}
                setProsId={setProsId}
              />
            ))}
          </div>
        </div>
        <ModalInfos showPros={showPros} setShowPros={setShowPros} prosId={prosId} />
      </div>
    </div>
  );
}

export default ServiceBookDetails;
