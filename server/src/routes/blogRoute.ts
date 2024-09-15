import BlogController from "../controller/BlogController";
import authenticateRouteWrapper from "../middleware/authenticateRouteWrapper";
import { Request, Response } from "express";

const blogController = new BlogController();

export const createBlogCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.createBlogCategory(req);

    res.status(response.code).json(response);
});

export const updateBlogCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.updateBlogCategory(req);

    res.status(response.code).json(response);
});

export const deleteBlogCategoryHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.deleteBlogCategory(req);

    res.status(response.code).json(response);
});

export const fetchBlogCategoriesHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.fetchBlogCategories();

    res.status(response.code).json(response);
};

export const createBlogHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.createBlog(req);

    res.status(response.code).json(response);
});

export const updateBlogHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.updateBlog(req);

    res.status(response.code).json(response);
});

export const likeBlogHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.likeBlog(req);

    res.status(response.code).json(response);
});

export const likeBlogCommentHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.likeComment(req);

    res.status(response.code).json(response);
});

export const replyBlogCommentHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.replyBlogComment(req);

    res.status(response.code).json(response);
});

export const fetchBlogCommentHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.fetchBlogComments(req);

    res.status(response.code).json(response);
};

export const commentOnBlogHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.commentOnBlog(req);

    res.status(response.code).json(response);
});

export const deleteBlogHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.deleteBlog(req);

    res.status(response.code).json(response);
});

export const fetchBlogsHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.fetchBlogs();

    res.status(response.code).json(response);
};

export const fetchUserBlogsHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.fetchUserBlogs(req);

    res.status(response.code).json(response);
};

export const fetchBlogsByCategoryHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.fetchBlogsByCategory(req);

    res.status(response.code).json(response);
};

export const singleBlogHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.singleBlog(req);

    res.status(response.code).json(response);
};

export const singleBlogAdminHandler = async (req: Request, res: Response) =>  {
    const response = await blogController.singleBlogAdmin(req);

    res.status(response.code).json(response);
};

export const changeBlogStatusToDraftHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.changeBlogStatusToDraft(req);

    res.status(response.code).json(response);
});

export const changeBlogStatusToPublishHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.changeBlogStatusToPublish(req);

    res.status(response.code).json(response);
});

export const changeBlogStatusToArchiveHandler = authenticateRouteWrapper(async (req, res) =>  {
    const response = await blogController.changeBlogStatusToArchive(req);

    res.status(response.code).json(response);
});