export default interface IUserInfos {
  id_user?: number;
  firstname: string;
  lastname: string;
  email: string;
  password?: string;
  address: string;
  phone: string;
  postal_code: number;
  city: string;
  active?: boolean;
}
