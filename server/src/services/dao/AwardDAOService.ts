import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IAwardModel} from '../../models/Award';
import AwardRepository from '../../repository/AwardRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class AwardDAOService implements ICrudDAO<IAwardModel> {
  private awardRepository: AwardRepository;

  constructor(awardRepository: AwardRepository) {
    this.awardRepository = awardRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IAwardModel>): Promise<IAwardModel[]> {
    return this.awardRepository.bulkCreate(records)
  }

  create(values: IAwardModel): Promise<IAwardModel> {
    return this.awardRepository.save(values);
  }

  findAll(filter?: FilterQuery<IAwardModel>, options?: QueryOptions): Promise<IAwardModel[]> {
    return this.awardRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IAwardModel | null> {
    return this.awardRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IAwardModel>, options?: QueryOptions): Promise<IAwardModel | null> {
    return this.awardRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IAwardModel>, options: QueryOptions): Promise<IAwardModel | null> {
    return this.awardRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IAwardModel>,
    update: UpdateQuery<IAwardModel>,
    options?: QueryOptions
  ): Promise<IAwardModel | null> {
    return this.awardRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IAwardModel>, options?: QueryOptions): Promise<void> {
    return this.awardRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.awardRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.awardRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IAwardModel>, options?: QueryOptions): Promise<boolean> {
    return this.awardRepository.exist(filter, options);
  }

}
