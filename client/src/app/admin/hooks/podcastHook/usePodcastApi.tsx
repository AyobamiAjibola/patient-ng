import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const usePodcastApi = () => {
    const axiosAuth = useAxiosAuth();

    const postPodcastCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-podcast-category`, data);
        return response.data;
    };

    const deletePodcastCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-podcast-category/${data}`);
        return response.data;
    };

    const getPodcastCategories = async (
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-podcast-categories`);
        return response.data;
    };

    const postPodcast = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('producedBy', data.producedBy);
        formData.append('source', JSON.stringify(data.source));
        formData.append('summary', data.summary);
        formData.append('status', data.status);
        formData.append('duration', data.duration);
        formData.append('image', data.image);
        formData.append('releaseDate', data.releaseDate);


        //VIEW THE ENTRIES
        // for (let pair of formData.entries()) {
        //     console.log(pair[0] + ': ' + pair[1]);
        // }

        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-podcast`, formData);
        return response.data;
    };

    const updatePodcast = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();
        
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('producedBy', data.producedBy);
        formData.append('source', JSON.stringify(data.source));
        formData.append('summary', data.summary);
        formData.append('duration', data.duration);
        formData.append('image', data.image);
        formData.append('releaseDate', data.releaseDate);

        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-podcast/${data.podcastId}`, formData);
        return response.data;
    };

    const getPodcasts = async (
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-podcasts`);
            return response.data;
    };

    const getSinglePodcast = async (
        data: string
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-single-podcast/${data}`);
            return response.data;
    };

    const getUserPodcasts = async (
        data: string
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-users-podcasts/${data}`);
            return response.data;
    };

    const deletePodcast = async (
        data: string
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.delete<
            types.ApiResponseSuccess<any>>
            (`/delete-podcast/${data}`);
            return response.data;
    };

    const changePodcastStatus = async (
        data: any
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.put<
            types.ApiResponseSuccess<any>>
            (`/change-podcast-status/${data.podcastId}`, { status: data.status });
            return response.data;
    }; 

    return {
        postPodcastCategory,
        changePodcastStatus,
        deletePodcast,
        getUserPodcasts,
        getPodcasts,
        updatePodcast,
        postPodcast,
        getPodcastCategories,
        deletePodcastCategory,
        getSinglePodcast
    };
}