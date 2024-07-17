import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const useInsightApi = () => {
    const axiosAuth = useAxiosAuth();

    const createInsight = async (
      data: any
    ): Promise<types.ApiResponseSuccess<any>> => {
      const formData = new FormData();
      formData.append('hospitalName', data.hospitalName);
      formData.append('rating', data.rating.toString());
      formData.append('comment', data.comment);

      const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        ('/create-insight', formData);
      return response.data;
    };

    const updateInsight = async (
      data: any
    ): Promise<types.ApiResponseSuccess<any>> => {

      const formData = new FormData();
      formData.append('hospitalName', data.hospitalName);
      formData.append('rating', data.rating.toString());
      formData.append('comment', data.comment);
  
      const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-insight/${data.insightId}`, formData);
      return response.data;
    };

    const postInsightReview = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/post-insight-review/${requestParameters.insightId}`, { 
          review: requestParameters.review, 
          rating: requestParameters.rating 
        });
      return response.data;
    };
    
    const getInsights = async (): Promise<types.ApiResponseSuccess<any>> => {
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        ('/get-all-insights');
      return response.data;
    };

    const deleteInsight = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-insight/${requestParameters}`);
      return response.data;
    };

    const getSingleInsight = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-single-insight/${requestParameters}`);
      return response.data;
    };

    const getUsersInsights = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-user-insights/${requestParameters}`);
      return response.data;
    };

    const getAllReviews = async (): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-all-reviews`);
      return response.data;
    };

return {
    createInsight,
    getUsersInsights,
    getSingleInsight,
    getInsights,
    deleteInsight,
    updateInsight,
    postInsightReview,
    getAllReviews
  };
};