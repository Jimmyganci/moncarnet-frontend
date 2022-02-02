export default interface IUserInfos {
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
