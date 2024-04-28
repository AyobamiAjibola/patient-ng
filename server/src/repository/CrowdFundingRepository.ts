import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import CrowdFunding, { ICrowdFundingModel } from '../models/CrowdFunding';

export default class CrowdFundingRepository extends CrudRepository<ICrowdFundingModel, Types.ObjectId> {
  constructor() {
    super(CrowdFunding as Model<ICrowdFundingModel>);
  }
}