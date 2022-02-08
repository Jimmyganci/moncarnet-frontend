import axios from 'axios';

import IAdmin from '../Interfaces/IAdmin';
import IAppointment from '../Interfaces/IAppointment';
import IBrand from '../Interfaces/IBrand';
import ICookie from '../Interfaces/ICookie';
import IModel from '../Interfaces/IModel';
import IPros from '../Interfaces/IPros';
import IServiceBook from '../Interfaces/IServiceBook';
import IType from '../Interfaces/IType';
import IUser from '../Interfaces/IUser';
import IVehicule from '../Interfaces/IVehicule';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

//  model API

//----------------------------ADMIN------------------------------//
export const admin = {
  getOne: (idAdmin: number): Promise<IAdmin> =>
    axios
      .get(`${API_URL}/admin/${idAdmin}`, { withCredentials: true })
      .then((res) => res.data),
};
//-------------------------------------------------------------//

//----------------------Appointment---------------------------//
export const appointment = {
  getAll: (): Promise<IAppointment[]> =>
    axios
      .get(`${API_URL}/appointments`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (appointmentId: number): Promise<IAppointment> =>
    axios
      .get(`${API_URL}/appointments/${appointmentId}`, { withCredentials: true })
      .then((res) => res.data),
  create: (data: IAppointment) =>
    axios.post(`${API_URL}/appointments`, data, { withCredentials: true }),
  put: (appointmentId: number, data: IAppointment): Promise<IAppointment> =>
    axios.put(`${API_URL}/appointments/${appointmentId}`, data, {
      withCredentials: true,
    }),
  delete: (appointmentId: number) =>
    axios.delete(`${API_URL}/appointments/${appointmentId}`, {
      withCredentials: true,
    }),
  };
//-----------------------------------------------------------//

//-------------------------Users----------------------------//
export const users = {
  // get all users
  getAll: (): Promise<IUser[]> =>
    axios.get(`${API_URL}/users`, { withCredentials: true }).then((res) => res.data),
  // get user by lastname
  getByLastName: (lastname: string): Promise<IUser[]> =>
    axios.get(`${API_URL}/users?lastname=${lastname}`, { withCredentials: true }).then((res) => res.data),
  // get one user
  getOne: (idUser: number): Promise<IUser> =>
    axios
      .get(`${API_URL}/users/${idUser}`, { withCredentials: true })
      .then((res) => res.data),
  appointments: (userId: number): Promise<IAppointment[]> =>
    //  get all user's appointments
    axios
      .get(`${API_URL}/users/${userId}/appointments`, { withCredentials: true })
      .then((res) => res.data),
  //  get user witch doesn't hace any appointment
  getUserWithoutAppointment: (): Promise<IUser[]> =>
    axios
      .get(`${API_URL}/users/?appointments=NULL`, { withCredentials: true })
      .then((res) => res.data),
  // create user
  post: (data: IUser): Promise<IUser> =>
    axios.post(`${API_URL}/users`, data).then((res) => res.data),
  // update user informations
  put: (userId: number, data: IUser) =>
    axios.put(`${API_URL}/users/${userId}`, data, { withCredentials: true }),
  // add garage to the favorite
  addFavorite: (userId: number, prosId: number) =>
    axios.put(`${API_URL}/users/${userId}/pros/${prosId}`, {}, { withCredentials: true }),

  // get all user's garage
  getGarage: (userId: number): Promise<IPros[]> =>
    axios
      .get(`${API_URL}/users/${userId}/pros`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  getVehicules: (userId: number): Promise<IVehicule[]> =>
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

  getAppointments: (userId?: number): Promise<IAppointment[]> =>
    axios
      .get(`${API_URL}/pros/${userId}/appointments`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  getUsers: (userId?: number): Promise<IUser[]> =>
    axios
      .get(`${API_URL}/pros/${userId}/users`, {
        withCredentials: true,
      })
      .then((res) => res.data),
  put: (prosId: number, data: IPros) =>
    axios.put(`${API_URL}/pros/${prosId}`, data, { withCredentials: true }),
  post: (data: IPros) =>
    axios.post(`${API_URL}/pros`, data, { withCredentials: true }).then((res) => res),
};
//----------------------------------------------------------//

//----------------------------Vehicule----------------------//
export const vehicule = {
  getAll: (): Promise<IVehicule[]> =>
    axios.get(`${API_URL}/vehicules`, { withCredentials: true }).then((res) => res.data),
  getVehiculeNoValidate: (): Promise<IVehicule[]> =>
    axios
      .get(`${API_URL}/vehicules/?noValidate=true`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (immat: string): Promise<IVehicule> =>
    axios
      .get(`${API_URL}/vehicules/${immat}`, { withCredentials: true })
      .then((res) => res.data),
  putOne: (immat: string, data: IVehicule) =>
    axios
      .put(
        `${API_URL}/vehicules/${immat}`,

        data,

        { withCredentials: true },
      )
      .then((res) => res.status),
  getVehiculeWithoutServiceBook: (): Promise<IVehicule[]> =>
    axios
      .get(`${API_URL}/vehicules/?service_book=NULL`, { withCredentials: true })
      .then((res) => res.data),
  post: (data: IVehicule): Promise<number> =>
    axios
      .post(`${API_URL}/vehicules`, data, { withCredentials: true })
      .then((res) => res.status),
};
//--------------------------------------------------------//

//-----------------------------Brands-------------------------------//

export const brands = {
  getOne: (idBrand: number): Promise<IBrand> =>
    axios
      .get(`${API_URL}/brands/${idBrand}`, { withCredentials: true })
      .then((res) => res.data),
  getAll: (url?: string): Promise<IBrand[]> => {
    let urlBrand = `${API_URL}/brands`;
    if (url) urlBrand += url;
    return axios.get(urlBrand, { withCredentials: true }).then((res) => res.data);
  },
  getModels: (brandId: number): Promise<IModel[]> =>
    axios
      .get(`${API_URL}/brands/${brandId}/models`, { withCredentials: true })
      .then((res) => res.data),
};
//------------------------------------------------------------------//

//-----------------------------Model------------------------------//
export const model = {
  getOne: (idModel: number): Promise<IModel> =>
    axios
      .get(`${API_URL}/models/${idModel}`, { withCredentials: true })
      .then((res) => res.data),
};
//----------------------------------------------------------------//

//------------------------------types------------------------------------//
export const type = {
  getOne: (idType: number): Promise<IType> =>
    axios
      .get(`${API_URL}/types/${idType}`, { withCredentials: true })
      .then((res) => res.data),
  getAll: (): Promise<IType[]> =>
    axios
      .get(`${API_URL}/types`, {
        withCredentials: true,
      })
      .then((res) => res.data),
};
//------------------------------------------------------------------//

//----------------------------Service_Book----------------------------//
export const service_book = {
  getAll: (): Promise<IServiceBook[]> =>
    axios
      .get(`${API_URL}/service_books`, { withCredentials: true })
      .then((res) => res.data),
  getServiceBookVehicule: (immat: string): Promise<IServiceBook[]> =>
    axios
      .get(`${API_URL}/vehicules/${immat}/service_book`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (idServiceBook: number): Promise<IServiceBook> =>
    axios
      .get(`${API_URL}/service_books/${idServiceBook}`, { withCredentials: true })
      .then((res) => res.data),
  post: (data: IServiceBook): Promise<IServiceBook> =>
    axios
    .post(`${API_URL}/service_books`, data, { withCredentials: true })
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
      .post(`${API_URL}/login_pro`, pros, { withCredentials: true })
      .then((res) => res.data),
};
//--------------------------------------------------------------//

//------------------------------User connected-------------------------//
export const isLoggedIn = {
  get: (): Promise<ICookie> =>
    axios.get(`${API_URL}/connected`, { withCredentials: true }).then((res) => res.data),
};
//-------------------------------------------------------------------//

export const upload = {
  post: (immat: string, formData: FormData) =>
    axios.post(`${API_URL}/vehicules/${immat}/upload`, formData, {
      withCredentials: true,
    }),
};
