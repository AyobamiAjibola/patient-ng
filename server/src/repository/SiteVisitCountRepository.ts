import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import SiteVisitCount, { ISiteVisitCountModel } from '../models/SiteVisitCount';

export default class SiteVisitCountRepository extends CrudRepository<ISiteVisitCountModel, Types.ObjectId> {
  constructor() {
    super(SiteVisitCount as Model<ISiteVisitCountModel>);
  }
}