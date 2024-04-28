import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import Podcast, { IPodcastModel } from '../models/Podcast';

export default class PodcastRepository extends CrudRepository<IPodcastModel, Types.ObjectId> {
  constructor() {
    super(Podcast as Model<IPodcastModel>);
  }
}