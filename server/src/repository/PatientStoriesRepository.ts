import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import PatientStories, { IPatientStoriesModel } from '../models/PatientStories';

export default class PatientStoriesRepository extends CrudRepository<IPatientStoriesModel, Types.ObjectId> {
  constructor() {
    super(PatientStories as Model<IPatientStoriesModel>);
  }
}