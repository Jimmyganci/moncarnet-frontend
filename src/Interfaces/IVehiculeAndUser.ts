export default interface IVehiculeAndUser {
  active: boolean;
  brandId: number;
  brand?: string;
  immat: string;
  model: string;
  modelId: number;
  registrationDate: Date;
  type: string;
  typeId: number;
  urlGreenCard: string;
  userId: number;
  userName: string;
  validate: boolean;
}
