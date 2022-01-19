import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api';

export const admin = {
  getOne: (idAdmin: number) =>
    axios
      .get(`${API_URL}/admin/${idAdmin}`, { withCredentials: true })
      .then((res) => res.data),
};

export const vehicule = {
  getVehiculeNoValidate: () =>
    axios
      .get(`${API_URL}/vehicules/all?noValidate=true`, { withCredentials: true })
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
