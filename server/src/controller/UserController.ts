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
import { ALLOWED_FILE_TYPES2, MESSAGES, UPLOAD_BASE_PATH } from "../config/constants";
import Generic from "../utils/Generic";
import { IInsightModel } from "../models/Insight";
import { IAwardModel } from "../models/Award";
import SiteVisitCount, { ISiteVisitCountModel } from "../models/SiteVisitCount";
import HospitalInfo, { IHospitalInfoModel } from "../models/HospitalInfo";
import PatientDocs from "../models/PatientDocs";
import AdvocacyFiles from "../models/AdvocacyFiles";
import fs from 'fs';

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class UserController {

    @TryCatch
    public async findUser(req: Request) {
        const user = await datasources.userDAOService.findByAny({
            email: req.body.email
        });

        if(!user) 
            return Promise.reject(CustomAPIError.response("User with this email does not exist.", HttpStatus.NOT_FOUND.code))
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async dashboardData(req: Request) {
        const users = await datasources.userDAOService.findAll({
            isAdmin: false
        });

        const adminUsers = await datasources.userDAOService.findAll({
            isAdmin: true,
            // email: { $ne: "ipatient@ipatient.com" }
        });

        const siteVisit = await SiteVisitCount.findOne({});
        const totalSiteVisits = siteVisit?.viewCount;

        const insights = await datasources.insightDAOService.findAll({});

        const crowedFunding = await datasources.crowdFundingDAOService.findAll({});
        
        let crowdFundingSum = 0;
        crowedFunding.map((crowd) => (
            crowdFundingSum += +crowd.amountRaised
        ))

        const result = {
            allUsers: users.length,
            adminUsers: adminUsers.length,
            siteVisits: totalSiteVisits,
            insights: insights.length,
            crowdFundingSum
        }
          
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful',
            result
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async dashboardDataUsersGraph(req: Request) {
        const year = req.body.year;

        const users = await datasources.userDAOService.findAll({
            isAdmin: false
        });

        const filtered = users.filter(user => new Date(user.createdAt).getFullYear() === +year);

        const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

        const totalNumUsers: { [key: string]: any } = monthNames.reduce((acc, month) => {
        acc[month] = 0;
        return acc;
        }, {} as { [key: string]: any });
    
        filtered.forEach(user => {
            const userDate = new Date(user.createdAt);
            const month = userDate.getMonth();
            totalNumUsers[monthNames[month]] ++;
        });
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: "Successful.",
            result: totalNumUsers
        };
    
        return Promise.resolve(response);
    }

    @TryCatch
    public async siteVisitCount(req: Request) {

        const visitCount = await SiteVisitCount.findOne({});
      
        if (!visitCount) {
            await SiteVisitCount.create({
                viewCount: 1,
                viewCounts: [
                    {
                        count: 1,
                        dateTime: new Date(),
                    },
                ]
            } as unknown as ISiteVisitCountModel);
        }
    
        await SiteVisitCount.findOneAndUpdate(
        { _id: visitCount?._id },
        {
            $inc: { viewCount: 1 },
            $push: {
                viewCounts: {
                    count: 1,
                    dateTime: new Date(),
                },
            },
        },
        { new: true }
        );

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated'
        };
      
        return Promise.resolve(response);
    }

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
    public async createAward (req: Request) {
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            awardName: Joi.string().required().label('Award Name'),
            address: Joi.string().required().label('Facility address'),
            recipient: Joi.string().required().label('Recipient'),
            awardCategory: Joi.string().required().label('Award Category'),
            nominees: Joi.array().required().label('Nominees'),
            dateRecieved: Joi.date().required().label('Date Received')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const awardExist = await datasources.awardDAOService.findByAny({ awardName: value.awardName.toLowerCase() });
        if(awardExist) 
            return Promise.reject(CustomAPIError.response("Award already exist.", HttpStatus.BAD_REQUEST.code))
    
        await datasources.awardDAOService.create({
            awardName: value.awardName.toLowerCase(),
            recipient: value.recipient.toLowerCase(),
            nominees: value.nominees,
            dateRecieved: value.dateRecieved,
            awardCategory: value.awardCategory,
            address: value.address
        } as IAwardModel);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created award.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async updateAward (req: Request) {
        const loggedInUser = req.user._id;
        const awardId = req.params.awardId;

        const { error, value } = Joi.object<any>({
            awardName: Joi.string().label('Award Name'),
            awardId: Joi.string().label('Award Name'),
            recipient: Joi.string().label('Recipient'),
            nominees: Joi.array().label('Nominees'),
            awardCategory: Joi.string().label('Award Category'),
            dateRecieved: Joi.date().label('Date Received'),
            address: Joi.string().label('Facility address'),
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const award = await datasources.awardDAOService.findById(awardId);
        if(!award) 
            return Promise.reject(CustomAPIError.response("Award does not exist.", HttpStatus.BAD_REQUEST.code));

        if (value.awardName && value.awardName !== award.awardName) {
            const existingAward = await datasources.awardDAOService.findByAny({ awardName: value.awardName.toLowerCase() });
            if (existingAward) {
                return Promise.reject(CustomAPIError.response("Award with this name already exist.", HttpStatus.FORBIDDEN.code));
            }
        }
    
        await datasources.awardDAOService.updateByAny({_id: award._id}, {
            awardName: value.awardName ? value.awardName.toLowerCase() : award.awardName,
            recipient: value.recipient ? value.recipient.toLowerCase() : award.recipient,
            nominees: value.nominees ? value.nominees : award.nominees,
            dateRecieved: value.dateRecieved ? value.dateRecieved : award.dateRecieved,
            awardCategory: value.awardCategory ? value.awardCategory : award.awardCategory,
            address: value.address ? value.address : award.address
        } as IAwardModel);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated award.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async getSingleAward (req: Request) {
        const awardId = req.params.awardId;

        const award = await datasources.awardDAOService.findById(awardId);
        if(!award)
            return Promise.reject(CustomAPIError.response("Award not found.", HttpStatus.NOT_FOUND.code));
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: award
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllAwards (req: Request) {

        const awards = await datasources.awardDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: awards
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteAward (req: Request) {
        const loggedInUser = req.user._id;
        const awardId = req.params.awardId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorised.", HttpStatus.UNAUTHORIZED.code));

        const awardExist = await datasources.awardDAOService.findById(awardId);
        if(!awardExist) return Promise.reject(CustomAPIError.response("Award does not exist.", HttpStatus.NOT_FOUND.code));

        await datasources.awardDAOService.deleteById(awardExist._id)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted award.'
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
            message: 'Successfully updated user status.'
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

    @TryCatch
    public async uploadFile (req: Request) {
        await this.doUploadFile(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchFiles (req: Request) {
        const files = await AdvocacyFiles.find({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: files
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteFile (req: Request) {
        const { id } = req.body;

         const filesRecord: any = await AdvocacyFiles.findOne({});

         if (!filesRecord || !Array.isArray(filesRecord.files)) {
            return Promise.reject(CustomAPIError.response("Files not found.", HttpStatus.NOT_FOUND.code))
         }
 
        const files = filesRecord.files;
        const fileIndex = files.findIndex((file: any) => file._id.toString() === id);

        if (fileIndex === -1) {
            return Promise.reject(CustomAPIError.response("File does not exist.", HttpStatus.NOT_FOUND.code));
        }
    
        const file = files[fileIndex];
        const _file = file.file.split('files/')[1];
        const filePath = `${UPLOAD_BASE_PATH}/files/${_file}`;
        fs.unlink(filePath, (err) => {
            if (err) {
                console.error(`Failed to delete file from path: ${filePath}`, err);
                return Promise.reject(CustomAPIError.response(`Failed to delete file from path: ${filePath}`, HttpStatus.NOT_FOUND.code));
            }
        });
 
        files.splice(fileIndex, 1);
        await filesRecord.save();

         const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted file.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async getUserInsights (req: Request) {
        const userId = req.params.userId;

        const insights = await datasources.insightDAOService.findAll({});
        const filteredInsights = insights.filter(insight => insight.reviews.length !== 0);

        const insightsResult = await Promise.all(filteredInsights.flatMap(async (insight) => {
            const userReviews = insight.reviews.filter(review => review.user._id.toString() === userId);
            const hospital = await HospitalInfo.findById(insight.hospital);

            return userReviews.map(review => ({
                review,
                hospital: hospital
            }));
        }));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: insightsResult.flat()
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllReviews(req: Request) {
        const insights = await datasources.insightDAOService.findAll({});
        const filteredInsights = insights.filter(insight => insight.reviews.length !== 0);

        const reviews = await Promise.all(filteredInsights.flatMap(async (insight) => {
            const hospital = await HospitalInfo.findById(insight.hospital);
            
            return insight.reviews.map(review => ({
                //@ts-ignore
                ...review._doc,
                hospital: hospital,
                _id: insight._id
            }));
        }));

        // Flatten the nested arrays of reviews
        const flattenedReviews = reviews.flat();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: flattenedReviews
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleReview (req: Request) {
        const reviewId = req.params.reviewId;

        const insights = await datasources.insightDAOService.findAll({});
        const filteredInsights = insights.filter(insight => insight.reviews.length !== 0);

        const reviews = await Promise.all(filteredInsights.flatMap(async (insight) => {
            const hospital = await HospitalInfo.findById(insight.hospital);
            
            return insight.reviews.map(review => ({
                //@ts-ignore
                ...review._doc,
                hospital: hospital,
                _id: insight._id
            }));
        }));

        // Flatten the nested arrays of reviews
        const flattenedReviews = reviews.flat();

        const singleReview = flattenedReviews.find(review => review._id === reviewId);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: singleReview
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleInsight (req: Request) {
        const insightId = req.params.insightId;

        const insight = await datasources.insightDAOService.findById( insightId );
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));
    
        const totalRating = insight.reviews
                                .filter((item: any) => item.status === 'Accepted')
                                .reduce((acc, review) => acc + review.rating, 0);
        const maxRating = insight.reviews
                            .filter((item: any) => item.status === 'Accepted')
                            .length * 5;
        const avgRating = totalRating / maxRating * 100;
        const rating = (5 * avgRating) / 100;

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: { insight, rating }
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async changeReviewStatus (req: Request) {
        const reviewId = req.params.reviewId;
        const status = req.body.status;

        const insights = await datasources.insightDAOService.findAll({});
        const filteredInsights = insights.filter(insight => insight.reviews.length !== 0);

        const reviews = await Promise.all(filteredInsights.flatMap(async (insight) => {
            const hospital = await HospitalInfo.findById(insight.hospital);
            
            return insight.reviews.map(review => {
                const payload = {
                    //@ts-ignore
                    ...review._doc,
                    hospital: hospital,
                    insightId: insight._id,
                    //@ts-ignore
                    reviewId: review._doc._id
                }
                
                return payload;
        });
        }));

        // Flatten the nested arrays of reviews
        const flattenedReviews = reviews.flat();
        const singleReview = flattenedReviews.find(review => review.reviewId.toString() === reviewId);

        if (!singleReview) {
            const response: HttpResponse<any> = {
                code: HttpStatus.NOT_FOUND.code,
                message: 'Review not found.',
            };
            return Promise.reject(response);
        }
        // Find the insight that contains this review
        const insightToUpdate = filteredInsights.find(insight => insight._id.toString() === singleReview.insightId.toString());
    
        if (!insightToUpdate) {
            const response: HttpResponse<any> = {
                code: HttpStatus.NOT_FOUND.code,
                message: 'Insight not found.',
            };
            return Promise.reject(response);
        }
    
        // Update the status of the review within the insight
        insightToUpdate.reviews = insightToUpdate.reviews.map(review => {
            //@ts-ignore
            if (review._id.toString() === reviewId) {
                review.status = status;
            }
            return review;
        });
    
        // Save the updated insight
        await insightToUpdate.save();
    
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Review status updated successfully.',
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteInsight (req: Request) {
        const insightId = req.params.insightId;

        const insight = await datasources.insightDAOService.findById( insightId );
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        await datasources.insightDAOService.deleteById(insight._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted insight.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllInsights(req: Request) {
        // Fetch all insights
        const insights = await datasources.insightDAOService.findAll({});

        const insightsResult = await Promise.all(insights.map(async (insight) => {
            const hospital = await HospitalInfo.findById(insight.hospital);

            let totalRating = 0;
            const reviewPayload = insight.reviews
                                    .filter((item: any) => item.status === 'Accepted')
                                    .map(review => {
                totalRating += review.rating;
                return review;
            });

            const maxRating = insight.reviews
                                .filter((item: any) => item.status === 'Accepted')
                                .length * 5;
            const avgRating = totalRating / maxRating * 100;
            const rating = (5 * avgRating) / 100 || 0;
            const actualRating =  Math.ceil(rating * 10) / 10

            await HospitalInfo.findOneAndUpdate({ _id: hospital._id }, { rating: actualRating })

            return {
                reviews: reviewPayload,
                hospital,
                rating: actualRating,
                _id: insight._id
            };
        }));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: insightsResult
        };

        return Promise.resolve(response);
    }


    @TryCatch
    public async reviewOnInsight (req: Request) {
        const userId = req.user._id;
        const insightId = req.params.insightId;

        const { error, value } = Joi.object<any>({
            review: Joi.string().required().label('Review'),
            rating: Joi.number().required().label('Rating')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const insight = await datasources.insightDAOService.findById(insightId);
        if(!insight)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        insight.reviews.unshift({
            review: value.review,
            rating: value.rating,
            status: 'Accepted',
            user: userId,
            createdAt: new Date()
        });
    
        await datasources.insightDAOService.updateByAny({ _id: insight._id }, { reviews: insight.reviews });
        
        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getInsightRatings(req: Request) {
        const hospital = req.body.hospital;

        const hospitalData = await HospitalInfo.findOne({ hospitalName: hospital.toLowerCase() })

        const insights = await datasources.insightDAOService.findAll({ 
            hospital: hospitalData?._id
        });

        const ratings = {
            one: { totalRating: 0 },
            two: { totalRating: 0 },
            three: { totalRating: 0 },
            four: { totalRating: 0 },
            five: { totalRating: 0 },
        };
        let totalRating = 0;
        insights.forEach((review) => {
            review.reviews.filter((item: any) => item.status === 'Accepted').forEach((insight: any) => {
                totalRating += insight.rating
                switch (insight.rating) {
                    case 1:
                        ratings.one.totalRating += insight.rating;
                        break;
                    case 2:
                        ratings.two.totalRating += insight.rating;
                        break;
                    case 3:
                        ratings.three.totalRating += insight.rating;
                        break;
                    case 4:
                        ratings.four.totalRating += insight.rating;
                        break;
                    case 5:
                        ratings.five.totalRating += insight.rating;
                        break;
                }
            })
        });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: { ratings, total: totalRating }
        };

        return Promise.resolve(response);
    }


    
    @TryCatch
    public async getUserAdvocacies (req: Request) {
        const userId = req.params.userId;

        const advocacies = await datasources.advocacyDAOService.findAll({user: userId});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: advocacies
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getSingleAdvocate (req: Request) {
        const advocacyId = req.params.advocacyId;

        const advocacy = await datasources.advocacyDAOService.findById( advocacyId );
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: advocacy
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteAdvocacy (req: Request) {
        const advocacyId = req.params.advocacyId;

        const advocacy = await datasources.advocacyDAOService.findById( advocacyId );
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));

        await datasources.advocacyDAOService.deleteById(advocacy._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getAllAdvocacies (req: Request) {
        const userId = req.user._id;

        const user = await datasources.userDAOService.findById(userId);
        if(user && !user.userType.includes('admin'))
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const advocacies = await datasources.advocacyDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: advocacies
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async createAdvocacy (req: Request) {

        const userId = req.user._id;

        const { error, value } = Joi.object<any>({
            hospitalName: Joi.string().label('hospital name'),
            hospitalAddress: Joi.string().required().label('hospital address'),
            complaints: Joi.string().label('Complain')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

        // if(user && !user.userType.includes("advocacy"))
        //     return Promise.reject(CustomAPIError.response("You are not authorized as an advocate.", HttpStatus.UNAUTHORIZED.code));

        const payload = {
            ...value,
            user: user._id,
            reference: `#${Generic.generateReference(6)}`
        };

        await datasources.advocacyDAOService.create(payload)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateAdvocacy (req: Request) {

        const advocacyId = req.params.advocacyId;

        const { error, value } = Joi.object<any>({
            complaints: Joi.string().label('Complaints')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const advocacy = await datasources.advocacyDAOService.findById(advocacyId);
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        if(advocacy.status === 'in-progess' || advocacy.status === 'closed') 
            return Promise.reject(CustomAPIError.response("Advocacy can not be modified, it status is eigther closed or In progress.", HttpStatus.NOT_FOUND.code));

        await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { ...value })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated advocacy.'
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async updateAdvocacyStatus (req: Request) {
        const loggedInUser = req.user._id;
        const advocacyId = req.params.advocacyId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.userType.includes("admin"))
            return Promise.reject(CustomAPIError.response("You not authorized.", HttpStatus.UNAUTHORIZED.code));

        const advocacy = await datasources.advocacyDAOService.findById(advocacyId);
        if(!advocacy)
            return Promise.reject(CustomAPIError.response("Advocacy not found.", HttpStatus.NOT_FOUND.code));

        if(advocacy.status === "pending") {
            await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { status: "in-progress" })
        } else if( advocacy.status === "in-progress" ) {
            await datasources.advocacyDAOService.updateByAny({ _id: advocacy._id }, { status: "closed" })
        }

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated status.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async postHospital (req: Request) {

        await this.doPostHospital(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async postTAndC (req: Request) {
        const { error, value } = Joi.object<any>({
            content: Joi.string().required().label('Content')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const terms = await PatientDocs.findOne({});

        await PatientDocs.updateOne({ _id: terms?._id }, { 
            termsAndCondition: {
                content: value.content,
                dateUpdated: new Date()
            }
        })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async aboutAndContactUs (req: Request) {
        const { error, value } = Joi.object<any>({
            aboutUs: Joi.string().label('About Us'),
            contactUs: Joi.string().label('Contact Us')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const terms = await PatientDocs.findOne({});

        await PatientDocs.updateOne({ _id: terms?._id }, { 
            aboutUs: value.aboutUs ? value.aboutUs : terms?.aboutUs,
            contactUs: value.contactUs ? value.contactUs : terms?.contactUs
        })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async getHospitals (req: Request) {

        const hospitals = await HospitalInfo.find({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: hospitals
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async getDocs (req: Request) {

        const tc = await PatientDocs.findOne({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            result: tc
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async deleteHospital (req: Request) {
        const id = req.params.id
        
        const hospital = await HospitalInfo.findById(id);

        if(!hospital)
            return Promise.reject(CustomAPIError.response("Hospital does not exist.", HttpStatus.NOT_FOUND.code));

        const insight = await datasources.insightDAOService.findByAny({ hospital: hospital._id })

        await HospitalInfo.deleteOne({ _id: hospital._id });
        await datasources.insightDAOService.deleteById(insight?._id)

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted.'
        };
      
        return Promise.resolve(response);
    }

    // private async doCreateInsight(req: Request): Promise<HttpResponse<IUserModel>> {
    //     return new Promise((resolve, reject) => {
    //         const userId = req.user._id;

    //         form.parse(req, async (err, fields, files) => {
    //             const { error, value } = Joi.object<any>({
    //                 hospitalName: Joi.string().label('Hospital name'),
    //                 rating: Joi.string().label('Rating'),
    //                 comment: Joi.string().label('Comment'),
    //             }).validate(fields);
    //             if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    //             const [user, hospital] = await Promise.all([
    //                 datasources.userDAOService.findById(userId),
    //                 HospitalInfo.findOne({ hospitalName: value.hospitalName.toLowerCase() })
    //             ]);
        
    //             if(!user)
    //                 return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
    //             if(!hospital)
    //                 return reject(CustomAPIError.response("Hospital not found.", HttpStatus.NOT_FOUND.code));

    //             // const basePath = `${UPLOAD_BASE_PATH}/photo`;
    //             // const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
    //             // if (imageError) {
    //             //     return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
    //             // }

    //             const payload = {
    //                 ...value,
    //                 rating: +value.rating,
    //                 hospital: hospital._id,
    //                 // image: _image,
    //                 user: user._id
    //             }

    //             const insight: any = await datasources.insightDAOService.create(payload as IInsightModel);

    //             return resolve(insight)

    //         })
    //     })
    // }

    // private async doUpdateInsight(req: Request): Promise<HttpResponse<IUserModel>> {
    //     return new Promise((resolve, reject) => {
    //         const insightId = req.params.insightId

    //         form.parse(req, async (err, fields, files) => {
    //             const { error, value } = Joi.object<any>({
    //                 hospitalName: Joi.string().label('Hospital name'),
    //                 image: Joi.any().label('Image'),
    //                 rating: Joi.string().label('Rating'),
    //                 comment: Joi.string().label('Comment'),
    //             }).validate(fields);
    //             if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

    //             const [insight] = await Promise.all([
    //                 datasources.insightDAOService.findById(insightId)
    //             ]);

    //             if(!insight)
    //                 return reject(CustomAPIError.response("Insight not found.", HttpStatus.NOT_FOUND.code));
                
    //             if(insight.status === 'approved') {
    //                 return reject(CustomAPIError.response("Insight has already been approved.", HttpStatus.NOT_FOUND.code));
    //             }

    //             const basePath = `${UPLOAD_BASE_PATH}/photo`;
    
    //             // const [_image] = await Promise.all([
    //             //     Generic.handleImage(files.titleImage as File, basePath)
    //             // ]);
    //             const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
    //             if (imageError) {
    //                 return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
    //             }

    //             const imagePath = 'photo/'
    //             if (_image && insight.image) {
    //                 await Generic.deleteExistingImage(insight.image, basePath, imagePath);
    //             };
    

    //             const payload = {
    //                 ...value,
    //                 image: _image ? _image : insight.image
    //             }


    //             const updatedInsight: any = await datasources.insightDAOService.updateByAny({ _id: insight._id }, payload as IInsightModel);

    //             return resolve(updatedInsight)

    //         })
    //     })
    // }

    private async doUpdateUserProfile(req: Request): Promise<HttpResponse<IUserModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const userId = req.params.userId;

                const { error, value } = Joi.object<any>({
                    email: Joi.string().label('Email'),
                    firstName: Joi.string().label('First Name'),
                    lastName: Joi.string().label('Last Name'),
                    phone: Joi.string().label('Phone Number'),
                    age: Joi.string().allow('').label('Age'),
                    gender: Joi.string().allow('').label('Gender'),
                    address: Joi.string().allow('').label('Address'),
                    userType: Joi.string().label('user types'),
                    healthInterests: Joi.array().optional().label('Health Interests'),
                    image: Joi.any().label('image'),
                    state: Joi.string().allow('').label('State'),
                    lga: Joi.string().allow('').label('LGA'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user] = await Promise.all([
                    datasources.userDAOService.findById(userId)
                ]);
        
                if(!user)
                    return reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));

                if (value.email && value.email !== user.email) {
                    const existingUserWithEmail = await datasources.userDAOService.findByAny({ email: value.email });
                    if (existingUserWithEmail) {
                        return reject(CustomAPIError.response("Email is already in use by another user.", HttpStatus.FORBIDDEN.code));
                    }
                }

                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                const imagePath = 'photo/'
                if (_image && user.image) {
                    await Generic.deleteExistingImage(user.image, basePath, imagePath);
                };

                let userType;
                if(value.userType) {
                    userType = JSON.parse(value.userType)
                }

                const payload: Partial<IUserModel> = {
                    email: value.email ? value.email : user.email,
                    firstName: value.firstName ? value.firstName : user.firstName,
                    lastName: value.lastName ? value.lastName : user.lastName,
                    phone: value.phone ? value.phone : user.phone,
                    age: value.age ? value.age : user.age,
                    gender: value.gender ? value.gender : user.gender,
                    address: value.address ? value.address : user.address,
                    healthInterests: value.healthInterests > 0 ? value.healthInterests : user.healthInterests,
                    userType: userType && userType.length > 0 ? userType : user.userType,
                    state: value.state ? value.state : user.state,
                    lga: value.lga ? value.lga : user.lga,
                    image: _image ? _image : user.image
                }

                const updatedUser: any = await datasources.userDAOService.updateByAny({_id: user._id}, payload as IUserModel);

                return resolve(updatedUser)

            })
        })
    }

    private async doUploadFile(req: Request): Promise<HttpResponse<any>> {

        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                //@ts-ignore
                const userId = req.user._id;

                const { error, value } = Joi.object<any>({
                    file: Joi.any().label('file'),
                    description: Joi.string().label('description'),
                }).validate(fields);
    
                if (error) {
                    return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
                }
    
                const user = await datasources.userDAOService.findById(userId);
                if (!user)
                    return reject(CustomAPIError.response('User not found', HttpStatus.NOT_FOUND.code));

                if(user && !user.userType.includes("admin"))
                    return Promise.reject(CustomAPIError.response("You not authorized.", HttpStatus.UNAUTHORIZED.code));
        
                const menuFile = await AdvocacyFiles.findOne({});

                const basePath = `${UPLOAD_BASE_PATH}/files`;
  
                const { result: file, error: imageError } = await Generic.handleFiles(files.file as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                const payload = {
                    file: file,
                    description: value.description
                };

                await AdvocacyFiles.findOneAndUpdate(
                    { _id: menuFile?._id }, 
                    { $push: { files: payload } },
                    { new: true }
                )

                return resolve('' as any);
            });
        });
    }

    private async doPostHospital(req: Request): Promise<HttpResponse<any>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const { error, value } = Joi.object<any>({
                    hospitalName: Joi.string().required().label('Hospital name'),
                    address: Joi.string().required().label('Address'),
                    email: Joi.string().required().label('Email'),
                    state: Joi.string().required().label('State'),
                    lga: Joi.string().required().label('LGA'),
                    phone: Joi.string().required().label('Phone number'),
                    image: Joi.any().label('Image'),
                    services: Joi.string().required().label('Services'),
                    website: Joi.string().required().label('Website'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [hospital] = await Promise.all([
                    HospitalInfo.findOne({ hospitalName: value.hospitalName.toLowerCase() })
                ]);

                if(hospital)
                    return reject(CustomAPIError.response("Hospital already exist.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;

                const { result: _image, error: imageError } = await Generic.handleImage(files.image as File, basePath);
                if (imageError) {
                    return reject(CustomAPIError.response(imageError, HttpStatus.BAD_REQUEST.code));
                }

                let services;
                if(value.services) {
                    services = JSON.parse(value.services)
                }

                const payload = {
                    ...value,
                    services: services,
                    image: _image ? _image : hospital?.image
                }

                const newHospital = await HospitalInfo.create(payload as IHospitalInfoModel);

                await datasources.insightDAOService.create({
                    hospital: newHospital._id,
                    rating: 0
                } as IInsightModel)

                return resolve('Success' as any)

            })
        })
    }

}