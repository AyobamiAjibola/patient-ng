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
import { ICrowdFundingModel } from "../models/CrowdFunding";
import PaystackService from "../services/PaystackService";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);
const paystackService = new PaystackService();

export default class CrowdFundingontroller {

    @TryCatch
    public async activateCrowdFunding (req: Request) {
        const userId = req.user._id;
        const crowdFundingId = req.params.crowdFundingId;

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.crowdFundingDAOService.findById(crowdFundingId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));
        if(!crowdFunding)
            return Promise.reject(CustomAPIError.response("Fund raiser not found.", HttpStatus.NOT_FOUND.code));

        if(crowdFunding.status === "done") 
            return Promise.reject(CustomAPIError.response("You can not change the status, because the crowdfunding status is done.", HttpStatus.NOT_FOUND.code));

        await datasources.crowdFundingDAOService.updateByAny({ _id: crowdFunding._id }, 
            { 
                status: crowdFunding.status === "pending"
                        ? "active" 
                        : crowdFunding.status === "active"
                            ? "inactive" 
                            : "active"
            });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated crowdfunding status.'
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async getActiveCrowdfunding (req: Request) {
        const userId = req.params.userId;
        const [user] = await Promise.all([
            datasources.userDAOService.findById(userId)
        ]);

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        const crowdfunding = await datasources.crowdFundingDAOService.findByAny({
            user: user._id,
            status: { $in: ["active", "pending"] }
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: crowdfunding
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async markCrowdFundingDone (req: Request) {
        const userId = req.user._id;
        const crowdFundingId = req.params.crowdFundingId;

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.crowdFundingDAOService.findById(crowdFundingId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));
        if(!crowdFunding)
            return Promise.reject(CustomAPIError.response("Fund raiser not found.", HttpStatus.NOT_FOUND.code));

        if(crowdFunding.status === "inactive" || crowdFunding.status === "pending") 
            return Promise.reject(CustomAPIError.response("You can not change the status, becasue the crowdfunding status is eigther pending or inactive.", HttpStatus.NOT_FOUND.code));

        await datasources.crowdFundingDAOService.updateByAny({ _id: crowdFunding._id }, 
            { 
                status: "done"
            });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully marked as done.'
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchUsersCrowdFunding (req: Request) {
        const userId = req.user._id;

        const user = datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const fundraiser = await datasources.crowdFundingDAOService.findAll({ user: userId })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: fundraiser
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async createCrowdFunding (req: Request) {
        const podcast = await this.doCreateCrowdFunding(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created crowdfunding.',
            result: podcast
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateCrowdFunding (req: Request) {
        const podcast = await this.doUpdateCrowdFunding(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: podcast
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async crowdFundings (req: Request) {
        const crowdFundings = await datasources.crowdFundingDAOService.findAll({});

        const response: HttpResponse<ICrowdFundingModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: crowdFundings
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async likeCrowdFunding (req: Request) {
        const crowdFundingId = req.params.crowdFundingId;
        const userId = req.user._id;

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.crowdFundingDAOService.findById(crowdFundingId)
        ]);

        if (!user || !crowdFunding) {
            const notFoundMessage = !user ? "User not found" : "Crowd funding not found";
            return Promise.reject(CustomAPIError.response(notFoundMessage, HttpStatus.NOT_FOUND.code));
        }

        const alreadyLiked = crowdFunding.likes.some(like => like.user._id.toString() === user._id.toString());
        if (!alreadyLiked) {
            crowdFunding.likes.unshift({ user: user._id });
            await datasources.crowdFundingDAOService.updateByAny({ _id: crowdFunding._id }, { likes: crowdFunding.likes });
        } else {
            return Promise.reject(CustomAPIError.response("You already liked this campaign.", HttpStatus.NOT_FOUND.code));
        }
    
        const response: HttpResponse<ICrowdFundingModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async singleCrowdFunding (req: Request) {
        const crowdFundingId = req.params.crowdFundingId;

        const crowdFunding = await datasources.crowdFundingDAOService.findById(crowdFundingId);

        const response: HttpResponse<ICrowdFundingModel> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: crowdFunding
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteCrowdFunding (req: Request) {
        const crowdFundingId = req.params.crowdFundingId;
        const loggedInUser = req.user._id;

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(loggedInUser),
            datasources.crowdFundingDAOService.findById(crowdFundingId)
        ]);

        if(!crowdFunding) 
            return Promise.reject(CustomAPIError.response("Crowd funding not found.", HttpStatus.NOT_FOUND.code));
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        await datasources.crowdFundingDAOService.deleteById(crowdFunding._id);

        const response: HttpResponse<ICrowdFundingModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async softDeleteCrowdFunding (req: Request) {
        const crowdFundingId = req.params.crowdFundingId;
        const loggedInUser = req.user._id;

        const [user, crowdFunding] = await Promise.all([
            datasources.userDAOService.findById(loggedInUser),
            datasources.crowdFundingDAOService.findById(crowdFundingId)
        ]);

        if(!crowdFunding) 
            return Promise.reject(CustomAPIError.response("Crowd funding not found.", HttpStatus.NOT_FOUND.code));
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        await datasources.crowdFundingDAOService.updateByAny({_id: crowdFunding._id}, { status: 'deleted' });

        const response: HttpResponse<ICrowdFundingModel> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted.'
        };
      
        return Promise.resolve(response);
    }

    private async doCreateCrowdFunding(req: Request): Promise<HttpResponse<ICrowdFundingModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;

                const { error, value } = Joi.object<any>({
                    title: Joi.string().required().label('Title'),
                    description: Joi.string().required().label('Description'),
                    fundraisingFor: Joi.string().required().label('Fundraiser'),
                    accountNumber: Joi.string().required().label('Account Number'),
                    accountName: Joi.string().required().label('Account Name'),
                    bankCode: Joi.string().required().label('Bank Code'),
                    bank: Joi.string().required().label('Bank'),
                    state: Joi.string().required().label('State'),
                    lga: Joi.string().required().label('LGA'),
                    amountNeeded: Joi.string().required().label('Amount needed'),
                    image: Joi.any().label('Image'),
                    address: Joi.string().required().label('address'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
                console.log(value, 'val')
                const [user] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                ]);
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const crowdFund = await datasources.crowdFundingDAOService.findByAny({ 
                    user: user._id,
                    status: { $in: ["active", "pending"] }
                })
                if(crowdFund)
                    return reject(CustomAPIError.response("You already have an active campaign.", HttpStatus.FORBIDDEN.code))

                // const allowedUser = Generic.handleAllowedCrowdFundUser(user?.userType);
                // if(!allowedUser) 
                //     return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const basePathVid = `${UPLOAD_BASE_PATH}/video`;
                
                // const [_image, _video] = await Promise.all([
                //     Generic.handleImage(files.image as File, basePath),
                //     Generic.handleVideo(files.video as File, basePathVid)
                // ]);

                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                const { result: _video, error: vidError } = await Generic.handleVideo(files.video as File, basePathVid);
                if (vidError) {
                    return reject(CustomAPIError.response(vidError, HttpStatus.BAD_REQUEST.code));
                }
                

                // const bank = await datasources.bankDAOService.findByAny({ name: value.bank });
                // if(!bank)
                //     return Promise.reject(CustomAPIError.response("Bank does not exist", HttpStatus.NOT_FOUND.code));

                // const verificationData = await paystackService.verifyBankAccount(value.accountNumber, bank.code);

                // if (!verificationData) {
                //     return Promise.reject(
                //     CustomAPIError.response(
                //         "Account number provided is invalid.",
                //         HttpStatus.BAD_REQUEST.code
                //     )
                //     );
                // }

                const payload = {
                    ...value,
                    account: {
                        accountName: value.accountName,//verificationData.data.account_name,
                        accountNumber: value.accountNumber,
                        bank: value.bank,
                        bankCode: value.bankCode
                    },
                    image: _image ? _image : '',
                    video: _video ? _video : '',
                    user: user._id,
                    location: {
                        state: value.state,
                        lga: value.lga
                    }
                }

                const crowdFunding = await datasources.crowdFundingDAOService.create(payload as ICrowdFundingModel);

                //@ts-ignore
                return resolve(crowdFunding)

            })
        })
    }

    private async doUpdateCrowdFunding(req: Request): Promise<HttpResponse<ICrowdFundingModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;
                const crowdFundingId = req.params.crowdFundingId;

                const { error, value } = Joi.object<any>({
                    title: Joi.string().label('Title'),
                    description: Joi.string().label('Content'),
                    amountNeeded: Joi.string().label('Amount raised'),
                    image: Joi.any().label('Image'),
                    // video: Joi.any().label('Video'),
                    // fundraisingFor: Joi.string().label('Fundraiser'),
                    // accountNumber: Joi.string().label('Account Number'),
                    // bank: Joi.string().label('Bank'),
                    address: Joi.string().label('Address'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, crowdFunding] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    datasources.crowdFundingDAOService.findById(crowdFundingId)
                ]);

                if(!crowdFunding) 
                    return reject(CustomAPIError.response("Crowd funding not found.", HttpStatus.NOT_FOUND.code));

                if(crowdFunding.status !== 'pending')
                    return reject(CustomAPIError.response("You can not edit this fundraiser as it is eigther active or rejected.", HttpStatus.NOT_FOUND.code));

                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                // const allowedUser = Generic.handleAllowedCrowdFundUser(user.userType);
                // if(!allowedUser) 
                //     return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const basePathVid = `${UPLOAD_BASE_PATH}/video`;
                
                // const [_image, _video] = await Promise.all([
                //     Generic.handleImage(files.image as File, basePath),
                //     Generic.handleVideo(files.video as File, basePathVid)
                // ]);
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                const { result: _video, error: vidError } = await Generic.handleVideo(files.video as File, basePathVid);
                if (vidError) {
                    return reject(CustomAPIError.response(vidError, HttpStatus.BAD_REQUEST.code));
                }

                const payload = {
                    title: value.title ? value.title : crowdFunding.title,
                    description: value.description ? value.description : crowdFunding.description,
                    amountNeeded: value.amountNeeded ? value.amountNeeded : crowdFunding.amountNeeded,
                    image: _image ? _image : crowdFunding.image,
                    address: value.address ? value.address : crowdFunding.address,
                    // video: _video ? _video : crowdFunding.video,
                    // fundraisingFor: value.fundraisingFor ? value.fundraisingFor : crowdFunding.fundraisingFor,
                    // account: {
                    //     accountName: value.accountName ? value.accountName : crowdFunding.account.accountName,
                    //     accountNumber: value.accountNumber ? value.accountNumber : crowdFunding.account.accountNumber,
                    //     bank: value.bank ? value.bank : crowdFunding.account.bank
                    // },
                    // location: {
                    //     state: value.state ? value.state : crowdFunding.location.state,
                    //     lga: value.lga ? value.lga : crowdFunding.location.lga
                    // }
                }

                const updatedCrowdFunding = await datasources.crowdFundingDAOService.updateByAny({_id: crowdFunding._id}, payload as ICrowdFundingModel);

                //@ts-ignore
                return resolve(updatedCrowdFunding)

            })
        })
    }
}