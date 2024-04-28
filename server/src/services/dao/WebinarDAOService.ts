import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IWebinarModel} from '../../models/Webinar';
import WebinarRepository from '../../repository/WebinarRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class WebinarDAOService implements ICrudDAO<IWebinarModel> {
  private webinarRepository: WebinarRepository;

  constructor(webinarRepository: WebinarRepository) {
    this.webinarRepository = webinarRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IWebinarModel>): Promise<IWebinarModel[]> {
    return this.webinarRepository.bulkCreate(records)
  }

  create(values: IWebinarModel): Promise<IWebinarModel> {
    return this.webinarRepository.save(values);
  }

  findAll(filter?: FilterQuery<IWebinarModel>, options?: QueryOptions): Promise<IWebinarModel[]> {
    return this.webinarRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IWebinarModel | null> {
    return this.webinarRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IWebinarModel>, options?: QueryOptions): Promise<IWebinarModel | null> {
    return this.webinarRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IWebinarModel>, options: QueryOptions): Promise<IWebinarModel | null> {
    return this.webinarRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IWebinarModel>,
    update: UpdateQuery<IWebinarModel>,
    options?: QueryOptions
  ): Promise<IWebinarModel | null> {
    return this.webinarRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IWebinarModel>, options?: QueryOptions): Promise<void> {
    return this.webinarRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.webinarRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.webinarRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IWebinarModel>, options?: QueryOptions): Promise<boolean> {
    return this.webinarRepository.exist(filter, options);
  }

}