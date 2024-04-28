import { appCommonTypes } from "../@types/app-common";
import HttpResponse = appCommonTypes.HttpResponse;
import { Request } from "express";
import { TryCatch } from "../decorators";
import Joi from "joi";
import CustomAPIError from "../exceptions/CustomAPIError";
import HttpStatus from "../helpers/HttpStatus";
import datasources from '../services/dao';
import BlogCategory from "../models/BlogCategory";
import formidable, { File } from 'formidable';
import {  UPLOAD_BASE_PATH } from "../config/constants";
import { IBlogModel } from "../models/Blog";
import Generic from "../utils/Generic";
import { IBlogCommentsModel } from "../models/BlogComments";

const form = formidable({ uploadDir: UPLOAD_BASE_PATH });
form.setMaxListeners(15);

export default class BlogController {

    @TryCatch
    public async createBlogCategory (req: Request) {
        const loggedInUser = req.user._id;

        const { error, value } = Joi.object<any>({
            name: Joi.string().required().label('Name')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        const blogCategoryExist = await BlogCategory.findOne({ name: value.name.toLowerCase() });
        if(blogCategoryExist) 
            return Promise.reject(CustomAPIError.response("Blog category already exist.", HttpStatus.BAD_REQUEST.code))
    
        await BlogCategory.create({name: value.name.toLowerCase()});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created blog category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async deleteBlogCategory (req: Request) {
        const loggedInUser = req.user._id;
        const blogCategoryId = req.params.blogCategoryId;

        const user = await datasources.userDAOService.findById(loggedInUser);
        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
        const blogCat = await BlogCategory.findById(blogCategoryId);
        if(!blogCat)
            return Promise.reject(CustomAPIError.response("Blog category not found.", HttpStatus.NOT_FOUND.code));

        await BlogCategory.findByIdAndDelete(blogCat._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted blog category.'
        };

        return Promise.resolve(response);

    }

    @TryCatch
    public async fetchBlogCategories () {
        
        const categories = await BlogCategory.find({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: categories
        };

        return Promise.resolve(response);
    }

    @TryCatch
    public async createBlog (req: Request) {
        const blog = await this.doCreateBlog(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created.',
            result: blog
        };
      
        return Promise.resolve(response);
    };

    @TryCatch
    public async updateBlog (req: Request) {
        const blog = await this.doUpdateBlog(req);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully updated.',
            result: blog
        };
      
        return Promise.resolve(response);
    };

    @TryCatch
    public async likeBlog (req: Request) {
        const userId = req.user._id;
        const blogId = req.params.blogId;

        const [user, blog] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.blogDAOService.findById(blogId)
        ]);

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        blog.likes.push(user._id);
        await blog.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully liked comment.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async commentOnBlog (req: Request) {
        const userId = req.user._id;
        const blogId = req.params.blogId;

        const { error, value } = Joi.object<IBlogCommentsModel>({
            comment: Joi.string().required().label('Comment')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const [user, blog] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.blogDAOService.findById(blogId)
        ]);

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        const blogComment = await datasources.blogCommentsDAOService.create(
            { 
                comment: value.comment,
                user: user._id
            } as IBlogCommentsModel);

        blog.comments.push(blogComment._id);
        await blog.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully created comment.'
        };
      
        return Promise.resolve(response);
        
    }

    @TryCatch
    public async deleteBlog (req: Request) {
        const userId = req.user._id;
        const blogId = req.params.blogId;

        const [user, blog] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.blogDAOService.findById(blogId)
        ]);

        if(user && !user.isAdmin)
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        const commentIds = blog.comments;
        await Promise.all(commentIds.map(commentId => datasources.blogCommentsDAOService.deleteById(commentId)));

        await datasources.blogDAOService.deleteById(blog._id);

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully deleted blog and its comments.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async fetchBlogs () {

        const blogs = await datasources.blogDAOService.findAll({});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully retrieved blogs.',
            results: blogs
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchUserBlogs (req: Request) {
        const userId = req.user._id;

        const user = datasources.userDAOService.findById(userId);
        if(!user)
            return Promise.reject(CustomAPIError.response("User not found.", HttpStatus.NOT_FOUND.code));
        
        const blogs = await datasources.blogDAOService.findAll({ user: userId })

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successful.',
            results: blogs
        };
        
        return Promise.resolve(response);
    }

