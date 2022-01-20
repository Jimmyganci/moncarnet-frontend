import axios from 'axios';

import ModelInfos from '../Interfaces/IModelInfos';
import TypeInfos from '../Interfaces/ITypeInfos';
import UserInfos from '../Interfaces/IuserInfos';
import VehiculeInfos from '../Interfaces/IVehiculeInfos';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const admin = {
  getOne: (idAdmin: number) =>
    axios
      .get(`${API_URL}/admin/${idAdmin}`, { withCredentials: true })
      .then((res) => res.data),
};
export const users = {
  getOne: (idUser: number): Promise<UserInfos> =>
    axios
      .get(`${API_URL}/users/${idUser}`, { withCredentials: true })
      .then((res) => res.data),
};

export const vehicule = {
  getVehiculeNoValidate: () =>
    axios
      .get(`${API_URL}/vehicules/all?noValidate=true`, { withCredentials: true })
      .then((res) => res.data),
  getOne: (immat: string): Promise<VehiculeInfos> =>
    axios
      .get(`${API_URL}/vehicules/${immat}`, { withCredentials: true })
      .then((res) => res.data),
  putOne: (immat: string, data: VehiculeInfos): Promise<VehiculeInfos> =>
    axios
      .put(
        `${API_URL}/vehicules/${immat}`,

        data,

        { withCredentials: true },
      )
      .then((res) => res.data),
};
export const brand = {
  getOne: (idBrand: number) =>
    axios
      .get(`${API_URL}/brands/${idBrand}`, { withCredentials: true })
      .then((res) => res.data),
};
export const model = {
  getOne: (idModel: number): Promise<ModelInfos> =>
    axios
      .get(`${API_URL}/models/${idModel}`, { withCredentials: true })
      .then((res) => res.data),
};
export const type = {
  getOne: (idType: number): Promise<TypeInfos> =>
    axios
      .get(`${API_URL}/types/${idType}`, { withCredentials: true })
      .then((res) => res.data),
};

export const login = {
  admin: (admin: { email: string; password: string }) =>
    axios
      .post(`${API_URL}/auth/admin/login`, admin, { withCredentials: true })
      .then((res) => res.status),
};
export const isLoggin = {
  get: () =>
    axios.get(`${API_URL}/auth/login`, { withCredentials: true }).then((res) => res.data),
};
