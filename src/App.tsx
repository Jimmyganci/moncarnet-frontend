import React from 'react';
import { Route, Routes } from 'react-router-dom';

import AddVehicules from './components/AddVehicules';
import HomeCard from './components/HomeCard';
import Login from './components/pages/Login';
import Particular from './components/pages/Particular';
import SignUp from './components/pages/SignUp';
import Vehicules from './components/pages/Vehicules';
import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="h-full pb-4 text-center bg-center bg-no-repeat bg-cover bg-main">
      <Routes>
        <Route path="/" element={<Login />} />
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
        </Route>
      </Routes>
    </div>
  );
}

export default App;
