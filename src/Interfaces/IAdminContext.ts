import AdminInfos from '../Interfaces/IAdminInfos';
export default interface AppContextInterface {
  adminLogin: Array<AdminInfos>;
  setAdminLogin: Function;
  logOut: Function;
}
