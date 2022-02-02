import React, { useEffect, useState } from 'react';

import { appointment, pros, users } from '../../../API/request';
import { glassMorphism } from '../../../variableTailwind';
import VehiculeModal from '../ServiceBook/VehiculeModal';
import AppointmentCard from './AppointmentCard';
import ModalInfos from './ModalInfos';

interface RequestId {
  appointment: number;
  userId: number;
  prosId: number;
}

function AppointmentList() {
  const [dataAppointment, setDataAppointment] = useState([]);
  const [userId, setUserId] = useState<number>();
  const [prosId, setProsId] = useState<number>();
  const [showUser, setShowUser] = useState(false);
  const [showPros, setShowPros] = useState(false);
  const [showVehicule, setShowVehicule] = useState(false);
  const [oneVehicule, setOneVehicule] = useState([]);

  async function getAppointments() {
    try {
      //  get all appointment
      const getAll = await appointment.getAll();
      //  push in an array to map it and make a promise all for have the all informations of appointments
      let requestId: Array<RequestId> = [];
      getAll.map(async (appointment) => {
        requestId.push({
          appointment: appointment.id_appointment,
          userId: appointment.userId,
          prosId: appointment.prosId,
        });
      });

      Promise.all(
        requestId.map(async (id) => [
          await appointment.getOne(id.appointment),
          await users.getOne(id.userId),
          await pros.getOne(id.prosId),
        ]),
      ).then((res: any) => {
        setDataAppointment(res);
      });
    } catch (err) {
      console.log(err);
    }
  }

  useEffect(() => {
    getAppointments();
  }, []);

  return (
    <div className="flex flex-col items-end w-full">
      <div className="w-5/6 h-full p-2">
        <div>
          <h1 className="text-3xl uppercase text-background">Tous les rendez-vous</h1>
        </div>
        <div className={`${glassMorphism} rounded-lg mt-4`}>
          <div className={`grid grid-cols-6 ${glassMorphism} rounded-lg pt-2 pb-2`}>
            <p>N°</p>
            <p>Immatriculation</p>
            <p>Date</p>
            <p>Client</p>
            <p>Professionel</p>
            <p>Commentaire</p>
          </div>
          {dataAppointment &&
            dataAppointment.map((appointment, index) => (
              <AppointmentCard
                key={index}
                appointment={appointment[0]}
                user={appointment[1]}
                pros={appointment[2]}
                setUserId={setUserId}
                setProsId={setProsId}
                setShowUser={setShowUser}
                setShowPros={setShowPros}
                setOneVehicule={setOneVehicule}
                setShowVehicule={setShowVehicule}
              />
            ))}
        </div>
      </div>
      <ModalInfos
        showUser={showUser}
        setShowUser={setShowUser}
        showPros={showPros}
        setShowPros={setShowPros}
        userId={userId}
        prosId={prosId}
      />
      {showVehicule && (
        <VehiculeModal vehicule={oneVehicule} setShowVehicule={setShowVehicule} />
      )}
    </div>
  );
}

export default AppointmentList;
