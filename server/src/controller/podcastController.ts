import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import { Request } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import formidable, { File } from 'formidable';
import {  UPLOAD_BASE_PATH } from "../config/constants";
import Generic from "../utils/Generic";
import PodcastCategory from "../models/PodcastCategory";
import { IPodcastModel } from "../models/Podcast";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class PodcastController {

    @TryCatch
    public async createPodcastCategory (req: Request) {
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            name: Joi.string().required().label('Name')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const categoryExist = await PodcastCategory.findOne({ name: value.name.toLowerCase() });
        if(categoryExist) 
            return Promise.reject(CustomAPIError.response("Podcast category already exist.", HttpStatus.BAD_REQUEST.code))
    
        await PodcastCategory.create({name: value.name.toLowerCase()});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created podcast category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async deletePodcastCategory (req: Request) {
        const loggedInUser = req.user._id;
        const podcastCategoryId = req.params.podcastCategoryId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
        const podcastCat = await PodcastCategory.findById(podcastCategoryId);
        if(!podcastCat)
            return Promise.reject(CustomAPIError.response("Podcast category not found.", HttpStatus.NOT_FOUND.code));

        await PodcastCategory.findByIdAndDelete(podcastCat._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted podcast category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async fetchPodcastCategories () {
        
        const podcasts = await PodcastCategory.find({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: podcasts
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchUsersPodcasts (req: Request) {
        const userId = req.user._id;

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        let podcasts;
        if(user.userType.includes('admin')) {
            podcasts = await datasources.podcastDAOService.findAll({});
        } else {
            podcasts = await datasources.podcastDAOService.findAll({ user: user._id });
        }

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: podcasts
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async changePodcastStatus (req: Request) {
        const podcastId = req.params.podcastId;
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            status: Joi.string().required().label('Status')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const [user, podcast] = await Promise.all([
            datasources.userDAOService.findById(loggedInUser),
            datasources.podcastDAOService.findById(podcastId)
        ]);

        if(!podcast) 
            return Promise.reject(CustomAPIError.response("Podcast not found.", HttpStatus.NOT_FOUND.code));
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        await datasources.podcastDAOService.updateByAny({_id: podcast._id}, { status: value.status });

        const response: HttpResponse<IPodcastModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated podcast status.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async createPodcast (req: Request) {
        const podcast = await this.doCreatePodcast(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created.',
            result: podcast
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updatePodcast (req: Request) {
        const podcast = await this.doUpdatePodcast(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: podcast
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async podcasts (req: Request) {
        const podcasts = await datasources.podcastDAOService.findAll({}, { sort: { createdAt: -1 } });

        const response: HttpResponse<IPodcastModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: podcasts
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async singlePodcast (req: Request) {
        const podcastId = req.params.podcastId;
        const podcast = await datasources.podcastDAOService.findById(podcastId);

        const response: HttpResponse<IPodcastModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: podcast
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deletePodcast (req: Request) {
        const podcastId = req.params.podcastId;
        const loggedInUser = req.user._id;

        const [user, podcast] = await Promise.all([
            datasources.userDAOService.findById(loggedInUser),
            datasources.podcastDAOService.findById(podcastId)
        ]);

        if(!podcast) 
            return Promise.reject(CustomAPIError.response("Podcast not found.", HttpStatus.NOT_FOUND.code));
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        await datasources.podcastDAOService.deleteById(podcast._id);

        const response: HttpResponse<IPodcastModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted podcast.'
        };
      
        return Promise.resolve(response);
    }

    private async doCreatePodcast(req: Request): Promise<HttpResponse<IPodcastModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;

                const { error, value } = Joi.object<any>({
                    title: Joi.string().required().label('Title'),
                    category: Joi.string().required().label('Category'),
                    summary: Joi.string().required().label('Summary'),
                    duration: Joi.string().required().label('Duration'),
                    producedBy: Joi.string().required().label('Produced by'),
                    source: Joi.string().required().label('Podcast source'),
                    image: Joi.any().label('Image'),
                    status: Joi.string().label('Status'),
                    releaseDate: Joi.any().label('Release date')
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, category] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    PodcastCategory.findOne({name: value.category})
                ]);

                const allowedUser = Generic.handleAllowedPodcastUser(user?.userType);
                if(!allowedUser) 
                    return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                if(!category)
                    return reject(CustomAPIError.response("Category not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);

                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                let sources = []
                if(value.source) {
                    const _sources = JSON.parse(value.source);
                    for (const src of _sources) {
                        if (src.source === '' || src.link === '') {
                          return reject(CustomAPIError.response("Link or source cannot be empty.", HttpStatus.FORBIDDEN.code));
                        }
                    
                        const { result: link, error: linkError } = await Generic.handlePodcastLink(src.source, src.link);
                        if (linkError) {
                          return reject(CustomAPIError.response(linkError, HttpStatus.FORBIDDEN.code));
                        }
                    
                        sources.push({ source: src.source, link: link });
                      }
                }

                const payload = {
                    ...value,
                    channels: sources,
                    category: category.name,
                    user: user?._id,
                    image: _image ? _image : ''
                }

                const podcast: any = await datasources.podcastDAOService.create(payload as unknown as IPodcastModel);

                return resolve(podcast)

            })
        })
    }

    private async doUpdatePodcast(req: Request): Promise<HttpResponse<IPodcastModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;
                const podcastId = req.params.podcastId;

                const { error, value } = Joi.object<any>({
                    title: Joi.string().label('Title'),
                    category: Joi.string().label('Category'),
                    summary: Joi.string().label('Summary'),
                    duration: Joi.string().label('Duration'),
                    producedBy: Joi.string().label('Produced by'),
                    source: Joi.string().label('Podcast source'),
                    image: Joi.any().label('Image'),
                    status: Joi.string().label('Status'),
                    releaseDate: Joi.any().label('Release date')
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, category, podcast] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    PodcastCategory.findOne({name: value.category}),
                    datasources.podcastDAOService.findById(podcastId)
                ]);

                const allowedUser = Generic.handleAllowedPodcastUser(user?.userType);
                if(!allowedUser) 
                    return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
                if(!podcast) 
                    return reject(CustomAPIError.response("Podcast not found.", HttpStatus.NOT_FOUND.code));

                if(!category)
                    return reject(CustomAPIError.response("Category not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);

                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                let sources = []
                if(value.source) {
                    const _sources = JSON.parse(value.source);
                    for (const src of _sources) {
                        if (src.source === '' || src.link === '') {
                          return reject(CustomAPIError.response("Link or source cannot be empty.", HttpStatus.FORBIDDEN.code));
                        }
                    
                        const { result: link, error: linkError } = await Generic.handlePodcastLink(src.source, src.link);
                        if (linkError) {
                          return reject(CustomAPIError.response(linkError, HttpStatus.FORBIDDEN.code));
                        }
                    
                        sources.push({ source: src.source, link: link });
                      }
                }

                const payload = {
                    title: value.title ? value.title : podcast.title,
                    category: value.category ? category.name : podcast.category,
                    channels: sources.length > 0 ? sources : podcast.channels,
                    producedBy: value.producedBy ? value.producedBy : podcast.producedBy,
                    image: _image ? _image : podcast.image,
                    summary: value.summary ? value.summary : podcast.summary,
                    duration: value.duration ? value.duration : podcast.duration,
                    status: value.status ? value.status : podcast.status,
                    releaseDate: value.releaseDate ? value.releaseDate : podcast.releaseDate
                }

                const updatedPodcast: any = await datasources.podcastDAOService.updateByAny({_id: podcast._id}, payload as unknown as IPodcastModel);

                return resolve(updatedPodcast)

            })
        })
    }
}