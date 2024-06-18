import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IAdvocacyModel} from '../../models/Advocacy';
import AdvocacyRepository from '../../repository/AdvocacyRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class AdvocacyDAOService implements ICrudDAO<IAdvocacyModel> {
  private advocacyRepository: AdvocacyRepository;

  constructor(advocacyRepository: AdvocacyRepository) {
    this.advocacyRepository = advocacyRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IAdvocacyModel>): Promise<IAdvocacyModel[]> {
    return this.advocacyRepository.bulkCreate(records)
  }

  create(values: IAdvocacyModel): Promise<IAdvocacyModel> {
    return this.advocacyRepository.save(values);
  }

  findAll(filter?: FilterQuery<IAdvocacyModel>, options?: QueryOptions): Promise<IAdvocacyModel[]> {
    return this.advocacyRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IAdvocacyModel | null> {
    return this.advocacyRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IAdvocacyModel>, options?: QueryOptions): Promise<IAdvocacyModel | null> {
    return this.advocacyRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IAdvocacyModel>, options: QueryOptions): Promise<IAdvocacyModel | null> {
    return this.advocacyRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IAdvocacyModel>,
    update: UpdateQuery<IAdvocacyModel>,
    options?: QueryOptions
  ): Promise<IAdvocacyModel | null> {
    return this.advocacyRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IAdvocacyModel>, options?: QueryOptions): Promise<void> {
    return this.advocacyRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.advocacyRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.advocacyRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IAdvocacyModel>, options?: QueryOptions): Promise<boolean> {
    return this.advocacyRepository.exist(filter, options);
  }

}
