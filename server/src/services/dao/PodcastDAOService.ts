import { FilterQuery, UpdateQuery, QueryOptions } from 'mongoose';
import {IPodcastModel} from '../../models/Podcast';
import PodcastRepository from '../../repository/PodcastRepository';

import { appModelTypes } from '../../@types/app-model';
import ICrudDAO = appModelTypes.ICrudDAO;

export default class PodcastDAOService implements ICrudDAO<IPodcastModel> {
  private podcastRepository: PodcastRepository;

  constructor(podcastRepository: PodcastRepository) {
    this.podcastRepository = podcastRepository
  }

  //@ts-ignore
  insertMany(records: ReadonlyArray<IPodcastModel>): Promise<IPodcastModel[]> {
    return this.podcastRepository.bulkCreate(records)
  }

  create(values: IPodcastModel): Promise<IPodcastModel> {
    return this.podcastRepository.save(values);
  }

  findAll(filter?: FilterQuery<IPodcastModel>, options?: QueryOptions): Promise<IPodcastModel[]> {
    return this.podcastRepository.findAll(filter, options);
  }

  findById(id: any, options?: QueryOptions): Promise<IPodcastModel | null> {
    return this.podcastRepository.findById(id, options);
  }

  findByAny(filter: FilterQuery<IPodcastModel>, options?: QueryOptions): Promise<IPodcastModel | null> {
    return this.podcastRepository.findOne(filter, options);
  }

  update(update: UpdateQuery<IPodcastModel>, options: QueryOptions): Promise<IPodcastModel | null> {
    return this.podcastRepository.update(update, { new: true, ...options });
  }

  updateByAny(
    filter: FilterQuery<IPodcastModel>,
    update: UpdateQuery<IPodcastModel>,
    options?: QueryOptions
  ): Promise<IPodcastModel | null> {
    return this.podcastRepository.updateByAny(filter, update, options)
  }

  deleteByAny(filter: FilterQuery<IPodcastModel>, options?: QueryOptions): Promise<void> {
    return this.podcastRepository.deleteByAny(filter, options);
  }

  deleteAll(options?: QueryOptions): Promise<void> {
    return this.podcastRepository.deleteAll(options);
  }

  deleteById(id: any, options?: QueryOptions): Promise<void> {
    return this.podcastRepository.deleteById(id, options);
  }

  exist(filter: FilterQuery<IPodcastModel>, options?: QueryOptions): Promise<boolean> {
    return this.podcastRepository.exist(filter, options);
  }

}