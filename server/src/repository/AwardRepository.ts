import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Award, { IAwardModel } from '../models/Award';

export default class AwardRepository extends CrudRepository<IAwardModel, Types.ObjectId> {
  constructor() {
    super(Award as Model<IAwardModel>);
  }
}