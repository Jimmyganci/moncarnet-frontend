import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddVehicules from './components/AddVehicules';
import GarageDetails from './components/GarageDetails';
import HomeCard from './components/HomeCard';
import Garage from './components/pages/Garage';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/LoginParticular';
import LoginPro from './components/pages/LoginPro';
import Particular from './components/pages/Particular';
import SignUp from './components/pages/SignUp';
import Vehicules from './components/pages/Vehicules';
import UserGarage from './components/UserGarage';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="h-full pb-4 text-center bg-center bg-no-repeat bg-cover bg-main">
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
          <Route path="vehicules" element={<Vehicules />} />
          <Route path="addVehicule" element={<AddVehicules />} />
          <Route path="garage" element={<Garage />} />
          <Route path="garage-details/:prosId" element={<GarageDetails />} />
          <Route path="mygarages" element={<UserGarage />} />
        </Route>
      </Routes>
    </div>
  );
}

export default App;
