import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Insight, { IInsightModel } from '../models/Insight';

export default class InsightRepository extends CrudRepository<IInsightModel, Types.ObjectId> {
  constructor() {
    super(Insight as Model<IInsightModel>);
  }
}