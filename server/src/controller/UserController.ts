import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import { Request } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import { IUserModel } from "../models/User";
import formidable, { File } from 'formidable';
import { UPLOAD_BASE_PATH } from "../config/constants";
import Generic from "../utils/Generic";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class UserController {

    @TryCatch
    public async getAllUsers (req: Request) {
        const userId = req.user._id;

        const user = await datasources.userDAOService.findById(userId);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const users = await datasources.userDAOService.findAll({});
        const filteredUsers = users.filter(user => user.email !== "ipatient_admin@ipatient.com");

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: filteredUsers
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async deactivateUser (req: Request) {
        const loggedInUser = req.user._id;
        const userId = req.params.userId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        const userExist = await datasources.userDAOService.findById(userId);
        if(!userExist) return Promise.reject(CustomAPIError.response("User does not exist.", HttpStatus.NOT_FOUND.code));

        await datasources.userDAOService.updateByAny(
            { _id: userExist._id },
            { active: !userExist.active }
        )

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated user.'
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleUser (req: Request) {
        const userId = req.params.userId;

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: user
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async updateUserOnboarding (req: Request) {
        // const userId = req.params.userId;
        const userId = req.user._id;

        const { error, value } = Joi.object<any>({
            age: Joi.string().label('Age'),
            gender: Joi.string().required().label('Gender'),
            address: Joi.string().label('Address'),
            state: Joi.string().label('State'),
            lga: Joi.string().label('LGA'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        // let phone = '';
        // if(value.phone) {
        //     phone = value.phone.replace(/(^\+?(234)?0?)/, '234');

        //     const user_phone = await datasources.userDAOService.findByAny({
        //         phone: phone
        //     });
            
        //     if(user.phone && user.phone !== phone){
        //         if(user_phone) {
        //             return Promise.reject(CustomAPIError.response('User with this phone number already exists.', HttpStatus.NOT_FOUND.code))
        //         }
        //     };
        // }

        // if(value.email) {
        //     const user_email = await datasources.userDAOService.findByAny({
        //         email: value.email.toLowerCase()
        //     });
            
        //     if(user.email && user.email !== value.email.toLowerCase()){
        //         if(user_email) {
        //             return Promise.reject(CustomAPIError.response('User with this email address already exists.', HttpStatus.NOT_FOUND.code))
        //         }
        //     };
        // }

        // let healthInterests;
        // if(value.healthInterests) {
        //     healthInterests = JSON.parse(value.healthInterests)
        // }

        const payload: Partial<IUserModel> = {
            state: value.state,
            lga: value.lga,
            age: value.age ? value.age : user.age,
            gender: value.gender ? value.gender : user.gender,
            address: value.address ? value.address : user.address,
            level: 2
        };

        await datasources.userDAOService.updateByAny({_id: user._id}, payload as IUserModel)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };

        return Promise.resolve(response);
        
    }

    @TryCatch
    public async updateUserProfile (req: Request) {
        const user = await this.doUpdateUserProfile(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: user
        };
      
        return Promise.resolve(response);
    }

    private async doUpdateUserProfile(req: Request): Promise<HttpResponse<IUserModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const userId = req.params.userId;

                const { error, value } = Joi.object<any>({
                    email: Joi.string().label('Email'),
                    firstName: Joi.string().label('First Name'),
                    lastName: Joi.string().label('Last Name'),
                    phone: Joi.string().label('Phone Number'),
                    age: Joi.string().label('Age'),
                    gender: Joi.string().label('Gender'),
                    address: Joi.string().label('Address'),
                    // healthInterests: Joi.string().label('Health Interests'),
                    image: Joi.any().label('image'),
                    userType: Joi.string().label('user type'),
                    state: Joi.string().label('State'),
                    lga: Joi.string().label('LGA'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(userId)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                const [_image] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath)
                ]);

                const imagePath = 'photo/'
                if (_image && user.image) {
                    await Generic.deleteExistingImage(user.image, basePath, imagePath);
                };

                // let healthInterests;
                // if(value.healthInterests) {
                //     healthInterests = JSON.parse(value.healthInterests)
                // }

                let userType;
                if(value.userType) {
                    userType = JSON.parse(value.userType)
                }

                const payload: Partial<IUserModel> = {
                    email: value.email 
                            ? user.isAdmin
                                ? user.email : value.email
                            : user.email,
                    firstName: value.firstName ? value.firstName : user.firstName,
                    lastName: value.lastName ? value.lastName : user.lastName,
                    phone: value.phone ? value.phone : user.phone,
                    age: value.age ? value.age : user.age,
                    gender: value.gender ? value.gender : user.gender,
                    address: value.address ? value.address : user.address,
                    // healthInterests: healthInterests.length > 0 ? healthInterests : user.healthInterests,
                    userType: userType.length > 0 ? userType : user.userType,
                    state: value.state ? value.state : user.state,
                    lga: value.lga ? value.lga : user.lga
                }

                const updatedUser: any = await datasources.userDAOService.updateByAny({_id: user._id}, payload as IUserModel);

                return resolve(updatedUser)

            })
        })
    }
}