import React, { useEffect, useState } from 'react';

import { pros } from '../../API/request';
import IPros from '../../Interfaces/IPros';

function ProsAppointment({ prosId }: { prosId: number }) {
  const [prosData, setProsData] = useState<IPros>();

  async function getPros() {
    const res = await pros.getOne(prosId);
    setProsData(res);
  }
  useEffect(() => {
    getPros();
  }, []);
  return <span className="text-xl font-medium underline">{prosData?.name}</span>;
}

export default ProsAppointment;
