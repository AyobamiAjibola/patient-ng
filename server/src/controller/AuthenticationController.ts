import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import BcryptPasswordEncoder = appCommonTypes.BcryptPasswordEncoder;
import { Request } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import settings from "../config/settings";
import RedisService from "../services/RedisService";
import SendMailService from "../services/SendMailService";
import { IUserModel } from "../models/User";
import Generic from "../utils/Generic";
import mail_template from "../resources/template/email/password";
import contact_us from "../resources/template/email/contactUs";
import UserToken from "../models/UserToken";
import { verify } from 'jsonwebtoken';

const redisService = new RedisService();
const sendMailService = new SendMailService();

interface TokenTypes {
    accessToken: string, 
    refreshToken?: string
}

export default class AuthenticationController {
    private readonly passwordEncoder: BcryptPasswordEncoder | undefined;

    constructor(passwordEncoder?: BcryptPasswordEncoder) {
      this.passwordEncoder = passwordEncoder;
    };

    @TryCatch
    public async sendSignUpToken (req: Request) {
        const { error, value } = Joi.object<IUserModel>({
            email: Joi.string().required().label('Email')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));


        const userEmail = await datasources.userDAOService.findByAny({email: value.email.toLowerCase()})
        if (userEmail) {
            return Promise.reject(CustomAPIError.response("The email address is already in use by another account.", HttpStatus.BAD_REQUEST.code));
        }
        
        const emailOtp = Generic.generatePasswordResetCode(6);
       
        const otpData = JSON.stringify({ otp: emailOtp });
        
        redisService.saveToken(value.email, otpData, 120);

        //SEND OTP TO USER EMAIL
        const mail = mail_template({
            message: `Your otp is: ${emailOtp}`
          });

        await sendMailService.sendMail({
            to: value.email,
            replyTo: process.env.SMTP_EMAIL_FROM,
            // @ts-ignore
            'reply-to': process.env.SMTP_EMAIL_FROM,
            from: {
              name: 'iPatient',
              address: <string>process.env.SMTP_EMAIL_FROM,
            },
            subject: `iPatient has sent you an otp.`,
            html: mail,
            bcc: [<string>process.env.SMTP_BCC]
        })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: `An otp has been sent to your email address.`,
            result: {
                emailOtp: emailOtp
            }
        };

