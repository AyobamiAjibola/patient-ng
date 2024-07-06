import useAxiosAuth from "@/app/hooks/useAxiosAuth";
import { types } from "../../../../../types/models";

export const useAdvocacyApi = () => {
    const axiosAuth = useAxiosAuth();

    const createComplain = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.post<
        types.ApiResponseSuccess<any>>
        ('/create-advocacy', requestParameters);
      return response.data;
    };

    const updateComplain = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-advocacy/${requestParameters.advocacyId}`, {complaints: requestParameters.complaints});
      return response.data;
    };

    const updateAdvocacyStatus = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.put<
        types.ApiResponseSuccess<any>>
        (`/update-advocacy-status/${requestParameters}`);
      return response.data;
    };
    
    const getAdvocacies = async (): Promise<types.ApiResponseSuccess<any>> => {
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        ('/get-all-advocacies');
      return response.data;
    };

    const deleteAdvocacy = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.delete<
        types.ApiResponseSuccess<any>>
        (`/delete-advocacy/${requestParameters}`);
      return response.data;
    };

    const getSingleAdvocacy = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-single-advocacy/${requestParameters}`);
      return response.data;
    };

    const getUsersAdvocacies = async (
      requestParameters: any
    ): Promise<types.ApiResponseSuccess<any>> => {
  
      const response = await axiosAuth.get<
        types.ApiResponseSuccess<any>>
        (`/get-user-advocacies/${requestParameters}`);
      return response.data;
    };

return {
    createComplain,
    getUsersAdvocacies,
    getSingleAdvocacy,
    getAdvocacies,
    deleteAdvocacy,
    updateAdvocacyStatus,
    updateComplain
  };
};