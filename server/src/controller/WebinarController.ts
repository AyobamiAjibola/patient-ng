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
import WebinarCategory from "../models/WebinarCategory";
import { IWebinarModel } from "../models/Webinar";
import WatchOnDemand, { IWatchOnDemandModel } from "../models/WatchOnDemand";
import mail_template from "../resources/template/email/password";
import SendMailService from "../services/SendMailService";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);
const sendMailService = new SendMailService();

export default class BlogController {

    @TryCatch
    public async createWebinarCategory (req: Request) {
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            name: Joi.string().required().label('Name')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const categoryExist = await WebinarCategory.findOne({ name: value.name.toLowerCase() });
        if(categoryExist) 
            return Promise.reject(CustomAPIError.response("Webinar category already exist.", HttpStatus.BAD_REQUEST.code))
    
        await WebinarCategory.create({name: value.name.toLowerCase()});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created webinar category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async deleteWebinarCategory (req: Request) {
        const loggedInUser = req.user._id;
        const webinarCategoryId = req.params.webinarCategoryId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
        const webinarCat = await WebinarCategory.findById(webinarCategoryId);
        if(!webinarCat)
            return Promise.reject(CustomAPIError.response("Webinar category not found.", HttpStatus.NOT_FOUND.code));

        await WebinarCategory.findByIdAndDelete(webinarCat._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted webinar category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async fetchWebinarCategories () {
        
        const webinars = await WebinarCategory.find({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: webinars
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async createWebinar (req: Request) {
        const webinar = await this.doCreateWebinar(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created.',
            result: webinar
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateWebinar (req: Request) {
        const webinar = await this.doUpdateWebinar(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: webinar
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async webinars (req: Request) {
        const webinars = await datasources.webinarDAOService.findAll({});

        const response: HttpResponse<IWebinarModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: webinars
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchUsersWebinars (req: Request) {
        const userId = req.user._id;

        const user = datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const webinars = await datasources.webinarDAOService.findAll({ user: userId })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: webinars
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async singleWebinar (req: Request) {
        const webinarId = req.params.webinarId;
        const webinar = await datasources.webinarDAOService.findById(webinarId);

        const response: HttpResponse<IWebinarModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: webinar
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteWebinar (req: Request) {
        const webinarId = req.params.webinarId;
        const loggedInUser = req.user._id;

        const [user, webinar] = await Promise.all([
            datasources.userDAOService.findById(loggedInUser),
            datasources.webinarDAOService.findById(webinarId)
        ]);

        if(!webinar) 
            return Promise.reject(CustomAPIError.response("Webinar not found.", HttpStatus.NOT_FOUND.code));
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        await datasources.webinarDAOService.deleteById(webinar._id);

        const response: HttpResponse<IWebinarModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted webinar.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async webinarWaitlist (req: Request) {
        const waitlist = await WatchOnDemand.find({})

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted webinar.',
            results: waitlist
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async createWebinarWaitlist (req: Request) {
        const { error, value } = Joi.object<IWatchOnDemandModel>({
            firstName: Joi.string().label('first name'),
            lastName: Joi.string().label('last name'),
            email: Joi.string().required().label('email'),
            phone: Joi.string().required().label('phone')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const userEmail = await WatchOnDemand.findOne({ email: value.email });
        const userPhone = await WatchOnDemand.findOne({ phone: value.phone });

        if (userPhone) {
            return Promise.reject(CustomAPIError.response("User with phone numbercalready exists.", HttpStatus.BAD_REQUEST.code));
        };

        if (userEmail) {
            return Promise.reject(CustomAPIError.response("User with email already exists.", HttpStatus.BAD_REQUEST.code));
        }

        await WatchOnDemand.create({...value, email: value.email.toLowerCase()} as IWatchOnDemandModel);

        const response: HttpResponse<IWatchOnDemandModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async deleteWebinarWaitlist (req: Request) {
        const userId = req.user._id;
        const watchOnDemandId = req.params.watchOnDemandId;

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        if(user && !user.isAdmin) 
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const watchOnDemand = await WatchOnDemand.findById(watchOnDemandId);
        if(!watchOnDemand) 
            return Promise.reject(CustomAPIError.response("Not found.", HttpStatus.NOT_FOUND.code));

        await WatchOnDemand.deleteOne({ _id: watchOnDemand._id });

        const response: HttpResponse<IWatchOnDemandModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted.'
        };
      
        return Promise.resolve(response);
    }

    private async doCreateWebinar(req: Request): Promise<HttpResponse<IWebinarModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;

                const { error, value } = Joi.object<IWebinarModel>({
                    title: Joi.string().required().label('Title'),
                    category: Joi.string().required().label('Category'),
                    webinarLink: Joi.string().required().label('Webinar link'),
                    summary: Joi.string().required().label('Summary'),
                    speakers: Joi.array().items({
                        fullName: Joi.string().required().label('Full Name'),
                        title: Joi.string().allow('').label('Full Name'),
                        image: Joi.any().label('image')
                    }),
                    hostedBy: Joi.array().items({
                        image: Joi.any().label('image'),
                        name: Joi.string().required().label('hosted by'),
                    })
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, category] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    WebinarCategory.findOne({name: value.category})
                ]);

                const allowedUser = Generic.handleAllowedWebinarUser(user?.userType);
                if(!allowedUser) 
                    return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
                
                if(!category)
                    return reject(CustomAPIError.response("Category not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;

                // const handleSpeakers = async (speakers: any[]) => {
                //     const promises = speakers.map(async (speaker) => {
                //         let imagePath;
                //         if (speaker.speakerImage) {
                //             const speakerImg = speaker.speakerImage 
                //             const file = speakerImg as File;
                //             imagePath = await Generic.handleImage(file, basePath);
                //         }
                //         return {
                //             fullName: speaker.fullName,
                //             title: speaker.title,
                //             speakerImage: imagePath
                //         };
                //     });
                //     return Promise.all(promises);
                // };

                // const handleHostedBy = async (hosts: any[]) => {
                //     const promises = hosts.map(async (host) => {
                //         let imagePath;
                //         if (host.hostedByImage) {
                //             const hostImg = host.hostedByImage;
                //             const file = hostImg as File;
                //             imagePath = await Generic.handleImage(file, basePath);
                //         }
                //         return {
                //             name: host.name,
                //             hostedByImage: imagePath
                //         };
                //     });
                //     return Promise.all(promises);
                // };
                
                const [actualSpeakers, actualHostedBy] = await Promise.all([
                    Generic.handleImages(value.speakers, basePath),
                    Generic.handleImages(value.hostedBy, basePath)
                ]);

                const payload = {
                    ...value,
                    category: category.name,
                    speakers: actualSpeakers,
                    hostedBy: actualHostedBy,
                    user: user?._id
                }

                const webinar: any = await datasources.webinarDAOService.create(payload as unknown as IWebinarModel);

                const onDemandUserEmails = await WatchOnDemand.find();
                if(onDemandUserEmails.length > 0) {
                    const emails = onDemandUserEmails.map(user => user.email);
                    const mail = mail_template({
                        message: `Hi, a new webinar just dropped. Click on this link to watch: ${process.env.CLIENT_URL}/webinar/${webinar._id}`
                    });
    
                    await sendMailService.sendMail({
                        to: emails,
                        replyTo: process.env.SMTP_EMAIL_FROM,
                        // @ts-ignore
                        'reply-to': process.env.SMTP_EMAIL_FROM,
                        from: {
                        name: 'iPatient',
                        address: <string>process.env.SMTP_EMAIL_FROM,
                        },
                        subject: `iPatient has sent you a webinar.`,
                        html: mail,
                        bcc: [<string>process.env.SMTP_BCC]
                    })
                };

                return resolve(webinar)

            })
        })
    }

    private async doUpdateWebinar(req: Request): Promise<HttpResponse<IWebinarModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;
                const webinarId = req.params.webinarId;

                const { error, value } = Joi.object<IWebinarModel>({
                    title: Joi.string().label('Title'),
                    category: Joi.string().label('Category'),
                    webinarLink: Joi.string().label('Webinar link'),
                    summary: Joi.string().label('Summary'),
                    speakers: Joi.array().items({
                        fullName: Joi.string().label('Full Name'),
                        title: Joi.string().allow('').label('Full Name'),
                        image: Joi.any().label('image')
                    }),
                    hostedBy: Joi.array().items({
                        image: Joi.any().label('image'),
                        name: Joi.string().label('hosted by'),
                    })
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, category, webinar] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    WebinarCategory.findOne({name: value.category}),
                    datasources.webinarDAOService.findById(webinarId)
                ]);

                const allowedUser = Generic.handleAllowedWebinarUser(user?.userType);
                if(!allowedUser) 
                    return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
                if(!webinar) 
                    return reject(CustomAPIError.response("Webinar not found.", HttpStatus.NOT_FOUND.code));
                if(!category)
                    return reject(CustomAPIError.response("Category not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                
                const [actualSpeakers, actualHostedBy] = await Promise.all([
                    Generic.handleImages(value.speakers, basePath),
                    Generic.handleImages(value.hostedBy, basePath)
                ]);

                const payload = {
                    title: value.title ? value.title : webinar.title,
                    webinarLink: value.webinarLink ? value.webinarLink : webinar.webinarLink,
                    summary: value.summary ? value.summary : webinar.summary,
                    category: value.category ? category.name : webinar.category,
                    speakers: actualSpeakers.length > 0 ? actualSpeakers : webinar.speakers,
                    hostedBy: actualHostedBy.length > 0 ? actualHostedBy : webinar.hostedBy
                }

                const updatedWebinar: any = await datasources.patientStoriesDAOService.updateByAny({_id: webinar._id}, {payload});

                return resolve(updatedWebinar)

            })
        })
    }
}