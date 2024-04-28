import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {ICrowdFundingModel} from '../../models/CrowdFunding';
import CrowdFundingRepository from '../../repository/CrowdFundingRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class CrowdFundingDAOService implements ICrudDAO<ICrowdFundingModel> {
  private crowdFundingRepository: CrowdFundingRepository;

  constructor(crowdFundingRepository: CrowdFundingRepository) {
    this.crowdFundingRepository = crowdFundingRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<ICrowdFundingModel>): Promise<ICrowdFundingModel[]> {
    return this.crowdFundingRepository.bulkCreate(records)
  }

  create(values: ICrowdFundingModel): Promise<ICrowdFundingModel> {
    return this.crowdFundingRepository.save(values);
  }

  findAll(filter?: FilterQuery<ICrowdFundingModel>, options?: QueryOptions): Promise<ICrowdFundingModel[]> {
    return this.crowdFundingRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<ICrowdFundingModel | null> {
    return this.crowdFundingRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<ICrowdFundingModel>, options?: QueryOptions): Promise<ICrowdFundingModel | null> {
    return this.crowdFundingRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<ICrowdFundingModel>, options: QueryOptions): Promise<ICrowdFundingModel | null> {
    return this.crowdFundingRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<ICrowdFundingModel>,
    update: UpdateQuery<ICrowdFundingModel>,
    options?: QueryOptions
  ): Promise<ICrowdFundingModel | null> {
    return this.crowdFundingRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<ICrowdFundingModel>, options?: QueryOptions): Promise<void> {
    return this.crowdFundingRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.crowdFundingRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.crowdFundingRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<ICrowdFundingModel>, options?: QueryOptions): Promise<boolean> {
    return this.crowdFundingRepository.exist(filter, options);
  }

}