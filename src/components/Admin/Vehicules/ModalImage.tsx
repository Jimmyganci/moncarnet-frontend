import React from 'react';

import { button } from '../../../variableTailwind';

interface IProps {
  url: string;
  showModalImage: boolean;
  setShowModalImage: React.Dispatch<React.SetStateAction<boolean>>;
}

function ModalImage({ url, showModalImage, setShowModalImage }: IProps) {
  return (
    <>
      {showModalImage && (
        <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full h-full p-4 backdrop-filter backdrop-blur-xl">
          <img className="w-1/4" src={url} alt="greenCard" />
          <button onClick={() => setShowModalImage(false)} className={`${button}`}>
            Fermer
          </button>
        </div>
      )}
    </>
  );
}

export default ModalImage;
