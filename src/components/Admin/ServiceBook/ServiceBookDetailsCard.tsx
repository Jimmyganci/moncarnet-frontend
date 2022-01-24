import React, { useEffect } from 'react';

import { pros } from '../../../API/request';
import ProsInfos from '../../../Interfaces/IPros';
import ServiceBookInfos from '../../../Interfaces/IServiceBook';

type CardProps = {
  serviceBook: ServiceBookInfos;
  setShowPros: Function;
  setProsData: Function;
  prosData?: ProsInfos;
};

function ServiceBookDetailsCard({
  serviceBook,
  setShowPros,
  setProsData,
  prosData,
}: CardProps) {
  async function getPros() {
    const res = await pros.getOne(serviceBook.id_pros);
    setProsData(res);
  }

  useEffect(() => {
    getPros();
  }, []);

  return (
    <div className="grid grid-cols-6 pt-2 pb-2 hover:bg-background/30">
      <p>{new Date(serviceBook.date).toLocaleDateString()}</p>
      <p>{serviceBook.observations}</p>
      <p>{serviceBook.service}</p>
      <p>{serviceBook.kilometrage}</p>
      <p>{serviceBook.url_invoice}</p>
      <button
        onClick={() => setShowPros(true)}
        className="underline hover:text-background">
        {prosData?.name}
      </button>
    </div>
  );
}

export default ServiceBookDetailsCard;
