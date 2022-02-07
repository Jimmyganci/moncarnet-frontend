import React from "react";
import {glassMorphism} from '../../../variableTailwind';
import IServiceBook from '../../../Interfaces/IServiceBook';


type Props = IServiceBook;

const ServiceBookDisplay: React.FC<Props>  = (props) => {

    return (
        <div className={`${glassMorphism} flex flex-col p-4 w-5/6`}>
            <p>{props.date}</p>
            <p>{props.service}</p>
            <p>{props.observations}</p>
            <p>{props.kilometrage}</p>
            <p>{props.immat_vehicule}</p>
        </div>
    )
}

export default ServiceBookDisplay;