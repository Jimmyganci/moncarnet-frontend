import React, { useContext } from "react";
import {glassMorphism, button} from '../../../variableTailwind';
import IUser from '../../../Interfaces/IUser';
import ProsContext from '../../../contexts/ProsContext';

type Props = IUser;

const CustomerDisplay: React.FC<Props>  = (props) => {
    
    const { setShowCustomer, setSearchCustomer, searchCustomer } = useContext(ProsContext);

    const handleShowCustomer = () => {
        setShowCustomer(true);
        setSearchCustomer(props.firstname + ' ' + props.lastname)
    }

    return (
        <li className={`m-4 p-4 h-1/6 rounded-lg ${glassMorphism}`}>
            <div className = 'flex justify-around items-center'>
                <div className="flex justify-center w-1/6">
                    <p>{props.firstname + ' ' + props.lastname}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p>{props.postal_code}</p>
                </div >
                <div className="flex justify-center w-1/6">
                    <p>{props.address}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p>{props.city}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p>{props.email}</p>
                </div>
                <div className="flex justify-center w-1/6">
                    <p>{props.phone}</p>
                </div>        
            </div>
            <button className={`${button}`} onClick={() => handleShowCustomer()}>Détails</button>
        </li>
    )

}

export default CustomerDisplay;