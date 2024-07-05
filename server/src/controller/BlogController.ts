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
        
        if(blog.likes.includes(user._id)) 
            return Promise.reject(CustomAPIError.response("You already liked the blog.", HttpStatus.FORBIDDEN.code));

        blog.likes.push(user._id);
        await blog.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully liked comment.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async likeComment (req: Request) {
        const userId = req.user._id;
        const commentId = req.params.commentId;

        const [user, blogComment] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.blogCommentsDAOService.findById(commentId)
        ]);

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        if(!blogComment)
            return Promise.reject(CustomAPIError.response("Blog comment not found", HttpStatus.NOT_FOUND.code));

        blogComment.likes.push(user._id);
        await blogComment.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully liked comment.'
        };
      
        return Promise.resolve(response);

    }

    @TryCatch
    public async replyBlogComment (req: Request) {
        const userId = req.user._id;
        const commentId = req.params.commentId;

        const { error, value } = Joi.object<any>({
            reply: Joi.string().required().label('Reply')
        }).validate(req.body);
        if(error) return Promise.reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

        const [user, blogComment] = await Promise.all([
            datasources.userDAOService.findById(userId),
            datasources.blogCommentsDAOService.findById(commentId)
        ]);

        if(!user)
            return Promise.reject(CustomAPIError.response("User not found", HttpStatus.NOT_FOUND.code));

        if(!blogComment)
            return Promise.reject(CustomAPIError.response("Blog comment not found", HttpStatus.NOT_FOUND.code));

        blogComment.replies.unshift({
            reply: value.reply,
            user: user._id
        });
        await blogComment.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully replied.'
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
                user: user._id,
                blog: blog._id
            } as IBlogCommentsModel);

        blog.comments.push(blogComment._id);
        await blog.save();

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully commented.'
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
    public async fetchBlogComments (req: Request) {
        const blogId = req.params.blogId

        const comments = await datasources.blogDAOService.findAll({ blog: blogId });

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully retrieved comments.',
            results: comments
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

        const blogCategoryId = req.params.blogCategoryId;

        const blogs = await datasources.blogDAOService.findAll({category: blogCategoryId});

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully retrieved blogs.',
            results: blogs
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async changeBlogStatusToDraft (req: Request) {
 
        const userType = req.user.userType;
        const blogId = req.params.blogId;

        const blog = await datasources.blogDAOService.findByAny({urlSlug: `/${blogId}`});
        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));
        
        const allowedUser = await Generic.handleAllowedBlogUser(userType);
        if(!allowedUser) 
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

        await datasources.blogDAOService.updateByAny(
            {_id: blog._id},
            {
                status: "draft"
            }
        )

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully changed blog status to draft.',
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async changeBlogStatusToPublish (req: Request) {
 
        const userType = req.user.userType;
        const blogId = req.params.blogId;

        const blog = await datasources.blogDAOService.findByAny({urlSlug: `/${blogId}`});
        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        const allowedUser = await Generic.handleAllowedBlogUser(userType);
        if(!allowedUser) 
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
    
        await datasources.blogDAOService.updateByAny(
            {_id: blog._id},
            {
                status: "publish"
            }
        )

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully published this blog.',
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async changeBlogStatusToArchive (req: Request) {
 
        const userType = req.user.userType;
        const blogId = req.params.blogId;

        const blog = await datasources.blogDAOService.findByAny({urlSlug: `/${blogId}`});
        if(!blog)
            return Promise.reject(CustomAPIError.response("Blog not found", HttpStatus.NOT_FOUND.code));

        const allowedUser = await Generic.handleAllowedBlogUser(userType);
        if(!allowedUser) 
            return Promise.reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));


        await datasources.blogDAOService.updateByAny(
            {_id: blog._id},
            {
                status: "archive"
            }
        )

        const response: HttpResponse<any> = {
            code: HttpStatus.OK.code,
            message: 'Successfully archived blog.',
        };
      
        return Promise.resolve(response);
    }

    @TryCatch
    public async singleBlog (req: Request) {
 
        const blogId = req.params.blogId;

        const blog = await datasources.blogDAOService.findByAny({urlSlug: `/${blogId}`});
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

                const { error, value } = Joi.object<any>({
                    title: Joi.string().required().label('Title'),
                    urlSlug: Joi.string().required().label('Url slug'),
                    content: Joi.string().required().label('Blog body'),
                    category: Joi.string().required().label('Blog category'),
                    hot: Joi.string().label('hot blog'),
                    titleImage: Joi.any().label('Title image'),
                    bodyImage: Joi.any().label('Body image'),
                    publisher: Joi.string().required().label('Publisher'),
                    status: Joi.string().required().label('status')
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));
 
                const [user, category] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    BlogCategory.findOne({ name: value.category })
                ]);

                const allowedUser = await Generic.handleAllowedBlogUser(user?.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));
        
                if(user && !user.isAdmin)
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                if(!category)
                    return reject(CustomAPIError.response("Category does not exist.", HttpStatus.NOT_FOUND.code));

                const basePathBodyImage = `${UPLOAD_BASE_PATH}/blogbodyimg`;
                const basePathTitleImage = `${UPLOAD_BASE_PATH}/blogtitleimg`;

                const [{ result: _titleImage, error: imageError }, { result: _bodyImage, error: imageBodyError }] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePathTitleImage),
                    Generic.handleImage(files.bodyImage as File, basePathBodyImage)
                ]);
            
                if (imageError) {
                    return reject(CustomAPIError.response(imageError as string, HttpStatus.BAD_REQUEST.code));
                }

                if (imageBodyError) {
                    return reject(CustomAPIError.response(imageBodyError as string, HttpStatus.BAD_REQUEST.code));
                }

                // const [_titleImage, _bodyImage] = await Promise.all([
                //     Generic.handleImage(files.titleImage as File, basePathTitleImage),
                //     Generic.handleImage(files.bodyImage as File, basePathBodyImage)
                // ]);

                const blogExist = await datasources.blogDAOService.findByAny({urlSlug: value.urlSlug});
                if(blogExist)
                    return reject(CustomAPIError.response(`A blog with this permlink: ${process.env.CLIENT_URL}${value.urlSlug} already exist.`, HttpStatus.FORBIDDEN.code))

                const payload: Partial<IBlogModel> = {
                    ...value,
                    category: category._id,
                    titleImage: _titleImage ? _titleImage : '',
                    bodyImage: _bodyImage ? _bodyImage : '',
                    hot: value.hot,
                    publisherImage: user?.image || ''
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
                    urlSlug: Joi.string().label('Url slug'),
                    content: Joi.string().label('Blog body'),
                    category: Joi.string().label('Blog category'),
                    // hot: Joi.string().label('hot blog'),
                    titleImage: Joi.any().label('Title image'),
                    bodyImage: Joi.any().label('Body image'),
                    publisher: Joi.string().label('Publisher'),
                }).validate(fields);
                if(error) return reject(CustomAPIError.response(error.details[0].message, HttpStatus.BAD_REQUEST.code));

                const [user, blog] = await Promise.all([
                    datasources.userDAOService.findById(loggedInUser),
                    datasources.blogDAOService.findByAny({urlSlug: `/${blogId}`})
                ]);

                const allowedUser = await Generic.handleAllowedBlogUser(user?.userType);
                if(!allowedUser) 
                    return reject(CustomAPIError.response("You are not authorized.", HttpStatus.UNAUTHORIZED.code));

                if(!blog)
                    return reject(CustomAPIError.response("Blog does not exist.", HttpStatus.NOT_FOUND.code));

                if (value.urlSlug && value.urlSlug !== blog.urlSlug) {
                    const existingBlogWithSlug = await datasources.blogDAOService.findByAny({ urlSlug: value.urlSlug });
                    if (existingBlogWithSlug) {
                        return reject(CustomAPIError.response("A blog with this title already exists.", HttpStatus.FORBIDDEN.code));
                    }
                }
        
                let category;
                if(value.category) {
                    category = await BlogCategory.findOne({ name: value.category });
                    if(!category)
                        return reject(CustomAPIError.response("Category does not exist.", HttpStatus.NOT_FOUND.code));
                }
                
                const basePathBodyImage = `${UPLOAD_BASE_PATH}/blogbodyimg`;
                const basePathTitleImage = `${UPLOAD_BASE_PATH}/blogtitleimg`;

                const [{ result: _titleImage, error: imageError }, { result: _bodyImage, error: imageBodyError }] = await Promise.all([
                    Generic.handleImage(files.titleImage as File, basePathTitleImage),
                    Generic.handleImage(files.bodyImage as File, basePathBodyImage)
                ]);
            
                if (imageError) {
                    return reject(CustomAPIError.response(imageError as string, HttpStatus.BAD_REQUEST.code));
                }

                if (imageBodyError) {
                    return reject(CustomAPIError.response(imageBodyError as string, HttpStatus.BAD_REQUEST.code));
                }

                // const [_titleImage, _bodyImage] = await Promise.all([
                //     Generic.handleImagex(files.titleImage as File, basePathTitleImage),
                //     Generic.handleImagex(files.bodyImage as File, basePathBodyImage)
                // ]);

                const imagePathtitle = 'blogtitleimg/'
                if (_titleImage && blog.titleImage) {
                    Generic.deleteExistingImage(blog.titleImage, basePathTitleImage, imagePathtitle);
                }
        
                const imagePathbody = 'blogbodyimg/'
                if (_bodyImage && blog.bodyImage) {
                    Generic.deleteExistingImage(blog.bodyImage, basePathBodyImage, imagePathbody);
                }
                console.log(_bodyImage, _titleImage, 'imgs')
                const payload: Partial<IBlogModel> = {
                    title: value.title ? value.title : blog.title,
                    content: value.content ? value.content : blog.content,
                    publisher: value.publisher ? value.publisher : blog.publisher,
                    category: value.category ? category?._id : blog.category,
                    titleImage: _titleImage ? _titleImage as string : blog.titleImage,
                    bodyImage: _bodyImage ? _bodyImage as string : blog.bodyImage,
                    // hot: value.hot ? value.hot : blog.hot,
                    urlSlug: value.urlSlug ? value.urlSlug : blog.urlSlug
                }

                const updatedBlog: any = await datasources.blogDAOService.updateByAny({_id: blog._id}, payload as IBlogModel);

                return resolve(updatedBlog)

            })
        })
    }

}

