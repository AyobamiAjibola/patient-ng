import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IInsightModel} from '../../models/Insight';
import InsightRepository from '../../repository/InsightRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class InsightDAOService implements ICrudDAO<IInsightModel> {
  private insightRepository: InsightRepository;

  constructor(insightRepository: InsightRepository) {
    this.insightRepository = insightRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IInsightModel>): Promise<IInsightModel[]> {
    return this.insightRepository.bulkCreate(records)
  }

  create(values: IInsightModel): Promise<IInsightModel> {
    return this.insightRepository.save(values);
  }

  findAll(filter?: FilterQuery<IInsightModel>, options?: QueryOptions): Promise<IInsightModel[]> {
    return this.insightRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IInsightModel | null> {
    return this.insightRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IInsightModel>, options?: QueryOptions): Promise<IInsightModel | null> {
    return this.insightRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IInsightModel>, options: QueryOptions): Promise<IInsightModel | null> {
    return this.insightRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IInsightModel>,
    update: UpdateQuery<IInsightModel>,
    options?: QueryOptions
  ): Promise<IInsightModel | null> {
    return this.insightRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IInsightModel>, options?: QueryOptions): Promise<void> {
    return this.insightRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.insightRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.insightRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IInsightModel>, options?: QueryOptions): Promise<boolean> {
    return this.insightRepository.exist(filter, options);
  }

}