        return Promise.resolve(response);
    }

    public async contactUs(req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            phone: Joi.string().required().label('Phone Number'),
            message: Joi.string().required().label('Message'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const mail = contact_us({
            message: value.message,
            phone: value.phone,
        });

        await sendMailService.sendMail({
            to: 'ayurbarmi5@gmail.com',
            replyTo: value.email,
            // @ts-ignore
            'reply-to': value.email,
            from: {
              name: `${value.firstName} ${value.lastName}`,
              address: value.email,
            },
            subject: `You have a contact us email from ${value.firstName}.`,
            html: mail,
            bcc: [<string>process.env.SMTP_BCC]
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: `Successful.`
        };

        return Promise.resolve(response);
 
    }

    public async validateSignUpToken (req: Request) {
        try {

            const { error, value } = Joi.object<any>({
                email: Joi.string().required().label('Email'),
                emailOtp: Joi.string().required().label('Email Otp')
            }).validate(req.body);
            if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
            
            const [redisDataEmail]: any = await Promise.all([
                redisService.getToken(value.email)
            ]);
    
            if (redisDataEmail) {
                const emailOtp = redisDataEmail?.otp;
    
                if (emailOtp !== value.emailOtp) {
                    return Promise.reject(CustomAPIError.response("The OTP you entered is incorrect.", HttpStatus.BAD_REQUEST.code));
                }
    
                const response: HttpResponse<any> = {
                    code: HttpStatus.OK.code,
                    message: 'Successful.',
                };
    
                await Promise.all([
                    redisService.deleteRedisKey(value.email)
                ]);
    
                return response;
            } else {
                // Otp not found in Redis
                return Promise.reject(CustomAPIError.response('Otp has expired', HttpStatus.BAD_REQUEST.code))
            }
        
        } catch (error) {
            console.error(error, 'token error when getting');
            return Promise.reject(CustomAPIError.response('Failed to retrieve token please try again later', HttpStatus.BAD_REQUEST.code))
        }

    }

    @TryCatch
    public async signUpUser (req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            phone: Joi.string().required().label('Phone Number'),
            isAdvocate: Joi.boolean().required().label('Advocate'),
            password: Joi.string()
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
                .messages({
                "string.pattern.base": `Password does not meet requirement.`,
                })
                .required()
                .label("password"),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const password = await this.passwordEncoder?.encode(value.password as string);

        const payload: Partial<IUserModel> = {
            ...value,
            password: password,
            email: value.email.toLowerCase(),
            userType: value.isAdvocate ? ['user', 'advocacy'] : [ 'user' ]
        }

        const user = await datasources.userDAOService.create(payload as IUserModel);

        const { accessToken, refreshToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: 1,
            isAdmin: user.isAdmin,
            userType: user.userType,
            fullName: `${user.firstName} ${user.lastName}`
        });

        const response: HttpResponse<IUserModel> = {
            message: `User created successfully.`,
            code: HttpStatus.OK.code,
            result: user,
            tokens: {accessToken, refreshToken}
          };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async googleSignUpUser (req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            googleId: Joi.string().required().label('Google ID'),
            image:  Joi.string().optional().allow('').label('Image'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const payload: Partial<IUserModel> = {
            ...value,
            email: value.email,
            userType: [ 'user' ],
        }

        const user = await datasources.userDAOService.create(payload as IUserModel);

        const { accessToken, refreshToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: 1,
            isAdmin: user.isAdmin,
            userType: user.userType,
            fullName: `${user.firstName} ${user.lastName}`
        });

        const response: HttpResponse<IUserModel> = {
            message: `User created successfully.`,
            code: HttpStatus.OK.code,
            result: user,
            tokens: {accessToken, refreshToken}
          };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async googleSignIn (req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findByAny({ email: value.email });
        if(!user) 
            return Promise.reject(CustomAPIError.response("User with this email does not exist.", HttpStatus.NOT_FOUND.code))
        
        const { accessToken, refreshToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: user.level,
            isAdmin: user.isAdmin,
            userType: user.userType,
            fullName: `${user.firstName} ${user.lastName}`
        });

        const response: HttpResponse<IUserModel> = {
            message: `User created successfully.`,
            code: HttpStatus.OK.code,
            result: user,
            tokens: {accessToken, refreshToken}
          };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async createUser (req: Request) {
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            firstName: Joi.string().required().label('First Name'),
            lastName: Joi.string().required().label('Last Name'),
            userType: Joi.array().required().label('user type')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const adminUser = await datasources.userDAOService.findById(loggedInUser);

        if(adminUser && !adminUser.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const existingUser = await datasources.userDAOService.findByAny({ email: value.email.toLowerCase() });
        if(existingUser)
            return Promise.reject(CustomAPIError.response("User with this email already exist.", HttpStatus.FORBIDDEN.code));

        const password = await this.passwordEncoder?.encode("Password12@" as string);

        const payload: Partial<IUserModel> = {
            ...value,
            password: password,
            email: value.email.toLowerCase(),
            userType: value.userType,
            isPasswordDefault: true,
            isAdmin: true
        }

        await datasources.userDAOService.create(payload as IUserModel);

        const response: HttpResponse<IUserModel> = {
            message: `User created successfully.`,
            code: HttpStatus.OK.code,
          };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async signInUser (req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            password: Joi.string()
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
                .messages({
                "string.pattern.base": `Password does not meet requirement.`,
                })
                .required()
                .label("password"),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findByAny({email: value.email});
        if(!user) return Promise.reject(CustomAPIError.response("User with this email does not exist.", HttpStatus.BAD_REQUEST.code));

        if(user && user.googleId) return Promise.reject(CustomAPIError.response("You tried signing in with a different authentication method than the one you used during signup.", HttpStatus.UNAUTHORIZED.code));

        const hash = user.password as string;
        const password = value.password as string;

        const isMatch = await this.passwordEncoder?.match(password.trim(), hash ? hash.trim() : '');
        if(!isMatch) return Promise.reject(CustomAPIError.response(`${HttpStatus.UNAUTHORIZED.value}. Invalid Password.`, HttpStatus.UNAUTHORIZED.code));

        if(!user.active)
            return Promise.reject(
                CustomAPIError.response('Account is disabled. Please contact administrator', HttpStatus.UNAUTHORIZED.code)
            );

        const { accessToken, refreshToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: user.level,
            isAdmin: user.isAdmin,
            userType: user.userType,
            fullName: `${user.firstName} ${user.lastName}`
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Login successful.',
            result: {userId: user._id},
            tokens: {accessToken, refreshToken}
        };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async signInAdminUser (req: Request) {
        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email'),
            password: Joi.string()
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*\W)(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
                .messages({
                    "string.pattern.base": `Password does not meet requirement.`,
                })
                .required()
                .label("password"),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findByAny({email: value.emailOrPhone});
        if(!user) return Promise.reject(CustomAPIError.response("User with this email does not exist.", HttpStatus.BAD_REQUEST.code));

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const hash = user.password as string;
        const password = value.password as string;

        const isMatch = await this.passwordEncoder?.match(password.trim(), hash ? hash.trim() : '');
        if(!isMatch) return Promise.reject(CustomAPIError.response(`${HttpStatus.UNAUTHORIZED.value}. Invalid password.`, HttpStatus.UNAUTHORIZED.code));

        const { accessToken, refreshToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: user.level
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Login successful.',
            result: {userId: user._id},
            tokens: {accessToken, refreshToken}
        };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async resetUserPassword(req: Request) {
        const loggedInUser = req.user._id;
        const { error, value } = Joi.object({
            email: Joi.string().required().label('Email'),
          }).validate(req.body);
        if (error)
          return Promise.reject(
            CustomAPIError.response(
              error.details[0].message,
              HttpStatus.BAD_REQUEST.code
            )
        );

        const adminUser = await datasources.userDAOService.findById(loggedInUser);

        if(adminUser && !adminUser.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
        const user = await datasources.userDAOService.findByAny({ email: value.email });
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        const defaultPass = "Ipatientuser12";
        const password = await this.passwordEncoder?.encode(defaultPass as string);

        await datasources.userDAOService.updateByAny(
            { _id: user._id },
            { password: password }
        )
    
        const response: HttpResponse<IUserModel> = {
            message: `Password reset was successful.`,
            code: HttpStatus.OK.code
        };
    
        return Promise.resolve(response);

    }

    @TryCatch
    public async changePassword(req: Request) {
  
      const userId = req.user._id;
  
      const { error, value } = Joi.object({
        newPassword: Joi.string()
          .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
          .messages({
            "string.pattern.base": `Password does not meet requirement.`,
          })
          .required()
          .label("password"),
        currentPassword: Joi.string().required(),
      }).validate(req.body);
  
        if (error)
          return Promise.reject(
            CustomAPIError.response(
              error.details[0].message,
              HttpStatus.BAD_REQUEST.code
            )
          );
  
      const user = await datasources.userDAOService.findById(userId);
      if(!user)
        return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

      //verify password
      const hash = user.password;
      const password = value.currentPassword;
  
      const isMatch = await this.passwordEncoder?.match(
        password.trim(),
        hash.trim()
      );
    
        if(!isMatch)
            return Promise.reject(
            CustomAPIError.response("The old password does not match, with your current.",
            HttpStatus.NOT_FOUND.code));

        const _password = await this.passwordEncoder?.encode(value.newPassword as string);
  
        await datasources.userDAOService.updateByAny(
            { _id: user._id },
            { password: _password }
        )
    
        const response: HttpResponse<IUserModel> = {
            message: `Password changed successfully.`,
            code: HttpStatus.OK.code
        };
    
        return Promise.resolve(response);
  
    }

    @TryCatch
    public async getAccessToken(req: Request) {
        const { error, value } = Joi.object<any>({
            refreshToken: Joi.string().required().label('Refresh token'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        // verify the refresh token and get the payload
        const data: any = verify(value.refreshToken, settings.jwtRefreshToken.key as string);

        const dbToken = await UserToken.findOne({
            userId: data.userId,
            expired_at: { $gte: new Date() }
        });
  
        if (!dbToken) {
            return Promise.reject(CustomAPIError.response('Session has expired.', HttpStatus.BAD_REQUEST.code))
        }

        const user = await datasources.userDAOService.findById(data.userId);
        if(!user) return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        const { accessToken }: TokenTypes = await Generic.generateJWT({
            userId: user._id,
            level: user.level
        });

        const response: HttpResponse<any> = {
            message: `Successful.`,
            code: HttpStatus.OK.code,
            result: accessToken
        };
    
        return Promise.resolve(response);

    }

    @TryCatch
    public async sendPasswordResetLink(req: Request) {

        const { error, value } = Joi.object<any>({
            email: Joi.string().required().label('Email')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const resetPasswordLink = `${Generic.generatePasswordResetLink(4)}`;
        const currentDate = new Date();

        const user = await datasources.userDAOService.findByAny({email: value.email.toLowerCase()});
        if(!user) return Promise.reject(CustomAPIError.response("User with the provided email not found.", HttpStatus.NOT_FOUND.code));
 
        await datasources.userDAOService.updateByAny(
            { _id: user._id },
            {
                passwordReset: {
                    code: resetPasswordLink,
                    exp: new Date(currentDate.getTime() + (20 * 60 * 1000)) //5 min
                }
            }
        )

        //SEND OTP TO USER EMAIL
        const mail = mail_template({
            message: `Your reset password otp is: ${resetPasswordLink}`
          });

        await sendMailService.sendMail({
            to: value.email,
            replyTo: process.env.SMTP_EMAIL_FROM,
            // @ts-ignore
            'reply-to': process.env.SMTP_EMAIL_FROM,
            from: {
              name: 'iPatient',
              address: <string>process.env.SMTP_EMAIL_FROM,
            },
            subject: `iPatient has sent a password reset otp.`,
            html: mail,
            bcc: [<string>process.env.SMTP_BCC]
        })

        const response: HttpResponse<any> = {
            message: `Password reset link sent successfully.`,
            code: HttpStatus.OK.code,
            result: resetPasswordLink
        };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async resetPassword(req: Request) {
        const { error, value } = Joi.object<any>({
            resetCode: Joi.string().required().label('Reset code'),
            password: Joi.string()
                .regex(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,20}$/)
                .messages({
                "string.pattern.base": `Password does not meet requirement.`,
                })
                .required()
                .label("password"),
            confirmPassword: Joi.ref("password")
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const date = new Date()

        const user = await datasources.userDAOService.findByAny({'passwordReset.code': value.resetCode});
        if(!user) return Promise.reject(CustomAPIError.response("Reset code is not correct.", HttpStatus.NOT_FOUND.code));

        if(user && user.passwordReset.exp !== null && user.passwordReset.exp < date)
            return Promise.reject(CustomAPIError.response("This link has expired. Please restart the password reset process.", HttpStatus.BAD_REQUEST.code));

        const password = await this.passwordEncoder?.encode(value.password as string);

        await datasources.userDAOService.updateByAny(
            { _id: user._id },
            {
                passwordReset: {
                    exp: null,
                    code: ''
                },
                password: password
            }
        )

        const response: HttpResponse<IUserModel> = {
            message: `Password reset was successful.`,
            code: HttpStatus.OK.code
        };
      
        return Promise.resolve(response);
    }
}