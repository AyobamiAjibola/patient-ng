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
        
        await datasources.crowdFundingDAOService.updateByAny({ _id: crowdFunding._id }, { isAllowed: !crowdFunding.isAllowed });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: crowdFunding.isAllowed ? 'Successfully deactivated crowd funding.' : 'Successfully activated crowd funding.'
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
            message: 'Successfully created.',
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

        await datasources.crowdFundingDAOService.deleteById(crowdFunding._id);

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
                    body: Joi.string().required().label('Content'),
                    fundraisingFor: Joi.string().required().label('Fundraiser'),
                    accountNumber: Joi.string().required().label('Account Number'),
                    bank: Joi.string().required().label('Bank'),
                    // bankCode: Joi.string().required().label('Bank Code'),
                    // accountName: Joi.string().required().label('Account Name'),
                    amountNeeded: Joi.string().required().label('Amount raised'),
                    image: Joi.any().label('Image'),
                    video: Joi.any().label('Video'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                ]);
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const allowedUser = Generic.handleAllowedCrowdFundUser(user?.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const basePathVid = `${UPLOAD_BASE_PATH}/video`;
                
                const [_image, _video] = await Promise.all([
                    Generic.handleImage(files.image as File, basePath),
                    Generic.handleVideo(files.video as File, basePathVid)
                ]);

                const bank = await datasources.bankDAOService.findByAny({ name: value.bank });
                if(!bank)
                    return Promise.reject(CustomAPIError.response("Bank does not exist", HttpStatus.NOT_FOUND.code));

                const verificationData = await paystackService.verifyBankAccount(value.accountNumber, bank.code);

                if (!verificationData) {
                    return Promise.reject(
                    CustomAPIError.response(
                        "Account number provided is invalid.",
                        HttpStatus.BAD_REQUEST.code
                    )
                    );
                }

                const payload = {
                    ...value,
                    account: {
                        accountName: verificationData.data.account_name,
                        accountNumber: value.accountNumber,
                        bank: value.bank,
                        bankCode: bank.code
                    },
                    image: _image ? _image : '',
                    video: _video ? _video : '',
                    user: user._id
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
                    body: Joi.string().label('Content'),
                    amountNeeded: Joi.string().label('Amount raised'),
                    image: Joi.any().label('Image'),
                    video: Joi.any().label('Video'),
                    fundraisingFor: Joi.string().label('Fundraiser'),
                    accountNumber: Joi.string().label('Account Number'),
                    bank: Joi.string().label('Bank'),
                    accountName: Joi.string().label('Account Name'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, crowdFunding] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    datasources.crowdFundingDAOService.findById(crowdFundingId)
                ]);

                if(!crowdFunding) 
                    return reject(CustomAPIError.response("Crowd funding not found.", HttpStatus.NOT_FOUND.code));

                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const allowedUser = Generic.handleAllowedCrowdFundUser(user.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
                const basePathVid = `${UPLOAD_BASE_PATH}/video`;
                
                const [_image, _video] = await Promise.all([
                    Generic.handleImage(files.image as File, basePath),
                    Generic.handleVideo(files.video as File, basePathVid)
                ]);

                const payload = {
                    title: value.title ? value.title : crowdFunding.title,
                    body: value.body ? value.body : crowdFunding.body,
                    amountNeeded: value.amountNeeded ? value.amountNeeded : crowdFunding.amountNeeded,
                    image: _image ? _image : crowdFunding.image,
                    video: _video ? _video : crowdFunding.video,
                    fundraisingFor: value.fundraisingFor ? value.fundraisingFor : crowdFunding.fundraisingFor,
                    account: {
                        accountName: value.accountName ? value.accountName : crowdFunding.account.accountName,
                        accountNumber: value.accountNumber ? value.accountNumber : crowdFunding.account.accountNumber,
                        bank: value.bank ? value.bank : crowdFunding.account.bank
                    },
                }

                const updatedCrowdFunding = await datasources.crowdFundingDAOService.updateByAny({_id: crowdFunding._id}, payload as ICrowdFundingModel);

                //@ts-ignore
                return resolve(updatedCrowdFunding)

            })
        })
    }
}