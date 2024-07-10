import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import AdvocacyFiles, { IAdvocacyFilesModel } from '../models/AdvocacyFiles';

export default class AdvocacyFilesRepository extends CrudRepository<IAdvocacyFilesModel, Types.ObjectId> {
  constructor() {
    super(AdvocacyFiles as Model<IAdvocacyFilesModel>);
  }
}