import React from 'react';

import { glassMorphism } from '../../../variableTailwind';

function CountServiceBook({ serviceBook }: { serviceBook: number }) {
  return (
    <div
      className={`flex flex-col items-center justify-between flex-1 p-4 rounded-lg ${glassMorphism}`}>
      <p>Depuis le début de votre histoire</p>
      <p className={`${glassMorphism} mt-2 mb-2 p-4 rounded-lg text-primary text-2xl`}>
        {serviceBook}
      </p>
      <p>{`carnet ${serviceBook > 1 ? 'ont' : 'a'}  été complété(s)!!`}</p>
    </div>
  );
}

export default CountServiceBook;
