import React from 'react';

import IAdminInfos from '../Interfaces/IAdminInfos';

export default interface AppContextInterface {
  adminLogin: IAdminInfos;
  setAdminLogin: React.Dispatch<React.SetStateAction<IAdminInfos>>;
  logOut: Function;
}
