import axios from 'axios';
import React, { useEffect, useState } from 'react';

function Vehicules() {
  const [vehiculesList, setVehiculesList] = useState([]);
  console.log(vehiculesList);

  useEffect(() => {
    async function getVehicule() {
      try {
        const response = await axios.get(`http://localhost:8000/api/users/vehicules/2`, {
          withCredentials: true,
        });
        setVehiculesList(response.data);
      } catch (err) {
        console.log(err);
      }
    }
    getVehicule();
  }, []);
  return <div></div>;
}

export default Vehicules;
