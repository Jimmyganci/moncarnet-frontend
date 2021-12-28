import React from 'react';
import { Route, Routes } from 'react-router-dom';

import Login from './components/pages/Login';
import Particular from './components/pages/Particular';
import SignUp from './components/pages/SignUp';
// import { UserContextProvider } from './contexts/UserContext';

function App() {
  return (
    <div className="text-center bg-no-repeat bg-cover bg-main">
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        {/* <UserContextProvider> */}
        <Route path="/particular" element={<Particular />} />
        {/* </UserContextProvider> */}
      </Routes>
    </div>
  );
}

export default App;
