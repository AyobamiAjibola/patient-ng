import CrudRepository from '../helpers/CrudRepository';
import { Model, Types } from 'mongoose';
import PatientDocs, { IPatientDocsModel } from '../models/PatientDocs';

export default class PatientDocsRepository extends CrudRepository<IPatientDocsModel, Types.ObjectId> {
  constructor() {
    super(PatientDocs as Model<IPatientDocsModel>);
  }
}