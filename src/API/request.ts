import axios from 'axios';

import IAdminInfos from '../Interfaces/IAdminInfos';
import IAppointmentInfos from '../Interfaces/IAppointmentInfos';
import AppointmentInfos from '../Interfaces/IAppointmentInfos';
import IBrandInfos from '../Interfaces/IBrandInfos';
import BrandInfos from '../Interfaces/IBrandInfos';
import { ICookieInfos } from '../Interfaces/ICookieInfos';
import IModelInfos from '../Interfaces/IModelInfos';
import ModelInfos from '../Interfaces/IModelInfos';
import IPros from '../Interfaces/IPros';
import IServiceBookInfos from '../Interfaces/IServiceBook';
import ServiceBookInfos from '../Interfaces/IServiceBook';
import ITypeInfos from '../Interfaces/ITypeInfos';
import TypeInfos from '../Interfaces/ITypeInfos';
import IUserInfos from '../Interfaces/IUserInfos';
import IVehiculeInfos from '../Interfaces/IVehiculeInfos';
import VehiculeInfos from '../Interfaces/IVehiculeInfos';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

//  model API

//----------------------------ADMIN------------------------------//
export const admin = {
  getOne: (idAdmin: number): Promise<IAdminInfos> =>
    axios
      .get(`${API_URL}/admin/${idAdmin}`, { withCredentials: true })
      .then((res) => res.data),
};
//-------------------------------------------------------------//

