export default interface IAppointment {
  id_appointment?: number;
  prosId: number;
  userId: number;
  comment: string;
  date: Date;
  immat: string;
  user?: string;
}
