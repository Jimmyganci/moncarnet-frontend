import IVehicule from '../Interfaces/IVehicule';
import { model, type, users, vehicule } from './request';

export const getVehicules = async (vehicules: IVehicule[]) => {
  const results = Promise.all(
    vehicules.map(async (vehic) => [
      await vehicule.getOne(vehic.immat),
      await model.getOne(vehic.id_modelId),
      await type.getOne(vehic.id_typeId),
      await users.getOne(vehic.id_userId),
    ]),
  ).then((results) =>
    results.map(([vehicule, model, type, user]: any) => {
      return {
        immat: vehicule.immat,
        registrationDate: vehicule.registration_date,
        urlGreenCard: vehicule.url_vehiculeRegistration,
        modelId: vehicule.id_modelId,
        model: model.name,
        validate: vehicule.validate,
        active: vehicule.active,
        brandId: model.id_brand,
        typeId: vehicule.id_typeId,
        type: type.name_type,
        userId: user.id_user,
        userName: user.firstname + ' ' + user.lastname,
      };
    }),
  );
  return results;
};
