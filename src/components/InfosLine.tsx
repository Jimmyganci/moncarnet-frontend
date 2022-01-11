import React, { useState } from 'react';
import { input } from '../variableTailwind';

const InfosLine = (props: any) => {
    const { lineName, champ, changeMode, modif, setModif } = props;
    const [lineChangeMode, setLineChangeMode] = useState(false);
    
    return (
            <div className={`h-10 w-full rounded-xl my-1 flex justify-center items-center`}>
               <label className='w-full h-full max-w-2xl mx-2 flex justify-center items-center'>
                  <p className={`${lineChangeMode && changeMode? "hidden w-full" : ""} ${changeMode? "cursor-pointer opacity-50" : ""} p-2 mb-4 text-center truncate overflow-hidden border rounded-md h-full w-5/6 bg-slate-50/75 hover:h-fit hover:overflow-visible hover:whitespace-pre-wrap`}>
                 {modif || lineName}</p>
                  <input autoFocus className={`${!lineChangeMode || !changeMode? "hidden" : ""} ${input} w-5/6 h-full bg-slate-50/75 truncate overflow-hidden`}
                  type="text"
                  name={lineName}
                  id={lineName}
                  value={modif}
                  pattern="[A-Za-z]{2}-[0-9]{3}-[A-Za-z]{2}"
                  placeholder={`modifier votre ${champ}`}
                  onChange={(e) => setModif(e.target.value)}
                  onClick={() => {(changeMode && !lineChangeMode)? setLineChangeMode(!lineChangeMode) : ""}}
                  required
                  ></input>
               </label>
            </div>
    );
};

export default InfosLine;