import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const usePatientStoriesApi = () => {
    const axiosAuth = useAxiosAuth();

    const postStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.story);
        formData.append('image', data.image);

        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-story`, formData);
        return response.data;
    };

    const updateStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('content', data.story);
        formData.append('image', data.image);

        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-story/${data.storyId}`, formData);
        return response.data;
    };

    const getSingleStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/single-story/${data}`);
        return response.data;
    };

    const fetchStories = async (): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-stories`);
        return response.data;
    };

    const fetchUserStories = async (): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-user-stories`);
        return response.data;
    };

    const deleteStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-story/${data}`);
        return response.data;
    };

    const publishStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/publish-story/${data}`);
        return response.data;
    };

    const rejectStory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/reject-story/${data}`);
        return response.data;
    };


    return {
        postStory,
        publishStory,
        rejectStory,
        updateStory,
        getSingleStory,
        fetchStories,
        fetchUserStories,
        deleteStory
    };
}