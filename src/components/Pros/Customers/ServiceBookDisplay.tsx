import React from "react";
import { glassMorphism, h4 } from '../../../variableTailwind';
import IServiceBook from '../../../Interfaces/IServiceBook';


type Props = IServiceBook;

const ServiceBookDisplay: React.FC<Props>  = (props) => {

    return (
        <div className={`${glassMorphism} h-auto flex flex-col p-4 w-5/6 my-3 rounded-lg`}>
            <p className={`${h4}`}>Date : {new Date(props.date).toLocaleDateString()}</p>
            <p className={`${h4}`}>Kilométrage : {props.kilometrage}</p>
            <h4 className={`${h4}`}>Type d'entretien</h4>
            <p>{props.service}</p>
            <h4 className={`${h4}`}>Détails de l'entretien</h4>
            <p>{props.observations}</p>
        </div>
    )
}

export default ServiceBookDisplay;