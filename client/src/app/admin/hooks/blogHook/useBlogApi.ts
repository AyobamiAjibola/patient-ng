import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const useBlogApi = () => {
    const axiosAuth = useAxiosAuth();

    const createBlogCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-blog-category`, data);
        return response.data;
    };

    const updateBlogCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-blog-category/${data.blogCatId}`, {name: data.name});
        return response.data;
    };

    const deleteBlogCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-blog-category/${data}`);
        return response.data;
    };

    const getBlogCategories = async (
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-blog-categories`);
        return response.data;
    };

    const createBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.body);
        formData.append('category', data.category);
        // formData.append('hot', data.hot);
        formData.append('titleImage', data.titleImage);
        formData.append('bodyImage', data.bodyImage);
        formData.append('publisher', data.publisher);
        formData.append('urlSlug', data.urlSlug);
        formData.append('status', data.status);

        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-blog`, formData);
        return response.data;
    };

    const updateBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.body);
        formData.append('category', data.category);
        // formData.append('hot', data.hot);
        formData.append('titleImage', data.titleImage);
        formData.append('bodyImage', data.bodyImage);
        formData.append('publisher', data.publisher);
        formData.append('urlSlug', data.urlSlug);

        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-blog/${data.blogId}`, formData);
        return response.data;
    };

    const likeBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/like-blog/${data}`);
        return response.data;
    };

    const likeBlogComment = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/like-blog-comment/${data}`);
        return response.data;
    };

    const replyBlogComment = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/reply-blog-comment/${data.commentId}`, {reply: data.reply});
        return response.data;
    };

    const commentOnBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/comment-on-blog/${data.blogId}`, {comment: data.comment});
        return response.data;
    };

    const deleteBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-blog/${data}`);
        return response.data;
    };

    const getBlogs = async (
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-blogs`);
            return response.data;
    };

    const getUsersBlogs = async (): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-user-blogs`);
            return response.data;
    };

    const getBlogsWithCategory = async (
            data: any
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-blogs-with-catgory/${data}`);
            return response.data;
    };

    const fetchBlogComments = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/fetch-blog-comments/${data}`);
        return response.data;
    };

    const getSingleBlog = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-single-blog/${data}`);
        return response.data;
    };

    const getSingleBlogAdmin = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-single-blog-admin/${data}`);
        return response.data;
    };

    const changeBlogToDraft = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/change-to-draft/${data}`);
        return response.data;
    };

    const changeBlogToPublish = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/change-to-publish/${data}`);
        return response.data;
    };

    const changeBlogToArchive = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/change-to-archive/${data}`);
        return response.data;
    };

    return {
        createBlogCategory,
        changeBlogToPublish,
        changeBlogToArchive,
        deleteBlogCategory,
        getBlogCategories,
        createBlog,
        updateBlog,
        likeBlog,
        commentOnBlog,
        deleteBlog,
        getBlogs,
        getUsersBlogs,
        getBlogsWithCategory,
        getSingleBlog,
        getSingleBlogAdmin,
        changeBlogToDraft,
        likeBlogComment,
        replyBlogComment,
        fetchBlogComments,
        updateBlogCategory
    };
}