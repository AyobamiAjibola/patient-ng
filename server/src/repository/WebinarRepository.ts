import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Webinar, { IWebinarModel } from '../models/Webinar';

export default class WebinarRepository extends CrudRepository<IWebinarModel, Types.ObjectId> {
  constructor() {
    super(Webinar as Model<IWebinarModel>);
  }
}