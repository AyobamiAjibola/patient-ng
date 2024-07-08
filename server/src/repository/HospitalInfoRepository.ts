import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import HospitalInfo, { IHospitalInfoModel } from '../models/HospitalInfo';

export default class HospitalInfoRepository extends CrudRepository<IHospitalInfoModel, Types.ObjectId> {
  constructor() {
    super(HospitalInfo as Model<IHospitalInfoModel>);
  }
}