    @TryCatch
    public async fetchBlogsByCategory (req: Request) {

        const blogCategory = req.body.blogCategory;

        const blogs = await datasources.blogDAOService.findAll({category: blogCategory});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully retrieved blogs.',
            results: blogs
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async singleBlog (req: Request) {
 
        const blogId = req.params.blogId;

        const blog = await datasources.blogDAOService.findById(blogId);
        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        const commentIds = blog.comments;
        const comments = await Promise.all(commentIds.map(commentId => datasources.blogCommentsDAOService.findById(commentId)));

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully retrieved blog and comments.',
            result: { blog, comments }
        };
      
        return Promise.resolve(response);

    }

    private async doCreateBlog(req: Request): Promise<HttpResponse<IBlogModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;

                const { error, value } = Joi.object<IBlogModel>({
                    title: Joi.string().required().label('Title'),
                    body: Joi.string().required().label('Blog body'),
                    category: Joi.string().required().label('Blog category'),
                    hot: Joi.boolean().required().label('hot blog'),
                    titleImage: Joi.any().label('Title image'),
                    bodyImage: Joi.any().label('Body image'),
                    publisher: Joi.string().required().label('Publisher'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, category] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    BlogCategory.findOne({ name: value.category })
                ]);

                const allowedUser = Generic.handleAllowedBlogUser(user?.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
                if(user && !user.isAdmin)
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                if(!category)
                    return reject(CustomAPIError.response("Category does not exist.", HttpStatus.NOT_FOUND.code));

                const basePath = `${UPLOAD_BASE_PATH}/photo`;

                // const handleImage = async (image: File) => {
                //     if (!image) return '';
                //     const allowedFileTypes = ALLOWED_FILE_TYPES;
                //     if (!allowedFileTypes.includes(image.mimetype as string)) {
                //         throw new CustomAPIError(MESSAGES.image_type_error, HttpStatus.BAD_REQUEST.code);
                //     }
                //     const outputPath = await Generic.compressImage(image.filepath);
                //     return Generic.getImagePath({
                //         tempPath: outputPath,
                //         filename: image.originalFilename as string,
                //         basePath,
                //     });
                // };
        
                const [_titleImage, _bodyImage] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath),
                    Generic.handleImage(files.bodyImage as File, basePath)
                ]);

                const payload: Partial<IBlogModel> = {
                    ...value,
                    category: category.name,
                    titleImage: _titleImage ? _titleImage : '',
                    bodyImage: _bodyImage ? _bodyImage : ''
                }

                const blog: any = await datasources.blogDAOService.create(payload as IBlogModel);

                return resolve(blog)

            })
        })
    }

    private async doUpdateBlog(req: Request): Promise<HttpResponse<IBlogModel>> {
        return new Promise((resolve, reject) => {
            form.parse(req, async (err, fields, files) => {
                const loggedInUser = req.user._id;
                const blogId = req.params.blogId;

                const { error, value } = Joi.object<IBlogModel>({
                    title: Joi.string().label('Title'),
                    body: Joi.string().label('Blog body'),
                    category: Joi.string().label('Blog category'),
                    hot: Joi.boolean().label('hot blog'),
                    titleImage: Joi.any().label('Title image'),
                    bodyImage: Joi.any().label('Body image'),
                    publisher: Joi.string().label('Publisher'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, blog] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    datasources.blogDAOService.findById(blogId)
                ]);

                const allowedUser = Generic.handleAllowedBlogUser(user?.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                if(!blog)
                    return reject(CustomAPIError.response("Blog does not exist.", HttpStatus.NOT_FOUND.code));
        
                let category;
                if(value.category) {
                    category = await BlogCategory.findOne({ name: value.category });
                    if(!category)
                        return reject(CustomAPIError.response("Category does not exist.", HttpStatus.NOT_FOUND.code));
                }
                
                const basePath = `${UPLOAD_BASE_PATH}/photo`;
        
                const [_titleImage, _bodyImage] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePath),
                    Generic.handleImage(files.bodyImage as File, basePath)
                ]);

                const imagePath = 'photo/'
                if (_titleImage && blog.titleImage) {
                    await Generic.deleteExistingImage(blog.titleImage, basePath, imagePath);
                }
        
                if (_bodyImage && blog.bodyImage) {
                    await Generic.deleteExistingImage(blog.bodyImage, basePath, imagePath);
                }
        

                const payload: Partial<IBlogModel> = {
                    ...value,
                    category: value.category ? category?.name : blog.category,
                    titleImage: _titleImage ? _titleImage : blog.titleImage,
                    bodyImage: _bodyImage ? _bodyImage : blog.bodyImage
                }

                const updatedBlog: any = await datasources.blogDAOService.updateByAny({_id: blog._id}, payload as IBlogModel);

                return resolve(updatedBlog)

            })
        })
    }

}

