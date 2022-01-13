import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddVehicules from './components/Particulars/AddVehicules';
import GarageDetails from './components/Particulars/GarageDetails';
import HomeCard from './components/Particulars/HomeCard';
import Garage from './components/pages/Garage';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/LoginParticular';
import LoginPro from './components/pages/LoginPro';
import Particular from './components/pages/Particular';
import SignUp from './components/pages/SignUp';
import Vehicules from './components/pages/Vehicules';
import UserGarage from './components/Particulars/UserGarage';
import InfosParticular from './components/Particulars/InfosParticular';
import Pros from './components/pages/Pros';
import HomePros from './components/Pros/Home/HomePros';
import Profile from './components/Pros/Profile/Profile';
import Appointments from './components/Pros/Appointments/Appointments';
import Customers from './components/Pros/Customers';
import Invoices from './components/Pros/Invoices';
import Quotes from './components/Pros/Quotes';
import { ProsContextProvider } from './contexts/ProsContext';
import { UserContextProvider } from './contexts/UserContext';
import UpdateVehicule from './components/Particulars/UpdateVehicule';

function App() {
  return (
    <div className="h-full text-center bg-center bg-no-repeat bg-cover bg-main">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login-particular" element={<Login />} />
        <Route path="/login-pro" element={<LoginPro />} />
        <Route path="/signup" element={<SignUp />} />
        <Route
          path="/particular"
          element={
            <UserContextProvider>
              <Particular />
            </UserContextProvider>
          }>
          <Route path="home" element={<HomeCard />} />
          <Route path="infos" element={<InfosParticular />} />
          <Route path="vehicules" element={<Vehicules />} />
          <Route path="vehicules/:vehiculeImmatToUpdate/update" element={<UpdateVehicule />} />
          <Route path="addVehicule" element={<AddVehicules />} />
          <Route path="garage" element={<Garage />} />
          <Route path="garage-details/:prosId" element={<GarageDetails />} />
          <Route path="mygarages" element={<UserGarage />} />
        </Route>
        <Route
          path="/pros"
          element={
            <ProsContextProvider>
              <Pros />
            </ProsContextProvider>
          }>
          <Route path="home" element={<HomePros />} />
          <Route path="profile" element={<Profile />} />
          <Route path="appointments" element={<Appointments />} />
          <Route path="customers" element={<Customers />} />
          <Route path="quotes" element={<Quotes />} />
          <Route path="invoices" element={<Invoices />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
