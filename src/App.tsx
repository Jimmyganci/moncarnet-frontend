import 'react-toastify/dist/ReactToastify.css';

import React from 'react';
import { QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { Route, Routes } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';

import queryClient from './API/query-client';
import AppointmentList from './components/Admin/Appointment/AppointmentList';
import UsersWithoutAppointment from './components/Admin/Appointment/UsersWithoutAppointment';
import CustomersAdmin from './components/Admin/Customers/CustomersAdmin';
import HomeAdmin from './components/Admin/Home/HomeAdmin';
import LoginAdmin from './components/Admin/LoginAdmin';
import ProfilAdmin from './components/Admin/profil/ProfilAdmin';
import ServiceBookDetails from './components/Admin/ServiceBook/ServiceBookDetails';
import VehiculeList from './components/Admin/Vehicules/VehiculeList';
import VehiculeToValidate from './components/Admin/Vehicules/VehiculeToValidate';
import Admin from './components/pages/Admin';
import Garage from './components/pages/Garage';
import LandingPage from './components/pages/LandingPage';
import Login from './components/pages/LoginParticular';
import LoginPro from './components/pages/LoginPro';
import Particular from './components/pages/Particular';
import Pros from './components/pages/Pros';
import SignUp from './components/pages/SignUp';
import Vehicules from './components/pages/Vehicules';
import AddVehicules from './components/Particulars/AddVehicules';
import GarageDetails from './components/Particulars/GarageDetails';
import HomeCard from './components/Particulars/HomeCard';
import InfosParticular from './components/Particulars/InfosParticular';
import ServiceBook from './components/Particulars/ServiceBook';
import ServiceDetail from './components/Particulars/ServiceDetail';
import UpdateVehicule from './components/Particulars/UpdateVehicule';
import UserGarage from './components/Particulars/UserGarage';
import Appointments from './components/Pros/Appointments/Appointments';
import CreateAppointments from './components/Pros/Appointments/CreateAppointment';
import Customers from './components/Pros/Customers';
import HomePros from './components/Pros/Home/HomePros';
import Invoices from './components/Pros/Invoices';
import Profile from './components/Pros/Profile/Profile';
import Quotes from './components/Pros/Quotes';
import { AdminContextProvider } from './contexts/AdminContext';
import { ProsContextProvider } from './contexts/ProsContext';
import { UserContextProvider } from './contexts/UserContext';
<<<<<<< Updated upstream
=======
import UpdateVehicule from './components/Particulars/UpdateVehicule';
import ServiceBook from './components/Particulars/ServiceBook';
import ServiceDetail from './components/Particulars/ServiceDetail';
import HomeAppointment from './components/Particulars/HomeAppointment';
>>>>>>> Stashed changes

function App() {
  const RouteAdmin = [
    { path: 'home', component: <HomeAdmin /> },
    { path: 'customers', component: <CustomersAdmin /> },
    { path: 'vehicules', component: <VehiculeList /> },
    { path: 'vehicules/toValidate', component: <VehiculeToValidate /> },
    { path: 'appointments', component: <AppointmentList /> },
    { path: 'users/withoutAppointment', component: <UsersWithoutAppointment /> },
    { path: 'profil', component: <ProfilAdmin /> },
    { path: 'vehicule/serviceBook/:id_service_book', component: <ServiceBookDetails /> },
  ];
  return (
<<<<<<< Updated upstream
    <div className="min-h-screen text-center bg-center bg-no-repeat bg-cover bg-main">
      <ToastContainer />
      <QueryClientProvider client={queryClient}>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/login-particular" element={<Login />} />
          <Route path="/login-pro" element={<LoginPro />} />
          <Route path="login-admin" element={<LoginAdmin />} />
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
            <Route
              path="vehicules/:vehiculeImmatToUpdate/update"
              element={<UpdateVehicule />}
            />
            <Route
              path="vehicules/:vehiculeImmatToUpdate/serviceBook"
              element={<ServiceBook />}
            />
            <Route
              path="vehicules/:vehiculeImmatToUpdate/serviceBook/:id_service_book"
              element={<ServiceDetail />}
            />
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
            <Route path="appointments/create" element={<CreateAppointments />} />
          </Route>
          <Route
            path="/admin"
            element={
              <AdminContextProvider>
                <Admin />
              </AdminContextProvider>
            }>
            {RouteAdmin.map((route, index) => (
              <Route key={index} path={route.path} element={route.component} />
            ))}
          </Route>
        </Routes>
        <ReactQueryDevtools initialIsOpen={false} />
      </QueryClientProvider>
=======
    <div className="min-h-screen h-full text-center bg-center bg-no-repeat bg-cover bg-main">
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
          <Route path="vehicules/:vehiculeImmatToUpdate/serviceBook" element={<ServiceBook />} />
          <Route path="vehicules/:vehiculeImmatToUpdate/serviceBook/:id_service_book" element={<ServiceDetail />} />
          <Route path="addVehicule" element={<AddVehicules />} />
          <Route path="appointments" element={<HomeAppointment />} />
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
          <Route path="appointments/create" element={<CreateAppointments />} />
        </Route>
      </Routes>
>>>>>>> Stashed changes
    </div>
  );
}

export default App;
