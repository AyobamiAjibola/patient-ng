import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IPatientStoriesModel} from '../../models/PatientStories';
import PatientStoriesRepository from '../../repository/PatientStoriesRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class PatientStoriesDAOService implements ICrudDAO<IPatientStoriesModel> {
  private patientStoriesRepository: PatientStoriesRepository;

  constructor(patientStoriesRepository: PatientStoriesRepository) {
    this.patientStoriesRepository = patientStoriesRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IPatientStoriesModel>): Promise<IPatientStoriesModel[]> {
    return this.patientStoriesRepository.bulkCreate(records)
  }

  create(values: IPatientStoriesModel): Promise<IPatientStoriesModel> {
    return this.patientStoriesRepository.save(values);
  }

  findAll(filter?: FilterQuery<IPatientStoriesModel>, options?: QueryOptions): Promise<IPatientStoriesModel[]> {
    return this.patientStoriesRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IPatientStoriesModel | null> {
    return this.patientStoriesRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IPatientStoriesModel>, options?: QueryOptions): Promise<IPatientStoriesModel | null> {
    return this.patientStoriesRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IPatientStoriesModel>, options: QueryOptions): Promise<IPatientStoriesModel | null> {
    return this.patientStoriesRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IPatientStoriesModel>,
    update: UpdateQuery<IPatientStoriesModel>,
    options?: QueryOptions
  ): Promise<IPatientStoriesModel | null> {
    return this.patientStoriesRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IPatientStoriesModel>, options?: QueryOptions): Promise<void> {
    return this.patientStoriesRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.patientStoriesRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.patientStoriesRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IPatientStoriesModel>, options?: QueryOptions): Promise<boolean> {
    return this.patientStoriesRepository.exist(filter, options);
  }

}