//----------------------Appointment---------------------------//
export const appointment = {
  getAll: (): Promise<AppointmentInfos[]> =>
    axios
      .get(`${API_URL}/appointments`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (appointmentId: number): Promise<AppointmentInfos> =>
    axios
      .get(`${API_URL}/appointments/${appointmentId}`, { withCredentials: true })
      .then((res) => res.data),
  create: (data: IAppointmentInfos) =>
    axios.post(`${API_URL}/appointments`, data, { withCredentials: true }),
  put: (appointmentId: number, data: IAppointmentInfos) =>
    axios.put(`${API_URL}/appointments/${appointmentId}`, data, {
      withCredentials: true,
    }),
  delete: (appointmentId: number) =>
    axios.delete(`http://localhost:8000/api/appointments/${appointmentId}`, {
      withCredentials: true,
    }),
};
//-----------------------------------------------------------//

//-------------------------Users----------------------------//
export const users = {
  // get all users
  getAll: (): Promise<IUserInfos[]> =>
    axios.get(`${API_URL}/users`, { withCredentials: true }).then((res) => res.data),
  // get one user
  getOne: (idUser: number): Promise<IUserInfos> =>
    axios
      .get(`${API_URL}/users/${idUser}`, { withCredentials: true })
      .then((res) => res.data),
  appointments: (userId: number): Promise<IAppointmentInfos[]> =>
    //  get all user's appointments
    axios
      .get(`${API_URL}/users/${userId}/appointments`, { withCredentials: true })
      .then((res) => res.data),
  //  get user witch doesn't hace any appointment
  getUserWithoutAppointment: (): Promise<IUserInfos[]> =>
    axios
      .get(`${API_URL}/users/?appointments=NULL`, { withCredentials: true })
      .then((res) => res.data),
  // create user
  post: (data: IUserInfos): Promise<IUserInfos> =>
    axios.post(`${API_URL}/users`, data).then((res) => res.data),
  // update user informations
  put: (userId: number, data: IUserInfos) =>
    axios.put(`${API_URL}/users/${userId}`, data, { withCredentials: true }),
  // add garage to the favorite
  addFavorite: (userId: number, prosId: number) =>
    axios.put(`${API_URL}/users/${userId}/pros/${prosId}`, {}, { withCredentials: true }),
  // get all user's garage
  getGarage: (userId: number): Promise<IPros[]> =>
    axios
      .get(`http://localhost:8000/api/users/${userId}/pros`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  getVehicules: (userId: number): Promise<IVehiculeInfos[]> =>
    axios
      .get(`${API_URL}/users/${userId}/vehicules`, { withCredentials: true })
      .then((res) => res.data),
  // delete garage of the favorite
  deleteGarage: (userId: number, prosId: number) =>
    axios
      .delete(`${API_URL}/users/${userId}/prosDeleted/${prosId}`, {
        withCredentials: true,
      })
      .then((res) => res),
};
//----------------------------------------------------------//

//----------------------------Pros--------------------------//

export const pros = {
  getAll: (url?: string): Promise<IPros[]> => {
    let urlPros = `${API_URL}/pros`;
    if (url) urlPros += url;
    return axios.get(urlPros, { withCredentials: true }).then((res) => res.data);
  },

  getOne: (prosId: number): Promise<IPros> =>
    axios
      .get(`${API_URL}/pros/${prosId}`, { withCredentials: true })
      .then((res) => res.data),
  getAppointments: (userId: number): Promise<IAppointmentInfos[]> =>
    axios
      .get(`${API_URL}/pros/${userId}/appointments`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  getUsers: (userId: number): Promise<IUserInfos[]> =>
    axios
      .get(`http://localhost:8000/api/pros/${userId}/users`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  put: (prosId: number, data: IPros) =>
    axios.put(`${API_URL}/pros/${prosId}`, data, { withCredentials: true }),
};
//----------------------------------------------------------//

//----------------------------Vehicule----------------------//
export const vehicule = {
  getAll: (): Promise<IVehiculeInfos[]> =>
    axios.get(`${API_URL}/vehicules`, { withCredentials: true }).then((res) => res.data),
  getVehiculeNoValidate: (): Promise<IVehiculeInfos[]> =>
    axios
      .get(`${API_URL}/vehicules/?noValidate=true`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (immat: string): Promise<VehiculeInfos> =>
    axios
      .get(`${API_URL}/vehicules/${immat}`, { withCredentials: true })
      .then((res) => res.data),
  putOne: (immat: string, data: VehiculeInfos) =>
    axios
      .put(
        `${API_URL}/vehicules/${immat}`,

        data,

        { withCredentials: true },
      )
      .then((res) => res.status),
  getVehiculeWithoutServiceBook: (): Promise<VehiculeInfos[]> =>
    axios
      .get(`${API_URL}/vehicules/?service_book=NULL`, { withCredentials: true })
      .then((res) => res.data),
  post: (data: IVehiculeInfos): Promise<number> =>
    axios
      .post(`${API_URL}/vehicules`, data, { withCredentials: true })
      .then((res) => res.status),
};
//--------------------------------------------------------//

//-----------------------------Brands-------------------------------//

export const brands = {
  getOne: (idBrand: number): Promise<BrandInfos> =>
    axios
      .get(`${API_URL}/brands/${idBrand}`, { withCredentials: true })
      .then((res) => res.data),
  getAll: (url?: string): Promise<IBrandInfos[]> => {
    let urlBrand = `${API_URL}/brands`;
    if (url) urlBrand += url;
    return axios.get(urlBrand, { withCredentials: true }).then((res) => res.data);
  },
  getModels: (brandId: number): Promise<IModelInfos[]> =>
    axios
      .get(`${API_URL}/brands/${brandId}/models`, { withCredentials: true })
      .then((res) => res.data),
};
//------------------------------------------------------------------//

//-----------------------------Model------------------------------//
export const model = {
  getOne: (idModel: number): Promise<ModelInfos> =>
    axios
      .get(`${API_URL}/models/${idModel}`, { withCredentials: true })
      .then((res) => res.data),
};
//----------------------------------------------------------------//

//------------------------------types------------------------------------//
export const type = {
  getOne: (idType: number): Promise<TypeInfos> =>
    axios
      .get(`${API_URL}/types/${idType}`, { withCredentials: true })
      .then((res) => res.data),
  getAll: (): Promise<ITypeInfos[]> =>
    axios
      .get('http://localhost:8000/api/types', {
        withCredentials: true,
      })
      .then((res) => res.data),
};
//------------------------------------------------------------------//

//----------------------------Service_Book----------------------------//
export const service_book = {
  getAll: (): Promise<IServiceBookInfos[]> =>
    axios
      .get(`${API_URL}/service_books`, { withCredentials: true })
      .then((res) => res.data),
  getServiceBookVehicule: (immat: string): Promise<ServiceBookInfos[]> =>
    axios
      .get(`${API_URL}/vehicules/${immat}/service_book`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (idServiceBook: number): Promise<ServiceBookInfos> =>
    axios
      .get(`${API_URL}/service_books/${idServiceBook}`, { withCredentials: true })
      .then((res) => res.data),
};
//---------------------------------------------------------------//

//----------------------------login-------------------------------//
export const login = {
  admin: (admin: { email: string; password: string }) =>
    axios
      .post(`${API_URL}/login_admin`, admin, { withCredentials: true })
      .then((res) => res.status),
  particular: (particular: { email: string; password: string }) =>
    axios
      .post(
        `${API_URL}/login_user`,

        particular,

        { withCredentials: true },
      )
      .then((res) => res.data),
  pros: (pros: { email: string; password: string }) =>
    axios
      .post('http://localhost:8000/api/login_pro', pros, { withCredentials: true })
      .then((res) => res.data),
};
//--------------------------------------------------------------//

//------------------------------User connected-------------------------//
export const isLoggedIn = {
  get: (): Promise<ICookieInfos> =>
    axios.get(`${API_URL}/connected`, { withCredentials: true }).then((res) => res.data),
};
//-------------------------------------------------------------------//

export const upload = {
  post: (immat: string, formData: FormData) =>
    axios.post(`${API_URL}/vehicules/${immat}/upload`, formData, {
      withCredentials: true,
    }),
};
