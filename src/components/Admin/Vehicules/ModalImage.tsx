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
        <div className="fixed top-0 left-0 flex flex-col items-center justify-center w-full max-h-full p-4 overflow-y-scroll backdrop-filter backdrop-blur-xl">
          <img src={url} alt="greenCard" />
          <button onClick={() => setShowModalImage(false)} className={`${button}`}>
            Fermer
          </button>
        </div>
      )}
    </>
  );
}

export default ModalImage;
