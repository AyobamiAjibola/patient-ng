import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Advocacy, { IAdvocacyModel } from '../models/Advocacy';

export default class AdvocacyRepository extends CrudRepository<IAdvocacyModel, Types.ObjectId> {
  constructor() {
    super(Advocacy as Model<IAdvocacyModel>);
  }
}