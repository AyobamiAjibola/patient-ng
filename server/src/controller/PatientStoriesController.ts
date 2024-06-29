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
import { IPatientStoriesModel } from "../models/PatientStories";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class BlogController {

    @TryCatch
    public async createStory (req: Request) {
        const blog = await this.doCreateStory(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created.',
            result: blog
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateStory (req: Request) {
        const blog = await this.doUpdateStory(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: blog
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async singleStory (req: Request) {
        const storyId = req.params.storyId;

        const story = await datasources.patientStoriesDAOService.findById(storyId);
        if(!story)
            return Promise.reject(CustomAPIError.response("Story not found.", HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: story
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async stories (req: Request) {
        const stories = await datasources.patientStoriesDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: stories
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchUserStories (req: Request) {
        const userId = req.params.userId;

        const user = datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const stories = await datasources.patientStoriesDAOService.findAll({ user: userId })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: stories
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteStory (req: Request) {
        const userId = req.user._id;
        const storyId = req.params.storyId;
        
        const [user, story] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.patientStoriesDAOService.findById(storyId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        if(!story)
            return Promise.reject(CustomAPIError.response("Story not found.", HttpStatus.NOT_FOUND.code));

        await datasources.patientStoriesDAOService.deleteById(story._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted story.'
        };
        
        return Promise.resolve(response);

    }

    @TryCatch
    public async publishStory (req: Request) {
        const userId = req.user._id;
        const storyId = req.params.storyId;
        
        const [user, story] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.patientStoriesDAOService.findById(storyId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found..", HttpStatus.NOT_FOUND.code));

        if(!story)
            return Promise.reject(CustomAPIError.response("Story not found..", HttpStatus.NOT_FOUND.code));

        await datasources.patientStoriesDAOService.updateByAny({_id: story._id}, {status: 'published'});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully published story.'
        };
        
        return Promise.resolve(response);

    }

    @TryCatch
    public async rejectStory (req: Request) {
        const userId = req.user._id;
        const storyId = req.params.storyId;
        
        const [user, story] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.patientStoriesDAOService.findById(storyId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found..", HttpStatus.NOT_FOUND.code));

        if(!story)
            return Promise.reject(CustomAPIError.response("Story not found..", HttpStatus.NOT_FOUND.code));

        await datasources.patientStoriesDAOService.updateByAny({_id: story._id}, {status: 'rejected'});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully rejected story.'
        };
        
        return Promise.resolve(response);

    }

    private async doCreateStory(req: Request): Promise<HttpResponse<IPatientStoriesModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;

                const { error, value } = Joi.object<IPatientStoriesModel>({
                    title: Joi.string().required().label('Title'),
                    content: Joi.string().required().label('Content'),
                    image: Joi.any().label('image')
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found..", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                // const [_image] = await Promise.all([
                //     Generic.handleImage(files.image as File, basePath)
                // ]);
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }
                
                const payload: Partial<IPatientStoriesModel> = {
                    ...value,
                    image: _image ? _image : '',
                    user: user._id
                }

                const blog: any = await datasources.patientStoriesDAOService.create(payload as IPatientStoriesModel);

                return resolve(blog)

            })
        })
    }

    private async doUpdateStory(req: Request): Promise<HttpResponse<IPatientStoriesModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;
                const storyId = req.params.storyId;

                const { error, value } = Joi.object<IPatientStoriesModel>({
                    title: Joi.string().label('Title'),
                    content: Joi.string().label('Content'),
                    image: Joi.any().label('image')
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, story] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    datasources.patientStoriesDAOService.findById(storyId)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                if(!story)
                    return reject(CustomAPIError.response("Story not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                // const [_image] = await Promise.all([
                //     Generic.handleImage(files.titleImage as File, basePath)
                // ]);
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                const imagePath = 'photo/'
                if (_image && story.image) {
                    await Generic.deleteExistingImage(story.image, basePath, imagePath);
                }

                const payload: Partial<IPatientStoriesModel> = {
                    title: value.title ? value.title : story.title,
                    content: value.content ? value.content : story.content,
                    image: _image ? _image : story.image
                }

                const blog: any = await datasources.patientStoriesDAOService.updateByAny({_id: story._id}, payload as IPatientStoriesModel);

                return resolve(blog)

            })
        })
    }

}