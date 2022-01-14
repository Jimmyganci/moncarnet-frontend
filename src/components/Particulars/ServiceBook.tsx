import axios from 'axios';
import React, { useContext, useEffect, useState, useRef } from 'react';
import { Link, useParams } from 'react-router-dom';

import UserContext from '../../contexts/UserContext';
import { glassMorphism, title } from '../../variableTailwind';

const ServiceBook = () => {
    const {vehiculeImmatToUpdate}:any = useParams();
    const { infosUserVehicule }: any = useContext(UserContext);

    return (
        <div className="w-full h-full flex flex-col items-center justify-center">
            <h2 className={title}>Mes derniers entretien</h2>
        </div>
    );
};

export default ServiceBook;