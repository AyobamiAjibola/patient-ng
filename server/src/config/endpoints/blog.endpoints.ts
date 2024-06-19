import { appCommonTypes } from '../../@types/app-common';
import RouteEndpoint = appCommonTypes.RouteEndpoints;
import { 
    changeBlogStatusToArchiveHandler,
    changeBlogStatusToDraftHandler,
    changeBlogStatusToPublishHandler,
    commentOnBlogHandler, 
    createBlogCategoryHandler, 
    createBlogHandler, 
    deleteBlogCategoryHandler, 
    deleteBlogHandler, 
    fetchBlogCategoriesHandler, 
    fetchBlogsByCategoryHandler, 
    fetchBlogsHandler, fetchUserBlogsHandler, likeBlogHandler, 
    singleBlogHandler, updateBlogHandler 
} from '../../routes/blogRoute';

const blogEndpoints: RouteEndpoint  = [
    {
        name: 'post blog category',
        method: 'post',
        path: '/post-blog-category',
        handler: createBlogCategoryHandler
    },
    {
        name: 'delete blog category',
        method: 'delete',
        path: '/delete-blog-category/:blogCategoryId',
        handler: deleteBlogCategoryHandler
    },
    {
        name: 'get blog categories',
        method: 'get',
        path: '/get-blog-categories',
        handler: fetchBlogCategoriesHandler
    },
    {
        name: 'post blog',
        method: 'post',
        path: '/post-blog',
        handler: createBlogHandler
    },
    {
        name: 'update blog',
        method: 'put',
        path: '/update-blog/:blogId',
        handler: updateBlogHandler
    },
    {
        name: 'like blog',
        method: 'put',
        path: '/like-blog/:blogId',
        handler: likeBlogHandler
    },
    {
        name: 'comment on blog',
        method: 'put',
        path: '/comment-on-blog/:blogId',
        handler: commentOnBlogHandler
    },
    {
        name: 'delete blog',
        method: 'delete',
        path: '/delete-blog/:blogId',
        handler: deleteBlogHandler
    },
    {
        name: 'get blogs',
        method: 'get',
        path: '/get-blogs',
        handler: fetchBlogsHandler
    },
    {
        name: 'get user blogs',
        method: 'get',
        path: '/get-user-blogs',
        handler: fetchUserBlogsHandler
    },
    {
        name: 'get blogs with category',
        method: 'get',
        path: '/get-blogs-with-catgory/:blogCategoryId',
        handler: fetchBlogsByCategoryHandler
    },
    {
        name: 'get single blog',
        method: 'get',
        path: '/get-single-blog/:blogId',
        handler: singleBlogHandler
    },
    {
        name: 'change blog draft',
        method: 'put',
        path: '/change-to-draft/:blogId',
        handler: changeBlogStatusToDraftHandler
    },
    {
        name: 'change blog publish',
        method: 'put',
        path: '/change-to-publish/:blogId',
        handler: changeBlogStatusToPublishHandler
    },
    {
        name: 'change blog archive',
        method: 'put',
        path: '/change-to-archive/:blogId',
        handler: changeBlogStatusToArchiveHandler
    },
];

export default blogEndpoints;