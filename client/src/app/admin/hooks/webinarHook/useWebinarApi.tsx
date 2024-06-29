import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const useWebinarApi = () => {
    const axiosAuth = useAxiosAuth();

    const postWebinarCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-webinar-category`, data);
        return response.data;
    };

    const deleteWebinarCategory = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-webinar-category/${data}`);
        return response.data;
    };

    const getWebinarCategories = async (
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-webinar-categories`);
        return response.data;
    };

    const postWebinar = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();

        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('webinarLink', data.webinarLink);
        formData.append('webinarDateTime', data.webinarDateTime);
        formData.append('summary', data.summary);
        formData.append('status', data.status);
        formData.append('duration', data.duration);
        
        if(data.speakers.length > 0) {
            formData.append('speakers', JSON.stringify(data.speakers));
        }
        
        // data.speakers.forEach((speaker: any, index: number) => {
        //     formData.append(`speakers[${index}]`, speaker.speakerName);
        //     formData.append(`speakers[${index}]`, speaker.occupation);
        //     // Check if speaker.image is a File object
        //     if (speaker.image instanceof File) {
        //         formData.append(`speakers[${index}]`, speaker.image);
        //     }
        // });

        for (let pair of formData.entries()) {
            console.log(pair[0] + ': ' + pair[1]);
        }
        // if(data.hostedBy.length > 0) {
        //     formData.append('hostedBy', JSON.stringify(data.hostedBy));
        // }

        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-webinar`, formData);
        return response.data;
    };

    const updateWebinar = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

        const formData = new FormData();
        
        formData.append('title', data.title);
        formData.append('category', data.category);
        formData.append('webinarLink', data.webinarLink);
        formData.append('webinarDateTime', data.webinarDateTime);
        formData.append('summary', data.summary);
        formData.append('duration', data.duration);
        // formData.append('speakers', data.speakers);

        if(data.speakers.length > 0) {
            formData.append('speakers', JSON.stringify(data.speakers));
        }

        const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-webinar/${data.webinarId}`, formData);
        return response.data;
    };

    const getWebinars = async (
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-webinars`);
            return response.data;
    };

    const getSingleWebinar = async (
        data: string
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-single-webinar/${data}`);
            return response.data;
    };

    const getUserWebinars = async (
        data: string
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.get<
            types.ApiResponseSuccess<any>>
            (`/get-user-webinars/${data}`);
            return response.data;
    };

    const createWebinarWaitlist = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        (`/post-webinar-waitlist`, data);
        return response.data;
    };

    const deleteWebinarWaitlistUser = async (
        data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-webinar-waitlist/${data}`);
        return response.data;
    };

    const getWebinarWaitlistUsers = async (): Promise<types.ApiResponseSuccess<any>> => {
        const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-webinar-waitlist`);
        return response.data;
    };

    const changeWebinarStatus = async (
        data: any
        ): Promise<types.ApiResponseSuccess<any>> => {
            const response = await axiosAuth.put<
            types.ApiResponseSuccess<any>>
            (`/update-webinar-status/${data.webinarId}`, { status: data.status });
            return response.data;
    }; 

    return {
        postWebinarCategory,
        changeWebinarStatus,
        getWebinarWaitlistUsers,
        createWebinarWaitlist,
        deleteWebinarWaitlistUser,
        getUserWebinars,
        getWebinars,
        updateWebinar,
        postWebinar,
        getWebinarCategories,
        deleteWebinarCategory,
        getSingleWebinar
    };
}