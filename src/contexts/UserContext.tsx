import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface AppContextInterface {
  userLogin: any;
  setUserLogin: Function;
  infosUserVehicule: Array<object>;
  setInfosUserVehicule: Function;
  logOut: Function
}

const UserContext = createContext<AppContextInterface | null>(null);

export default UserContext;

export const UserContextProvider = ({ children }: any) => {
  const [userLogin, setUserLogin] = useState<Array<object>>([]);
  const [infosUserVehicule, setInfosUserVehicule] = useState<Array<object>>([]);
  const navigate = useNavigate();
  let data: Array<object> = [];

  // set current user to nothing
  const logOut = async function() {
    return await axios.post('http://localhost:8000/api/auth/particular/logout',{},{ withCredentials: true }) 
  }

  useEffect(() => {
    async function getUserLogin() {
      try {
        const response = await axios.get('http://localhost:8000/api/users/login', {
          withCredentials: true,
        });

        if (response.status === 200) {
          try {
            const user = await axios.get(
              `http://localhost:8000/api/users/${response.data.id_user}`,
              { withCredentials: true },
            );
            setUserLogin(user.data);
            if (user.status === 200) {
              const userVehicule = await axios.get(
                `http://localhost:8000/api/users/vehicules/${response.data.id_user}`,
                { withCredentials: true },
              );
              if (userVehicule.status === 200) {
                const results = await userVehicule.data.map(async (el: any) => {
                  const promise1 = axios.get(
                    `http://localhost:8000/api/vehicules/${el.immat}/brand`,
                    { withCredentials: true },
                  );
                  const promise2 = axios.get(
                    `http://localhost:8000/api/vehicules/${el.immat}/model`,
                    { withCredentials: true },
                  );
                  const promise3 = axios.get(
                    `http://localhost:8000/api/vehicules/${el.immat}/type`,
                    { withCredentials: true },
                  );
                  const getInfosVehicule = await Promise.all([
                    promise1,
                    promise2,
                    promise3,
                  ]);

                  data.push({
                    ...el,
                    brand: getInfosVehicule[0].data.model.brand.name,
                    model: getInfosVehicule[1].data.model.name,
                    type: getInfosVehicule[2].data.type.name_type,
                  });
                  if (data.length === results.length) {
                    setInfosUserVehicule(data);
                  }
                });
              }
            }
          } catch (err) {
            console.log(err);
          }
        }
      } catch (err: any) {
        navigate('/');
      }
    }
    getUserLogin();
  }, []);

  return (
    <UserContext.Provider
      value={{ userLogin, setUserLogin, infosUserVehicule, setInfosUserVehicule, logOut }}>
      {children}
    </UserContext.Provider>
  );
};
